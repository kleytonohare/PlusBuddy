import React from "react";
import { Text, StyleSheet } from "react-native";

// customized text body
export default TextBody = props => {
    return (
        <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    body: {
        fontSize: 15,
        textAlign: "center",
        paddingVertical: 5
    },
});