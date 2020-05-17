import React, { useContext, useEffect, useState } from "react";
import { AsyncStorage, Image, Modal, StyleSheet, View } from "react-native";
import { Button, Calendar, Input, Loading, TextLink, ScrollText, DropDownInput } from "../components/index";
import { toDate, uploadImage } from "../../db/firebase/FireHelper";
import { useRegistrationUser } from "../../db/useRegistrationUser";
import { AuthContext } from "../../db/AuthProvider";
import { okButton } from "../components/DialogBox";
import * as ImagePicker from 'expo-image-picker';
import Color from "../constants/colors";

// these are the options for Relationship input
const list = ["No answer", "Single", "Looking", "It's complicated", "Dating", "Engaged", "Married"];

// this will display the current user profile
// current users can upload their personal details along with uploading a profile image
const ProfileScreen = props => {
    const { navigation } = props;                       // destructures props
    const user = useRegistrationUser();
    const { buddy, userId } = useContext(AuthContext);  // extracts current user id and extra user information as buddy properties
    const [show, setShow] = useState(false);            // controls when to display user information
    const [showModal, setShowModal] = useState(false);
    const today = new Date();
    const folderName = "profileImages";                 // folder name for storaging user's profile images

    // variables for storing information from the database
    const [image, setImage] = useState(buddy.photoURL);
    const [username, setUsername] = useState(buddy.displayName);
    const [dob, setDob] = useState(today);              // Calendar prop displayDate only accepts Date object
    const [relationship, setRelationship] = useState("");
    const [place, setPlace] = useState("");
    const [description, setDescription] = useState("");

    // variables which will store updates
    const [tempUsername, setTempUsername] = useState("");
    const [tempDob, setTempDob] = useState(today);
    const [tempRelationship, setTempRelationship] = useState("");
    const [tempPlace, setTempPlace] = useState("");
    const [tempDescription, setTempDescription] = useState("");

    useEffect(() => {
        let mount = true;
        const fetchUser = () => {
            if (user.buddyExtraInfo) {
                setDob(toDate(user.buddyExtraInfo.dob));
                setRelationship(user.buddyExtraInfo.relationship);
                setPlace(user.buddyExtraInfo.place);
                setDescription(user.buddyExtraInfo.description);
                setShow(!show);
            }
        }
        if (mount)
            fetchUser();
        return () => mount = false; // cleans up to prevent memory leak
    }, [user.buddyExtraInfo]);      // list of dependencies which keeps watching for changes

    // handling the submit button
    const handleSubmit = async () => {
        let successMessage = "";
        let errorMessage = "";
        let date = undefined;
        const dobString = await AsyncStorage.getItem("dob");    // gest the Date in a string format
        const dobObject = await new Date(dobString * 1000);     // convert back to Date object
        setTempDob(dobObject);

        // compares the date to make sure the date from the database are not the same as user's input and user is over 18 years old.
        const dateComparison = async () => {
            const tempDobYear = dobObject.getFullYear();
            if (tempDobYear > (today.getFullYear() - 18)) {     // checks if user is over 18 years old
                errorMessage += "You must be over 18.\n";
                return false;
            }
            return true;
        }

        date = await dateComparison();

        // validation
        if ((username !== "" || tempUsername !== "") && date) {                         //ensures no empty username OR tempUsername AND only a valid dob is sent to the database

            if ((tempUsername !== username) && tempUsername !== "") {                   // ensures the input username as tempUsername differs from value stored in database as username AND also, tempUsername is not empty
                const status1 = await user.actions.patchUsername(tempUsername);         // updates username
                setUsername(tempUsername);
                status1 ? successMessage += "    \u25CB username\n" : errorMessage += "    \u25CB username\n";
            }

            // if (!date) { //TODO: improve dateComparison() to differentiate input dob from dabase dob
            const status2 = await user.actions.patchDOB(dobObject);                     // updates date of birth as dob
            status2 ? successMessage += "    \u25CB date of birth\n" : errorMessage += "    \u25CB date of birth\n";
            // }

            if (tempRelationship !== "" && relationship !== tempRelationship) {         // ensures input relationship as tempRelationship is not empty and it differs from value stored in database
                const status = await user.actions.patchRelationship(tempRelationship);  // updates relationship status
                setRelationship(tempRelationship);
                status ? successMessage += "    \u25CB relationship\n" : errorMessage += "    \u25CB relationship\n";
            }

            if (tempPlace !== "" && place !== tempPlace) {                              // ensures input place as tempPlace is not empty and it differs from value stored in database
                const status = await user.actions.patchPlace(tempPlace);                // updates where the user lives in
                setPlace(tempPlace);
                status ? successMessage += "    \u25CB place\n" : errorMessage += "    \u25CB place\n";
            }

            if (tempDescription !== "" && description !== tempDescription) {            //ensures input description as tempDescription is not empty and it differs form value in database
                const status = await user.actions.patchDescription(tempDescription);    // updates the self description
                setDescription(tempDescription);
                status ? successMessage += "    \u25CB description\n" : errorMessage += "    \u25CB description\n";
            }
        }

        if (successMessage)     // displays successMessage if it is not an empty string
            okButton("Successfully updated", successMessage);
        else if (errorMessage)  // or errorMesssage if it is not an empty  string
            okButton("Failed to update", errorMessage);
        else                    // or this message
            okButton("Aha", "No updates were made");
    }

    // handles users uploading images to firebase storage. Users can upload by either camera or device folder system
    const handleImage = async data => {
        try {
            let result;
            switch (data) {
                case "CAMERA":
                    result = await ImagePicker.launchCameraAsync();       // launches the built-in camera
                    break;
                case "ALBUM":
                    result = await ImagePicker.launchImageLibraryAsync({  // launches the device folder system (album)
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 1,
                    });
                    break;
            }
            if (!result.cancelled) {                                    // if user has not cancelled the process
                setImage(result.uri);
                uploadImage(result.uri, folderName, userId.toString())  // sends to firebase storage
                    .then(snapshot => {
                        snapshot.ref.getDownloadURL()                   // gets the url
                            .then(url => {
                                user.actions.patchImage(url);           // saves the url in users collection
                            })
                    }).catch(error => {
                        console.log(`Error uploading user's image: ${error}. UserId: ${userId}`);
                    });
            }
        } catch (error) {
            console.log(`Error accessing user's camera or album: ${error}. UserId; ${userId}`);
        } finally {
            setShowModal(!showModal);
        }
    }

    if (!show) { return <Loading /> };  // shows animated loading

    return (
        <ScrollText label="Your Profile" destination={navigation}>
            <View style={styles.imageContainer} >
                <Image style={styles.photo} source={{ uri: image }} />
            </View>
            <Button style={styles.button} title="Change image..." onPress={() => setShowModal(!showModal)} />

            <Input
                label="Username"
                defaultValue={username}
                onChangeText={input => setTempUsername(input)}
                maxLength={20}
            />
            <Calendar
                label="Date of Birth"
                displayDate={dob}   // argument must be a Date object
            />
            <DropDownInput
                label={"Relationship"}
                list={list}
                onValueChange={(value, key) => {
                    setTempRelationship(value);
                }}
                selectedValue={relationship}
            />
            <Input
                label={"Live in"}
                defaultValue={place}
                onChangeText={input => setTempPlace(input)}
                maxLength={20}
            />
            <Input
                style={styles.description}
                label={"Self description..."}
                defaultValue={description}
                onChangeText={input => setTempDescription(input)}
                maxLength={100}
                multiline
            />
            <View style={{ paddingTop: 20 }}>
                <Button style={styles.button} onPress={() => handleSubmit({ username, place, description })} title="Update" />
            </View>

            <Modal  // this component overlays when "Change imagge..." button is tapped
                animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={styles.modal}>
                    <TextLink style={styles.modalLink} onPress={() => handleImage("CAMERA")}>...from camera</TextLink>
                    <TextLink style={styles.modalLink} onPress={() => handleImage("ALBUM")}>...from album</TextLink>
                    <TextLink style={styles.modalLink} onPress={() => setShowModal(!showModal)}>close</TextLink>
                </View>
            </Modal>
        </ScrollText>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        paddingBottom: 10,
    },
    photo: {
        alignSelf: "center",
        width: 200,
        height: 200,
    },
    description: {
        height: 100
    },
    button: {
        height: 40,
        width: 150,
        alignSelf: "center",
    },
    modal: {
        flex: 1,
        marginTop: "65%",
        backgroundColor: Color.background
    },
    modalLink: {
        height: 60,
        width: "100%",
        textAlign: "center",
        fontSize: 20,
    }
});

export default ProfileScreen;