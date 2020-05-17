import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

// animation component which is rendered while the app loads contents
export default Loading = props => {
    return (
        <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={{ color: "#FFF" }}
        />
    );
};