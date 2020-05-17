import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Color from "../constants/colors";
import Header from "./Header";

// a framework which permits the user to scroll if necessary depending on the screen size
export default ScrollText = props => {
    return (
        <View style={styles.container} >
            <Header label={props.label} destination={props.destination} />
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                {...props}
            >
                {props.children}
            </ScrollView>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Color.background,
    },
    icon: {
        position: "absolute",
        alignSelf: "center"
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 10,
        paddingBottom: 15
    }
});