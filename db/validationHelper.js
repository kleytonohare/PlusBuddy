import { AsyncStorage } from "react-native";

// this is purely to help with validation

// validating whether it is a real email
export const validateEmail = (email1, email2) => {
    let errorMessage = "";
    const regex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    if (email1 === email2) {
        if (regex.test(email1) === true && regex.test(email2) === true) {
            return { validEmail: true, errorEmail: errorMessage };
        } else
            errorMessage += "Not a validate email... "
    } else
        errorMessage += "Emails don't match... ";
    return { validEmail: false, errorEmail: errorMessage };
};


// validating whether two strings of passwords match
export const validatePassword = (pass1, pass2) => {
    let errorMessage = "";
    // password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (pass1 === pass2) {
        if (regex.test(pass1) === true && regex.test(pass2) === true) {
            return { validPass: true, errorPass: errorMessage };
        } else {
            errorMessage += "Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter... ";
        }
    } else
        errorMessage += "Passwords don't match... ";
    return { validPass: false, errorPass: errorMessage };
}

// validating data of birth
export const validateDateOfBirth = async () => {
    const dobString = await AsyncStorage.getItem("dob");    // gets the Date in a string format from AsyncStorage
    const epoch = dobString * 1000;
    const dobObject = await new Date(epoch);                // converts back to Date object
    const today = new Date();
    let errorMessage = "";

    // ensures user is at least 18 years old
    if (dobObject.getFullYear() <= (today.getFullYear() - 18)) {
        return { validDateOfBirth: true, dob: dobObject, errorDateOfBirth: errorMessage };
    } else {
        errorMessage += "You must be over 18... ";
        return { validDateOfBirth: false, dob: today, errorDateOfBirth: errorMessage };
    }
}