import React from "react";
import { View } from "react-native";
import Color from "../constants/colors";

// a customized separator for flatlist
export default FlatListSeparator = props => {
    return (
        <View
            style={{
                height: 2,
                alignSelf: "center",
                width: "85%",
                backgroundColor: Color.primary,
            }}
        />
    );
};