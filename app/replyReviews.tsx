import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button } from "@swift-byte/switftbytecomponents";
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.innerContainer}>
        <View
          style={[styles.dFlex, { marginBottom: 10, alignItems: "flex-end" }]}
        >
          <View
            style={[styles.textContainer, { backgroundColor: "transparent" }]}
          >
            <TextInput
              value={authorReply}
              placeholder="Enter your reply here"
              onChangeText={setAuthorReply}
              multiline={true}
              style={styles.textInput}
            ></TextInput>
          </View>
        </View>
        <View
          style={[
            {
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: 20,
              width: "100%",
            },
          ]}
        >
          <Button text={"Submit"} type={"primary"} onPress={handleSaveReply} />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 2,
    justifyContent: "space-between",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    color: "transparent",
    width: "100%",
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  scrollView: {
    backgroundColor: "white",
    padding: 32,
  },
  dFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  textInput: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
    paddingLeft: 10,
    paddingTop: 10,
    // marginLeft: 100,
    textAlignVertical: "top",
  },
  textContainer: {
    width: "100%",
    flexDirection: "column",
  },
});
