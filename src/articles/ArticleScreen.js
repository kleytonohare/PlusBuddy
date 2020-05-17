import React from "react";
import { ScrollText, TextBody, TextTitle } from "../components/index";

//this screen will display an article
const ArticleScreen = props => {
    const { navigation, route } = props;    // destructures props
    const { body, label, title } = route.params;   // destructures route params

    return (
        <ScrollText label={label} destination={navigation}>
            <TextTitle>{title}</TextTitle>
            <TextBody>{body}</TextBody>
        </ScrollText>
    );
};

export default ArticleScreen;