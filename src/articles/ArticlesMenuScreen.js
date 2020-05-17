import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Header, TextLink, TextTitle } from "../components/index";
import Articles from "../constants/articles";

// this screen shows links to articles
const ArticlesScreen = props => {
    const { navigation } = props;   // destructures props
    return (
        < FlatList
            contentContainerStyle={styles.container}
            data={Articles}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
                <Header label="Articles" destination={navigation} />
            }
            ListHeaderComponentStyle={{ width: "100%", paddingBottom: 100 }}
            renderItem={({ item }) => (
                <TextTitle>
                    <TextLink
                        onPress={() => navigation.navigate(
                            "Article", {
                            body: item.body,
                            label: item.path,
                            title: item.title,
                        })}
                    >
                        {item.title}
                    </TextLink>
                </TextTitle>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    }
});

export default ArticlesScreen;