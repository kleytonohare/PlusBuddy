import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import TextBody from "./TextBody";

//customizes the drawer, placing PlusBuddy icon on top
export default MyDrawer = props => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/logo.png")} />
            <DrawerContentScrollView>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TextBody style={styles.bottom}>Kleyton Soares</TextBody>
            <TextBody>ID: 2016144</TextBody>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    image: {
        alignSelf: "center",
        justifyContent: "center",
    },
    signout: {
        fontWeight: "bold",
        color: "black"
    },
    bottom: {
        paddingBottom: 0
    }
});

// export default Drawer;