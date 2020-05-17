import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../db/AuthProvider";
import { Button, Calendar, Input, PasswordInput, ScrollText, TextBody, TextLink } from "../components/index";

// users need to provide a username, the date of birth, an email and a password to sign up
const SignUpScreen = props => {
    const { navigation } = props;               // destructures props
    const { signUp } = useContext(AuthContext); // extracts signUp function
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //handling the submit button
    const handleSubmit = async () => {
        await signUp({ username, email, confirmEmail, password, confirmPassword });
    };

    return (
        <ScrollText label="Sign Up" destination={navigation}>
            <View style={styles.infoContainer}>
                <TextBody>This is a community for those who are over 18 and HIV-positive.</TextBody>
                <TextBody>Your personal data will be kept as long as you keep using our services.</TextBody>
                <TextBody>Also, you may delete your account at any time.</TextBody>
            </View>
            <View style={styles.inputContainer}>
                <Input
                    label="Username"
                    onChangeText={text => { setUsername(text) }}
                    maxLength={20}
                />
                <Calendar
                    label="Date of Birth"
                    displayDate={new Date()} // argument must be a Date object
                />
                <Input
                    label="Email"
                    placeholder="name@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => { setEmail(text) }}
                />
                <PasswordInput
                    label="Password"
                    placeholder="use numbers and characters"
                    onChangeText={text => { setPassword(text) }}
                />
                <Input
                    label="Confirm Email"
                    placeholder="very important"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => { setConfirmEmail(text) }}
                />
                <PasswordInput
                    label="Confirm Password"
                    placeholder="make sure they match"
                    onChangeText={text => { setConfirmPassword(text) }}
                />
                <View style={{ paddingTop: 20 }}>
                    <Button style={styles.button} onPress={handleSubmit} title="Submit" />
                </View>
            </View>
            <View style={styles.footer}>
                <TextLink style={styles.pass} onPress={() => navigation.navigate("ForgottenPassword")}>Forgot Password?</TextLink>
                <TextLink style={styles.signIn} onPress={() => navigation.navigate("SignIn")}>Sign in</TextLink>
            </View>
        </ScrollText>
    );
};

const styles = StyleSheet.create({
    infoContainer: {
        flex: 11,
        justifyContent: "center"
    },
    inputContainer: {
        flex: 9,
        width: "100%"
    },
    proofContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 40
    },
    label: {
        fontSize: 15,
        fontWeight: "bold",
        paddingTop: 10,
        paddingRight: 40,
        paddingBottom: 0,
    },
    button: {
        alignSelf: "center",
    },
    footer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 20
    },
    pass: {
        height: 30,
        textAlignVertical: "bottom",
    },
    signIn: {
        width: 100,
        height: 30,
        textAlign: "right",
        textAlignVertical: "bottom",
    }
});

export default SignUpScreen;