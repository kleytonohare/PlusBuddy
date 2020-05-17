import React from "react";
import { View, Text, Picker, StyleSheet } from "react-native";
import Color from "../constants/colors";

export default DropDownInput = props => {
    const { list, label } = props;          // destructores props

    // the list array (from props) generates the options
    const options = list.map((value, key) => {
        return <Picker.Item label={value} value={value} key={key} />
    });

    return (
        <View style={styles.container}>
            <Text  {...props} style={{ ...styles.label, ...props.style }}>{label}</Text>
            <View style={{ ...styles.picker }}>
                <Picker
                    {...props}
                    mode="dropdown"
                    list={list}     // receives the list prop from parent component
                >
                    {options}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        paddingVertical: 10,
    },
    label: {
        fontSize: 15,
        fontWeight: "bold",
        paddingBottom: 5,
    },
    picker: {
        borderColor: Color.primary,
        borderRadius: 10,
        borderWidth: 1,
        padding: 0
    }
});