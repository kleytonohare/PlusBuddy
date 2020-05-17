import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from 'react-native';
import FireAuth from "../../db/firebase/FireAuthChat";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { AuthContext } from "../../db/AuthProvider";
import { Header, Loading } from "../components/index";
import Color from "../constants/colors";

const ChatScreen = props => {
    const { navigation } = props;                       // destructures props
    const { userId, buddy } = useContext(AuthContext);  // extracts current user id and extra user information as buddy properties
    const [messages, setMessages] = useState([]);       // stores messages
    const [show, setShow] = useState(false);            // controls when to display user information

    useEffect(() => {
        let mount = true;
        const connect = new Promise((resolve, reject) => {
            resolve(
                FireAuth.fetchMessages(message =>
                    setMessages(prevMessages => GiftedChat.append(prevMessages, message))   // adds a message in the array
                )
            );
            reject("ERROR running ChatScreen");
        });
        if (mount) {
            connect
                .then(() => setShow(!show))
                .catch(error => console.log(error));
        }
        return () => mount = false;         // cleans up to prevent memory leak
    }, [setShow, setMessages]);

    if (!show) { return <Loading /> };      // shows animated loading

    // creates a sender as a user object
    const user = {
        _id: userId,
        name: buddy.displayName,
        avatar: buddy.photoURL,
    }

    // returns different colours for different users. Source: https://github.com/FaridSafi/react-native-gifted-chat/issues/672
    const getColor = (username) => {
        let sumChars = 0;
        for (let i = 0; i < username.length; i++) {
            sumChars += username.charCodeAt(i);
        }
        const colors = ["#8a480f", "#13532e", "#13496c", "#4b245c", "#71180e", "#0c5a4a", "#2c3e50"];
        return colors[sumChars % colors.length];
    }

    return (
        <View style={styles.container}>
            <Header label="Chatroom" destination={navigation} />
            < GiftedChat
                messages={messages}
                onSend={FireAuth.send}
                user={user}
                renderUsernameOnMessage={true}
                isTyping={true}
                renderBubble={props => {
                    return (
                        <Bubble
                            {...props}
                            textStyle={{ left: { color: "white" } }}
                            wrapperStyle={{ left: { backgroundColor: getColor(props.currentMessage.user.name) } }}
                        />
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
    }
});

export default ChatScreen;