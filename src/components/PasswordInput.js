import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Color from "../constants/colors";

// by default, characters are hidden
// users can use the eye icon on the left to reveal characters
export default PasswordInput = props => {
    const [secureText, setSecureText] = useState(true);
    const [iconName, setIconName] = useState("eye");

    const onIconPress = () => {
        let iconOption = secureText ? "eye-off" : "eye";
        setSecureText(!secureText);
        setIconName(iconOption);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>{props.label}</Text>
                <TextInput
                    {...props}
                    style={styles.input}
                    secureTextEntry={secureText}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <TouchableOpacity style={styles.icon} onPress={() => onIconPress()}>
                <Icon
                    name={iconName}
                    size={30}
                    color={Color.primary}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 5,
    },
    inputContainer: {
        flexDirection: "column",
        width: "90%",
    },
    label: {
        fontSize: 15,
        fontWeight: "bold",
        paddingBottom: 5,
    },
    input: {
        fontSize: 16,
        textAlign: "center",
        textAlignVertical: "center",
        height: 40,
        borderColor: Color.primary,
        borderWidth: 1,
        borderRadius: 10,
    },
    icon: {
        alignSelf: "flex-end",
        paddingLeft: 4,
        paddingBottom: 4,
    }
});