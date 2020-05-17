import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ListItem, SearchBar } from 'react-native-elements';
import { cancelRequestBuddy, requestBuddy, users } from "../../db/firebase/FireHelper";
import { AuthContext } from "../../db/AuthProvider";
import { Button, FlatListSeparator, Header } from "../components/index";

// this will display all the members
// current users will be able to search for any members once it is implemented
const MembersScreen = props => {
    const { navigation } = props;                // destructures props
    const { userId } = useContext(AuthContext);  // extracts current user id property
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        let mount = true;
        const fetchUsers = () => {
            users().onSnapshot(snapshot => {
                setMembers([]);                     //ensures the array is empty when mounting again
                snapshot.forEach(user => {
                    let id = user.id;
                    let request = false;
                    if (userId !== id) {            // collects member's data except current user's.
                        let photo = user.data().photoURL;
                        let username = user.data().username;
                        let relationship = user.data().relationship;
                        let place = user.data().place;
                        let description = user.data().description;
                        let requestReceived = user.data().requestReceived;
                        if (requestReceived) {      // looks for if this member has a request by current user
                            for (let i = 0; i < requestReceived.length; i++) {
                                if (userId == requestReceived[i]) {
                                    request = true;
                                    break;
                                }
                            }
                        }
                        let temp = { // creates a member object
                            id,
                            photo,
                            username,
                            relationship,
                            place,
                            description,
                            request,
                        }
                        setMembers(members => [...members, temp]); // adds a member to the array
                    }
                });
            });
        };
        if (mount)      // ensures the method runs when it is mounted only
            fetchUsers();
        return () => {   // cleans up to prevent memory leak
            mount = false;
            users();
        };
    }, []);

    // sends information via params to UsersScreen
    const viewProfile = (item) => {
        navigation.navigate("UserScreen",
            {
                tempId: item.id,
                tempImage: item.photo,
                tempUsername: item.username,
                tempRelationship: item.relationship,
                tempPlace: item.place,
                tempDescription: item.description
            }
        );
    }

    // TODO
    const searcher = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={searchMember}
                value={search}
            />
        );
    };

    // TODO
    const searchMember = member => {
        setSearch(member);
    };

    const sendRequest = item => {
        const request = item.request; //options below will be presented depending whether there is a request
        return (
            <Button
                title={request ? "Cancel" : "Add"}
                onPress={() => {
                    if (request)
                        cancelRequestBuddy(userId, item.id, item.username);
                    else
                        requestBuddy(userId, item.id, item.username);
                }}
                style={{ width: 70 }}
            />
        );
    };

    return (
        <View>
            <Header label="Members" destination={navigation} />
            <FlatList
                ListHeaderComponent={searcher}
                data={members}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <FlatListSeparator />}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.username}
                        subtitle={item.place}
                        leftAvatar={{ source: { uri: item.photo } }}
                        onPress={() => viewProfile(item)}
                        chevron={sendRequest(item)}
                    />
                )}
            />
        </View>
    );
};

export default MembersScreen;