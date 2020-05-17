import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Color from "../constants/colors";

// this customized input has a label and the input field has a border
export default Input = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput {...props} style={{ ...styles.input, ...props.style }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        paddingVertical: 5
    },
    label: {
        fontSize: 15,
        fontWeight: "bold",
        paddingBottom: 5,
    },
    input: {
        fontSize: 15,
        textAlign: "center",
        height: 40,
        borderColor: Color.primary,
        borderWidth: 1,
        borderRadius: 10,
    }
});