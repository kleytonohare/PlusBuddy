import firebase from "firebase";
import { messages, toDate } from "./FireHelper";

class FireAuth {
    constructor() {
        this.limit = 40;    // limits the number of messages when app is initialized
    }

    // retrieves up to a limit of past messages and new ones
    fetchMessages = callback => {
        messages().orderBy("timestamp").limitToLast(this.limit)
            .onSnapshot(snapshot => {                   // listening for real time changes
                snapshot.docChanges().forEach(change => {
                    if (change.type === "added") {      // adds new messages too
                        callback(this.parse(change.doc));
                    }
                });
            });
    };

    // formats the message from the database to GiftedChat
    parse = snapshot => {
        const { text, timestamp, user } = snapshot.data();  // destructures values from the database
        const _id = snapshot.id;
        const date = toDate(timestamp);                     // converts the database timestamp to JS date object
        const message = {                                   // build an object GiftedChat understands
            _id,
            text,
            createdAt: date,
            user,
        };
        return message;
    };

    // sends the message to the database
    send = data => {
        for (let i = 0; i < data.length; i++) {
            const { text, user } = data[i]; // detructures data as messages
            messages().add({                // adds the message to the database
                text,
                user,
                timestamp: firebase.firestore.Timestamp.now()
            }).catch(error => {
                console.log("Error adding message:", error, " | user:", user);
            });
        }
    };

    // detaches the listener
    disconnectMessages() {
        messages();
    }
}

FireAuth = new FireAuth();  // instantiates FireAuth

export default FireAuth;
