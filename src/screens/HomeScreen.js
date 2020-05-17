import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, TextBody, TextTitle, ScrollText } from "../components/index";

// this is the Welcome screen which contains two buttons (Sign Up and Sign In)
const HomeScreen = props => {
    const { navigation } = props; // destructuring props

    return (
        <ScrollText label="Welcome" destination={navigation}>
            <View style={styles.imageContainer}>
                <Image source={require("../assets/icon.png")} />
            </View>
            <View style={styles.bodyContainer}>
                <TextTitle style={styles.title}>Welcome to PlusBuddy</TextTitle>
                <TextBody style={styles.body}>Where real buddies can be made</TextBody>
                <View style={styles.buttonContainer}>
                    <Button style={styles.button} title="Sign up" onPress={() => navigation.navigate("SignUp")} />
                    <Button style={styles.button} title="Sign in" onPress={() => navigation.navigate("SignIn")} />
                </View>
            </View>
        </ScrollText>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    bodyContainer: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 30
    },
    body: {
        fontSize: 20,
        paddingBottom: 20
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingTop: 30,
    },
    button: {
        height: 50
    }
});

export default HomeScreen;