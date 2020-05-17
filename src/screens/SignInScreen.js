import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../db/AuthProvider";
import { Button, Input, ScrollText, TextLink, PasswordInput } from "../components/index";

// users can sign in through their emails and passwords
const SignInScreen = props => {
    const { navigation } = props;               // destructures props
    const { signIn } = useContext(AuthContext); // extracts signIn function
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ScrollText label="Sign In" destination={navigation}>
            <View style={styles.inputContainer}>
                <Input
                    label="Email"
                    placeholder="username@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => { setEmail(text) }}
                />
                <PasswordInput
                    label="Password"
                    onChangeText={text => { setPassword(text) }}
                />
                <View style={{ paddingTop: 20 }}>
                    <Button style={styles.button} onPress={() => signIn({ email, password })} title="Sign in" />
                </View>
            </View>
            <View style={styles.footer}>
                <TextLink style={styles.pass} onPress={() => navigation.navigate("ForgottenPassword")}>Forgot Password?</TextLink>
                <TextLink style={styles.signUp} onPress={() => navigation.navigate("SignUp")}>Sign up</TextLink>
            </View>
        </ScrollText>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
    },
    button: {
        alignSelf: "center",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    pass: {
        height: 35,
        textAlignVertical: "bottom",
    },
    signUp: {
        width: 100,
        height: 35,
        textAlign: "right",
        textAlignVertical: "bottom",
    }
});

export default SignInScreen;