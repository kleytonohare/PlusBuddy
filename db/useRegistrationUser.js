import { useContext, useEffect, useState } from "react";
import { user } from "./firebase/FireHelper";
import { AuthContext } from "./AuthProvider";

// back-end which manages the users collection
export const useRegistrationUser = () => {
    const { userId, buddy } = useContext(AuthContext);          // extracts current user id and extra user information as buddy properties
    const [buddyExtraInfo, setBuddyExtraInfo] = useState(undefined);

    // loading the current user from the server
    useEffect(() => {
        (async () => {
            await user(userId).get().then(doc => {
                setBuddyExtraInfo(doc.data());
            })
        })();
    }, []);

    // updating profile image
    const patchImage = async data => {
        let status = false;
        await buddy.updateProfile({
            photoURL: data
        }).then(() => {
            user(userId).update({
                photoURL: data
            });
            status = true;
        }).catch(error => {
            console.lo(`userId: ${userId}. Error updating IMAGE. ${error}`);
        })
    }

    // updating username
    const patchUsername = async data => {
        let status = false;
        await buddy.updateProfile({ //this (and the others below) has to await so it returns true after processing data
            displayName: data
        }).then(() => {
            user(userId).update({
                username: data
            });
            status = true;
        }).catch(error => {
            console.lo(`userId: ${userId}. Error updating USERNAME. ${error}`);
        });
        return status;
    }

    // updating date of birth
    const patchDOB = async data => {
        let status = false;
        await user(userId).update({
            dob: data
        }).then(error => {
            if (!error)
                status = true;
            else
                console.log(`userId: ${userId}. Error updating DATE OF BIRTH. ${error}`);
        });
        return status;
    }

    // updating relationship
    const patchRelationship = async data => {
        let status = false;
        await user(userId).update({
            relationship: data
        }).then(error => {
            if (!error)
                status = true;
            else
                console.log(`userId: ${userId}. Error updating RELATIONSHIP. ${error}`);
        });
        return status;
    }

    // updating place
    const patchPlace = async data => {
        let status = false;
        await user(userId).update({
            place: data
        }).then(error => {
            if (!error)
                status = true;
            else
                console.log(`userId: ${userId}. Error updating PLACE. ${error}`);
        });
        return status;
    }

    // updating description
    const patchDescription = async data => {
        let status = false;
        await user(userId).update({
            description: data
        }).then(error => {
            if (!error)
                status = true;
            else
                console.log(`userId: ${userId}. Error updating DESCRIPTION. ${error}`);
        });
        return status;
    }

    return {
        buddyExtraInfo,
        actions: {
            patchImage,
            patchUsername,
            patchDOB,
            patchRelationship,
            patchPlace,
            patchDescription
        }
    };
}