import React, { useState } from "react";
import { AsyncStorage, StyleSheet, TouchableOpacity, View, Text, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome as Icon } from "@expo/vector-icons";
import Color from "../constants/colors";

// this components collects dates inputs. It displays the date on the right and a calendar icon on the left
// the whole component is "tappable"
export default Calendar = props => {
    const { label, displayDate } = props;           // destructores props
    const [date, setDate] = useState(displayDate);  // initializes the state with the prop from the parent. Value must be a Date object.
    const [show, setShow] = useState(false);        // controls when to display the date
    let outputDate = date.getDate() + " / " + (date.getMonth() + 1) + " / " + date.getFullYear(); // makes it human readable

    const isShow = () => {
        setShow(true);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;       // in case the user hits 'cancel', the date default will be stored
        setShow(false);
        setDate(currentDate);
        const epoch = currentDate.getTime() / 1000;     // since AsyncStorage only stores strings, this converts currentDate to epoch time
        AsyncStorage.setItem("dob", epoch.toString());
        setShow(Platform.OS === 'ios' ? true : false);  // ensures DatetimePicker has the same behaviour in both systems
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => isShow()}>
                <View style={styles.outputContainer}>
                    <Text style={styles.label}>{label}</Text>
                    <TextInput
                        {...props}
                        style={styles.output}
                        editable={false}    // users cannot edit here, they must use DateTimePicker component
                    >
                        {outputDate}
                    </TextInput>
                </View>

                <View style={styles.icon}>
                    <Icon
                        name="calendar"
                        size={40}
                        color={Color.primary}
                    />
                </View>
            </TouchableOpacity>
            {show &&
                <DateTimePicker
                    value={date}
                    display="spinner"
                    onChange={onChange}
                    mode="date"
                    maximumDate={new Date()}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5
    },
    label: {
        fontSize: 15,
        fontWeight: "bold",
        paddingBottom: 5,
    },
    outputContainer: {
        flexDirection: "column",
        width: "87%",
    },
    output: {
        fontSize: 16,
        textAlign: "center",
        textAlignVertical: "center",
        height: 40,
        borderColor: Color.primary,
        borderWidth: 1,
        borderRadius: 10,
    },
    icon: {
        justifyContent: "flex-end",
    }
});