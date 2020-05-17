import firebase from "firebase";
import "firebase/firestore";
import { okButton } from "../../src/components/DialogBox";

// references to messages collection
export const messages = () => {
    return firebase.firestore().collection("messages");
}

// references to users collection
export const users = () => {
    return firebase.firestore().collection("users");
}

// takes in an id parameter to reference to a unique user location in the collection
export const user = id => {
    return firebase.firestore().collection("users").doc(id);
}

// manages buddy requests
export const requestBuddy = (currentId, buddyId, username) => {
    user(buddyId).update({          // a buddy receives a request from current user
        requestReceived: firebase.firestore.FieldValue.arrayUnion(currentId)
    });
    user(currentId).update({        // current user sends a request to a buddy
        requestSent: firebase.firestore.FieldValue.arrayUnion(buddyId)
    }).then(() => {
        okButton("Woohoo!", `${username} is your buddy.`);
    }).catch(error => {
        okButton("Ooops!", `Failed to send buddy requet to ${username}.`);
        console.log(`Error sending buddy request: ${error} | from: ${currentId} to: ${buddyId}`);
    });
}

// cancels buddy requests
export const cancelRequestBuddy = (currentId, buddyId, username) => {
    user(buddyId).update({          // a buddy cancels a request from the current user
        requestReceived: firebase.firestore.FieldValue.arrayRemove(currentId)
    });
    user(currentId).update({        // the request is automatically cancelled for the current user
        requestSent: firebase.firestore.FieldValue.arrayRemove(buddyId)
    }).then(() => {
        okButton("Aww!", `${username} is no longer your buddy.`);
    }).catch(error => {
        okButton("Ooops!", `Failed to cancel buddy requet to ${username}.`);
        console.log(`Error cancelling buddy request: ${error} | from: ${currentId} to: ${buddyId}`);
    });
}

// accepts a buddy request
export const addBuddy = (currentId, buddyId, username) => {
    user(buddyId).update({          //  updates buddy's array of buddies
        buddies: firebase.firestore.FieldValue.arrayUnion(currentId)
    });
    user(currentId).update({        // updates current user's array of buddies
        buddies: firebase.firestore.FieldValue.arrayUnion(buddyId)
    }).then(() => {
        okButton("Woohoo!", `${username} is your buddy.`);
    }).catch(error => {
        okButton("Ooops!", `Failed to sent buddy requet to ${username}.`);
        console.log(`Error sending buddy request: ${error} | from: ${currentId} to: ${buddyId}`);
    });
}

// removes a buddy
export const removeBuddy = (currentId, buddyId, username) => {
    user(buddyId).update({          // updates buddy's array of buddies
        buddies: firebase.firestore.FieldValue.arrayRemove(currentId)
    });
    user(currentId).update({
        buddies: firebase.firestore.FieldValue.arrayRemove(buddyId)
    }).then(() => {                 // updates current user's array of buddies
        okButton("Aww!", `${username} is no longer your buddy.`);
    }).catch(error => {
        okButton("Ooops!", `Failed to sent buddy requet to ${username}.`);
        console.log(`Error sending buddy request: ${error} | from: ${currentId} to: ${buddyId}`);
    });
}

// converts firestore timestamp to JS Date object
export const toDate = date => {
    return new Date(date.seconds * 1000);
}

// sends images to the storage
export const uploadImage = async (uri, folderName, imageId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return firebase.storage().ref().child(folderName + "/" + imageId).put(blob);
}

// deletes images from the storage
export const deleteImage = async (folderName, imageId) => {
    return firebase.storage().ref().child(folderName + "/" + imageId).delete();
}

