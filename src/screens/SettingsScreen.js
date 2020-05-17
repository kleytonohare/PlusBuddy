import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../db/AuthProvider";
import { Button, Input, PasswordInput, ScrollText, TextTitle, TextBody } from "../components/index";
import Colors from "../constants/colors";

// on this screen, users can update their emails, password and delete their accounts
const SettingsScreen = props => {
    const { navigation } = props;                                                       // destructures props
    const { buddy, changeEmail, changePass, deleteAccount } = useContext(AuthContext);  // extracts user information as buddy and functions
    const [newEmail, setNewEmail] = useState("");
    const [confirmNewEmail, setConfirmNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    return (
        <ScrollText label="Settings" destination={navigation}>
            <TextTitle style={styles.title}>Update Email</TextTitle>
            <Input
                label="Your current email"
                defaultValue={buddy.email}
                editable={false}
            />
            <Input
                label="New Email"
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => { setNewEmail(text) }}
            />
            <Input
                label="Confirm New Email"
                placeholder="very important"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => { setConfirmNewEmail(text) }}
            />
            <View style={styles.buttonContainer}>
                <Button style={styles.button} onPress={() => changeEmail({ newEmail, confirmNewEmail })} title="Update Email" />
            </View>
            <TextTitle style={styles.title}>Update Password</TextTitle>
            <TextBody>You need to have recently signed in to change your password.</TextBody>
            <PasswordInput
                label="New Password"
                placeholder="use numbers and characters"
                onChangeText={text => { setNewPassword(text) }}
            />
            <PasswordInput
                label="Confirm New Password"
                placeholder="make sure they match"
                onChangeText={text => { setConfirmNewPassword(text) }}
            />
            <View style={styles.buttonContainer}>
                <Button style={styles.button} onPress={() => changePass({ newPassword, confirmNewPassword })} title="Update Password" />
            </View>
            <TextTitle style={styles.title}>Delete your account</TextTitle>
            <TextBody>You need to have recently signed in to delete your account.</TextBody>
            <TextBody>This cannot be undone!</TextBody>
            <View>
                <Button style={styles.delete} onPress={() => deleteAccount()} title="Delete me" />
            </View>
        </ScrollText>
    );
}

const styles = StyleSheet.create({
    title: {
        paddingBottom: 10
    },
    buttonContainer: {
        paddingTop: 10,
        paddingBottom: 50
    },
    button: {
        alignSelf: "center",
    },
    delete: {
        alignSelf: "center",
        backgroundColor: Colors.darkRed
    }
});
export default SettingsScreen;
