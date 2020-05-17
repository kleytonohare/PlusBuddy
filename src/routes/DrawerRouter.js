import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "../../db/AuthProvider";
import { MyDrawer } from "../components/index";
import Color from "../constants/colors";
import StackRouter from "./StackRouter";
import AboutScreen from "../articles/AboutScreen";
import ArticlesMenuScreen from "../articles/ArticlesMenuScreen";
import BuddiesScreen from "../screens/BuddiesScreen";
import ChatScreen from "../screens/ChatScreen";
import MembersScreen from "../screens/MembersScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SignOutScreen from "../screens/SignOutScreen";
import UserScreen from "../screens/UserScreen";

const Drawer = createDrawerNavigator();     // creates a drawer navigator

// This is a navigator which users can either tap top right corner button (in the header)
// or slide from right screen edge inwards to see a menu of screens.
// The menu options will depend whether a user is signed in or not.
const DrawerRouter = props => {
    const { isSignIn } = useContext(AuthContext);   // extracts isSignIn property
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={MyDrawer}
                backBehavior="history"
                drawerStyle={{
                    backgroundColor: Color.background,
                    width: 200,
                }}
                drawerType="slide"
                drawerPosition="right"
                drawerContentOptions={{
                    activeTintColor: "white",
                    activeBackgroundColor: Color.primary,
                    inactiveTintColor: "black",
                    labelStyle: { fontWeight: "bold" }
                }}
                keyboardDismissMode="on-drag"
            >
                {!isSignIn ? (      // deafult status is false so here it has to be not false
                    <>
                        <Drawer.Screen
                            name="Home"
                            component={StackRouter}
                            options={{
                                title: "Home",
                            }}
                        />
                        <Drawer.Screen
                            name="About"
                            component={AboutScreen}
                        />
                        <Drawer.Screen
                            name="Articles"
                            component={ArticlesMenuScreen}
                        />
                    </>
                ) : (
                        <>
                            <Drawer.Screen
                                name="Chatroom"
                                component={ChatScreen}
                                options={{
                                    title: "Chatroom",
                                }}
                            />
                            <Drawer.Screen
                                name="About"
                                component={AboutScreen}
                            />
                            <Drawer.Screen
                                name="Articles"
                                component={StackRouter}
                                options={{
                                    title: "Articles",
                                }}
                            />
                            <Drawer.Screen
                                name="Buddies"
                                component={BuddiesScreen}
                                options={{
                                    title: "Buddies",
                                }}
                            />
                            <Drawer.Screen
                                name="Members"
                                component={MembersScreen}
                                options={{
                                    title: "Members",
                                }}
                            />
                            <Drawer.Screen
                                name="ProfileScreen"
                                component={ProfileScreen}
                                options={{
                                    title: "My Profile",
                                }}
                            />
                            <Drawer.Screen
                                name="Settings"
                                component={SettingsScreen}
                                options={{
                                    title: "Settings",
                                }}
                            />
                            <Drawer.Screen
                                name="SingOut"
                                component={SignOutScreen}
                                options={{
                                    title: "Sign Out",
                                }}
                            />
                            <Drawer.Screen
                                name="UserScreen"
                                component={UserScreen}
                                options={{
                                    title: "",
                                }}
                            />
                        </>
                    )}
            </Drawer.Navigator>
        </NavigationContainer >
    );
};

export default DrawerRouter;