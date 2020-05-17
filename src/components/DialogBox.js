import { Alert } from "react-native";

// creates an alert with the ok button
export const okButton = (title, message, fnc) => {
    fnc = fnc || function () { };       // makes the fnc argument optional

    Alert.alert(title, message, [
        {
            text: "OK",
            onPress: () => fnc()
        }
    ]);
};

// creates an alert with a question and two button: "cancel" and "ok"
export const cancelOkButton = (title, message, no, yes) => {
    Alert.alert(title, message, [
        {
            text: "Cancel",
            onPress: () => no(),
            style: "cancel"
        },
        {
            text: "OK", onPress: () => yes()
        }
    ]);
};