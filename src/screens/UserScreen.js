import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Input, Loading, ScrollText } from "../components/index";

//this is used to display a member's profile page
const UserScreen = props => {
    const { navigation, route } = props;                                                                    // destructures props
    const { tempId, tempImage, tempUsername, tempRelationship, tempPlace, tempDescription } = route.params; //destructures route params received from either MembersScreen or BuddiesScreen
    const [image, setImage] = useState(undefined);
    const [username, setUsername] = useState(undefined);
    const [relationship, setRelationship] = useState(undefined);
    const [place, setPlace] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [show, setShow] = useState(false);           // controls when to display user information

    useEffect(() => {
        let mount = true;
        const fetchUser = () => {
            setImage(tempImage);
            setUsername(tempUsername);
            setRelationship(tempRelationship);
            setPlace(tempPlace);
            setDescription(tempDescription);
            setShow(true);
        }
        if (mount)
            fetchUser();
        return () => mount = false; // cleans up to prevent memory leak
    }, [tempId]);                   // list of dependencies which keeps watching for changes

    if (!show) { return <Loading /> };  // shows animated loading

    return (
        <ScrollText label="Buddy Profile" destination={navigation}>
            <View style={styles.imageContainer} >
                <Image style={styles.photo} source={{ uri: image }} />
            </View>
            <Input
                label="Username"
                defaultValue={username}
                editable={false}
            />
            <Input
                label={"Relationship"}
                defaultValue={relationship}
                editable={false}
            />
            <Input
                label={"Live in"}
                defaultValue={place}
                editable={false}
            />
            <Input
                style={styles.description}
                label={"Self description..."}
                defaultValue={description}
                editable={false}
            />
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
});

export default UserScreen;