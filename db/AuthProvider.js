"use strict"
import React, { useReducer, useEffect, useMemo, useState } from "react";
import firebase from "firebase";
import { validateDateOfBirth, validateEmail, validatePassword } from "./validationHelper";
import { okButton, cancelOkButton } from "../src/components/DialogBox";
import { deleteImage, user } from "./firebase/FireHelper";
import config from "./firebase/config";

// React Context permits to access data without having to pass props
// I create a Context here, export it, and use in other components
export const AuthContext = React.createContext();

// back-end which manages the auth state
const AuthProvider = props => {
    const [userId, setUserId] = useState(undefined);
    const [buddy, setBuddy] = useState("");
    const [state, dispatch] = useReducer(
        (prevState, action) => {    // reducer
            switch (action.type) {
                case "SET_UP":
                    return {
                        ...prevState,
                        isLoading: false,
                    };
                case "SIGN_IN":
                    return {
                        ...prevState,
                        isSignIn: action.payload
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        isSignIn: action.payload,
                    };
                case "SIGN_UP":
                    return {
                        ...prevState,
                        isSignIn: action.payload
                    };
            }
        },
        {   // initial state
            isLoading: true,
            isSignIn: false,
        }
    );

    // this will run as soon as the app is open
    useEffect(() => {
        (() => {
            try {
                if (!firebase.apps.length) { // initializinging Firebase database connection
                    firebase.initializeApp({
                        apiKey: config.firebase.apiKey,
                        authDomain: config.firebase.authDomain,
                        databaseURL: config.firebase.databaseURL,
                        projectId: config.firebase.projectId,
                        storageBucket: config.firebase.storageBucket,
                        messagingSenderId: config.firebase.messagingSenderId,
                        appId: config.firebase.appId,
                    });
                }
            } catch (e) {
                okButton("Sorry", `Unable to start application: ${e}`);
            }
            dispatch({ type: 'SET_UP' });
        })();
    }, []);     // empty array to signal React to run the function inside only once

    // useMemo is used to improve performance by eliminating some re-renders
    // useMemo is passed as value in Provide (below) which becomes global
    const authMemo = useMemo(() => ({
        buddy: buddy,
        userId: userId,
        isSignIn: state.isSignIn,

        // signing the user in
        signIn: data => {
            const { email, password } = data;       // destructures values from Submit button in SignInScreen
            if (email !== "" && password !== "") {  // ensures data is not empty
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(userObj => {                  // retrieves firebase user object
                        setBuddy(userObj.user);         // sets the buddy - which contains data from users collection
                        setUserId(userObj.user.uid);    // sets the buddy id
                        okButton("Success", "Welcome!");
                        dispatch({ type: 'SIGN_IN', payload: true });
                    }).catch(error => {
                        okButton("Ooops!", `Invalid email or password. Check them and try again.`);
                        console.log("signIn error:", error, "| email:", email);
                    });
            } else
                okButton("Oy!", "Valid email and passwords are necessary.");
        },

        // signing the user out
        signOut: () => {
            firebase.auth().signOut().then(() => {
                okButton("Oh no!", "Sorry to know you have to go.");
                dispatch({ type: "SIGN_OUT", payload: false });
            }).catch(error => {
                okButton("Ooops!", `Failed to log out. Try again.`);
                console.log("signOut error:", error);
            });
        },

        //signing the user up
        signUp: async data => {
            const { username, email, confirmEmail, password, confirmPassword } = data;  // destructures values from Submit button in SignUpScreen

            // validates data
            let errorMessage = "";
            if (username !== "" && email !== "" && confirmEmail !== "" && password !== "" && confirmPassword !== "") { // ensures data is not empty
                errorMessage = "";          // cleaning any previous error messages

                const { validDateOfBirth, dob, errorDateOfBirth } = await validateDateOfBirth();    // validating date of birth
                errorMessage += errorDateOfBirth;

                const { validEmail, errorEmail } = validateEmail(email, confirmEmail);              // validating email
                errorMessage += errorEmail;

                const { validPass, errorPass } = validatePassword(password, confirmPassword);       // validating password
                errorMessage += errorPass;

                // sends data to the database if everything is in order
                if (validDateOfBirth && validEmail && validPass) {
                    await firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(userObj => {                      // after creating, a user object is returned

                            // updates the firebase built-in displayName with username and photoURL with PlusBuddy logo
                            userObj.user.updateProfile({
                                displayName: username,
                                photoURL: config.firebase.defaultPhotoURL
                            }).then(() => {
                                setBuddy(userObj.user);         // sets the buddy - which contains data from users collection
                                setUserId(userObj.user.uid);    // sets the buddy id
                            }).catch(error => {
                                console.lo("NOT UPDATED:", error);
                            });

                            // creates a user in users collection
                            // sets username and photURL (again)
                            // this redundancy is necessary so other users can see current user's information
                            user(userObj.user.uid)
                                .set({                          // these will be the default values
                                    username,
                                    dob,
                                    photoURL: config.firebase.defaultPhotoURL,
                                    relationship: "No answer",
                                    place: "",
                                    description: "",
                                    buddies: [],
                                    requestSent: [],
                                    requestReceived: []
                                }).then(() => {
                                    okButton("Yayyy!", "Welcome.");
                                    dispatch({ type: "SIGN_UP", payload: true });
                                }).catch(error => {
                                    console.log("signUp adding user error:", error, "| email:", email, " | password:", password);
                                });
                        }).catch(error => {
                            okButton("Hmmmm!", "Email already in use. Try to recover it.");
                            console.log("signUp error:", error, "| email:", email, " | password:", password);
                        });
                }
                // if any, displays the error message as an alert
                errorMessage !== "" ? okButton("Hmmmm!", errorMessage) : true;
            } else {
                errorMessage = "Valid username, date of birth, email and password are necessary.";
                okButton("Hmmmm!", errorMessage);
            }
        },

        // recovering user's password
        passRecovery: data => {
            const { email } = data;         // destructures value from Submit button in ForgottenPasswordScreen

            if (email !== "") {
                firebase.auth().sendPasswordResetEmail(email)   // resets a user's password through the email
                    .then(() => {
                        okButton("Yayyyy!", "Check your mailbox (and spam folder if necessary).");
                    }).catch(error => {
                        okButton("Hmmmm!", "Email not registered.");
                        console.log(error);
                    });
            } else {
                okButton("Oy!", "A valid email is necessary.");
            }
        },

        // changing user's email
        changeEmail: data => {
            const { newEmail, confirmNewEmail } = data;     // destructures value from "Update Email" button in SettingsScreen
            const { validEmail, errorEmail } = validateEmail(newEmail, confirmNewEmail);    // validating email
            if (validEmail) {
                firebase.auth().currentUser
                    .updateEmail(newEmail)
                    .then(() => {
                        okButton("Success", `Remember your new email ${newEmail}`);
                    }).catch(error => {
                        okButton("Oooops", "Failed to update your email.", error);
                        console.log("changeEmail error:", error);
                    });
            } else {
                okButton("Aw snap", errorEmail);
            }
        },

        //change user's password
        changePass: data => {
            const { newPassword, confirmNewPassword } = data;   // destructures value from "Update Password" button in SettingsScreen
            const { validPass, errorPass } = validatePassword(newPassword, confirmNewPassword);     // validating password
            if (validPass) {
                firebase.auth().currentUser
                    .updatePassword(newPassword)
                    .then(() => {
                        okButton("Yayyy", "Don't forget your new passowrd.");
                    }).catch(error => {
                        okButton("Oh no", "Failed to change your password. Sign out and back in to try again.");
                        console.log("changePass error:", error);
                    });
            } else {
                okButton("Aw snap", errorPass);
            }
        },

        //deleting user's account
        deleteAccount: () => {
            // if user still wants to delete the account
            const yes = () => {
                const member = firebase.auth().currentUser;
                deleteImage("profileImages", member.uid)    // deleting user's profile image in the storage
                    .catch(error => {
                        console.log("deleteProfileImage error:", error);
                    });
                user(member.uid).delete()                   // deleting user's profile in the collection
                    .catch(error => {
                        console.log("deleteAccount document error:", error);
                    });
                member.delete().then(() => {                // deleting the user account in firebase
                    okButton("Oh no", "You have deleted your account successfully.\nHope you'll come back soon.");
                    dispatch({ type: "SIGN_OUT", payload: false });
                }).catch(error => {
                    okButton("Oh no", "Failed to delete your account. Sign out and back in to try again.");
                    console.log("deleteAccount error:", error);
                });
            }
            // if user changed the mind
            const no = () => {
                okButton("Phew!", "Your account has not been deleted.");
            }
            // dialog box which prompts the user with a question            
            cancelOkButton("Delete your account?", "Are you sure?",
                no,
                yes
            );
        }
    }), [state.isSignIn]);      // list of dependencies which watches for any changes

    return ( // the whole app will be encapsulated (see App.js) in order to watch and receive the props described above
        <AuthContext.Provider value={authMemo}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;