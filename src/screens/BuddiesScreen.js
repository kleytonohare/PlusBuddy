import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ListItem, SearchBar } from 'react-native-elements';
import { AuthContext } from "../../db/AuthProvider";
import { cancelRequestBuddy, user } from "../../db/firebase/FireHelper";
import { Button, FlatListSeparator, Header, TextBody } from "../components/index";

// this will display current user's buddies
// current users will be able to search for his/her buddies once it is implemented
const BuddiesScreen = props => {
    const { navigation } = props;                           // destructures props
    const { userId } = useContext(AuthContext);             // extracts current user id property
    const [buddies, setBuddies] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        let mount = true;
        const fetchUsers = () => {
            user(userId).onSnapshot(snapshot => {
                setBuddies([]);                             //ensures the array is empty when mounting again
                snapshot.data().requestSent.forEach(id => { //loops only requestSent array stored in the database
                    user(id).get().then(buddy => {
                        let buddyId = id;
                        let photo = buddy.data().photoURL;
                        let username = buddy.data().username;
                        let relationship = buddy.data().relationship;
                        let place = buddy.data().place;
                        let description = buddy.data().description;
                        let temp = {        // creates a member object
                            id: buddyId,
                            photo,
                            username,
                            relationship,
                            place,
                            description
                        }
                        setBuddies(members => [...members, temp]); // adds a member to the array
                    });
                });
            });
        };
        if (mount)          // ensures the method runs when it is mounted only
            fetchUsers();
        return () => {      // cleans up to prevent memory leak
            mount = false;
            user(userId);
        }
    }, [setBuddies]);

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
    };

    // TODO
    const searcher = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={searchBuddy}
                value={search}
            />
        );
    };

    // TODO
    const searchBuddy = buddy => {
        setSearch(buddy);
    };

    // removes a buddy from the list
    const removeBuddy = item => {
        return (
            <Button
                title="Remove"
                onPress={() => {
                    cancelRequestBuddy(userId, item.id, item.username);
                }}
                style={{ width: 70 }}
            />
        );
    };

    return (
        <View>
            <Header label="Buddies" destination={navigation} />
            {buddies.length > 0 ?
                <FlatList
                    ListHeaderComponent={searcher}
                    data={buddies}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <FlatListSeparator />}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.username}
                            subtitle={item.place}
                            leftAvatar={{ source: { uri: item.photo } }}
                            onPress={() => viewProfile(item)}
                            chevron={() => removeBuddy(item)}
                        />
                    )}
                />
                : <TextBody>Go and make some buddies</TextBody>
            }
        </View>
    );
};

export default BuddiesScreen;
