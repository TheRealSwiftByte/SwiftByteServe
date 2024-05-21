import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "@swift-byte/switftbytecomponents";
import { Link, router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SB_COLOR_SCHEME } from "@/contstants";

import {
    NavigationProp,
    ParamListBase,
    RouteProp,
} from "@react-navigation/native";
  
interface ReplyProps {
    navigation: NavigationProp<ParamListBase>;
    route: RouteProp<ParamListBase>;
}

export default function replyReviews({ navigation, route }: ReplyProps) {
    const [authorReply, setAuthorReply] = useState<string>("");
    const handleSaveReply = () => {
        console.log("Reply saved:", authorReply);
        setAuthorReply("");
    };
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView style={styles.scrollView}>
                <View style={styles.innerContainer}>
                    <View style={[styles.dFlex, { marginBottom: 10, alignItems: "flex-end" }]}>
                        <View style={[styles.textContainer,{backgroundColor: "transparent"}]}>
                            <TextInput
                                value={authorReply}
                                placeholder="Enter your reply here"
                                onChangeText={setAuthorReply}
                                style={styles.textInput}
                            ></TextInput>
                        </View>
                    </View>
                    <View style={[
                        { flexDirection: "column", alignItems: "center", marginTop: 60, width: "100%", },
                    ]}>
                            <Button
                                text={"Submit"}
                                type={"primary"}
                                onPress={handleSaveReply}
                            />
                    </View>
                </View> 
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 32,
        flex: 2,
        justifyContent: "space-between",
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        color:"transparent",
        width: "100%",
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    scrollView: {
        backgroundColor: "transparent",
    },
    dFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    textInput: {
        width: 500,
        height: 300,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "grey",
        paddingLeft: 10,
        paddingTop: 10,
        marginLeft:100,
        textAlignVertical: 'top',
    },
    textContainer: {
        width: "100%", 
        flexDirection: "column",
        marginTop:50, 
    }

});