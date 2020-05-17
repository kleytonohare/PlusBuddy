import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";

//this is a customized button with dark blue as background color and white bold letters as title
export default Button = props => {
    return (
        <TouchableOpacity style={{ ...styles.button, ...props.style }} onPress={() => props.onPress()}>
            <Text style={styles.buttonTitle}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 40,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        //iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        //Android
        elevation: 10,
    },
    buttonTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    }
});