import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../db/AuthProvider";
import { Button, Input, ScrollText, TextBody, TextTitle, TextLink } from "../components/index";

// users can recovery their passwords through this screen
// users can submit their emails and then, receive one containing a link to change their password
const ForgottenPasswordScreen = props => {
    const { navigation } = props;                       //destructures props
    const { passRecovery } = useContext(AuthContext);   //extracts passRecovery function
    const [email, setEmail] = useState("");

    return (
        <ScrollText label="Password Recovery" destination={navigation}>
            <View style={styles.bodyContainer}>
                <TextTitle style={styles.title}>Forgotten Login Details</TextTitle>
                <TextBody style={styles.body}>Don't worry, we've got your back</TextBody>
                <TextBody style={styles.body}>Please, enter your email</TextBody>
            </View>
            <View style={styles.submitContainer}>
                <Input
                    label="Email"
                    placeholder="name@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => { setEmail(text) }}
                />
                <Button
                    style={styles.button} onPress={() => passRecovery({ email })} title="Find my account"
                />
                <TextBody style={styles.bottomMessage}>We'll send you a link to reset your password and get you in</TextBody>
            </View>
            <View style={styles.footer}>
                <TextLink style={styles.signUp} onPress={() => navigation.navigate("SignUp")}>Sign up</TextLink>
                <TextLink style={styles.signIn} onPress={() => navigation.navigate("SignIn")}>Sign in</TextLink>
            </View>
        </ScrollText >
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 20
    },
    body: {
        fontSize: 15
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    submitContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "flex-start"
    },
    button: {
        alignSelf: "center"
    },
    bottomMessage: {
        paddingTop: 40
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    signUp: {
        width: 100,
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

export default ForgottenPasswordScreen;