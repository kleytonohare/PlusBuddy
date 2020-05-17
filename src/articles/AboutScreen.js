import React, { useContext } from "react";
import { ScrollText, TextBody, TextLink, TextTitle } from "../components/index";
import { AuthContext } from "../../db/AuthProvider";

// this screen is a description about the app
const About = props => {
    const { navigation } = props;                   // destructures props
    const { isSignIn } = useContext(AuthContext);   // extracts isSignIn property
    return (
        <ScrollText label="About" destination={navigation}>
            <TextTitle>About the App</TextTitle>
            <TextBody>This community of trust contains everything you need to know about HIV/AIDS plus some useful links in case you wish to dive deeper.</TextBody>
            <TextBody>Registered members can also enjoy a dynamic chatroom in which they can speak freely about anything especially about HIV; they are stimulated to express their thoughts, help each other with personal experiences and not worry about being discriminated due to stigma built on top of HIV.</TextBody>
            <TextBody>The core idea is to connect people living with HIV so that mutual support is encouraged.</TextBody>
            <TextBody>So, if you are living with HIV, don't miss out to connect with others.</TextBody>

            {!isSignIn &&       // links below are just for not-signed-in users
                <TextBody style={{ height: 40 }}><TextLink onPress={() => navigation.navigate("SignUp")}>Sign up</TextLink> now or <TextLink onPress={() => navigation.navigate("SignIn")}>Sign back in</TextLink>.</TextBody>
            }
        </ScrollText>
    );
};

export default About;