import React from "react";
import { Text, StyleSheet } from "react-native";
import Color from "../constants/colors";

// customized link with dark blue and underscored letters
export default TextLink = props => {
    return (
        <Text style={{ ...props.style, ...styles.link }} onPress={() => props.onPress()}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    link: {
        textDecorationLine: "underline",
        color: Color.primary,
        fontWeight: "bold"
    }
});