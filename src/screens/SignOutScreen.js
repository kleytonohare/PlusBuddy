import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../db/AuthProvider";
import { Button, ScrollText, TextTitle } from "../components/index";
import { okButton } from "../components/DialogBox";
import Colors from "../constants/colors";

// this is the Sign Out screen which presents two buttons: yes or no
const SignOutScreen = props => {
    const { navigation } = props;                           // destructures props
    const { signOut, isSignIn } = useContext(AuthContext);  // extracts singOut function and isSignIn property

    const handleYes = async () => {
        await signOut();                                    // logs the user out
        !isSignIn ? navigation.navigate("Home") : null;     // redirects the user to Home page
    }

    const handleNo = () => {
        okButton("Phew!", "Redirecting to the chatroom");
        navigation.navigate("Chatroom");                    // redirects the user to Chatroom
    }

    return (
        <ScrollText label="Sign Out" destination={navigation}>
            <View>
                <TextTitle>Are you sure you want to sign out?</TextTitle>
                <View style={styles.buttons}>
                    <Button onPress={handleNo} title="No" />
                    <Button style={{ backgroundColor: Colors.darkRed }} onPress={handleYes} title="Yes" />
                </View>
            </View>
        </ScrollText>
    );
};

const styles = StyleSheet.create({
    buttons: {
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default SignOutScreen;