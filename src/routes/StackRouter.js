import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../../db/AuthProvider";
import AboutScreen from "../articles/AboutScreen";
import ArticlesMenuScreen from "../articles/ArticlesMenuScreen";
import ArticleScreen from "../articles/ArticleScreen";
import ForgottenPasswordScreen from "../screens/ForgottenPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createStackNavigator();       // creates a stack navigator

// This navigator enables users to navigato to different screens
// without using the drawer navigator.
// Navigation is depended on whether a user is signed in or not.
const StackRouter = props => {
    const { isSignIn } = useContext(AuthContext);   // extracts isSignIn property
    return (
        <Stack.Navigator
            initialRouteName={HomeScreen}
            headerMode="none"           // no default header
        >
            {!isSignIn ? (              // deafult status is false so here it has to be not false
                <>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            title: "Welcome",
                        }}
                    />
                    <Stack.Screen
                        name="SignIn"
                        component={SignInScreen}
                        options={{
                            title: "Sign In",
                        }}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUpScreen}
                        options={{
                            title: "Sign Up"
                        }}
                    />
                    <Stack.Screen
                        name="ForgottenPassword"
                        component={ForgottenPasswordScreen}
                        options={{
                            title: "Password Recovery"
                        }}
                    />
                    <Stack.Screen
                        name="About"
                        component={AboutScreen}
                    />
                    <Stack.Screen
                        name="Article"
                        component={ArticleScreen}
                    />
                </>
            ) : (
                    <>
                        <Stack.Screen
                            name="Articles"
                            component={ArticlesMenuScreen}
                        />
                        <Stack.Screen
                            name="Article"
                            component={ArticleScreen}
                        />
                    </>
                )}
        </Stack.Navigator>
    );
};

export default StackRouter;