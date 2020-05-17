import React from "react";
import { Text, StyleSheet } from "react-native";

// customized text title
export default TextTitle = props => {
    return (
        <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        paddingBottom: 20
    }
});