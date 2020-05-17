import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign as Menu, Ionicons as Chevron } from "@expo/vector-icons";
import Color from "../constants/colors";
import TextTitle from "../components/TextTitle";

// customized header with dynamic titles
export default Header = props => {
    // props.navigation is undefined because this component is not desclared in ../routes/StackRouter.js
    // so a custom prop is passed to receive the navigation object
    const navigation = props.destination;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ width: 60 }} onPress={() => {
                if (props.label != "Welcome") navigation.goBack()
            }} >
                {/* if the screen is not "Welcome" than a back arrow will be displayed otherwise, the logo */}
                {(props.label === "Welcome" ?
                    <Image style={styles.icon} source={require("../assets/logoInverted.png")} />
                    : <Chevron
                        name="ios-arrow-back"
                        size={30}
                        color="white"
                    />)}
            </TouchableOpacity>
            <TextTitle style={styles.title}>{props.label}</TextTitle>
            <TouchableOpacity style={{ width: 60 }} onPress={() => navigation.openDrawer()}>
                <Text style={{ textAlign: "right" }}>
                    <Menu
                        name="menu-fold"
                        size={28}
                        color="white"
                    />
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: screenHeight - (screenHeight * 0.96), //to make it more responsive
        paddingHorizontal: 10,
        height: 90,
        backgroundColor: Color.primary,
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
    icon: {
        width: 50,
        height: 50
    },
    title: {
        paddingBottom: 0,
        color: "white",
    },
});