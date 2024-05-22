import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../assets/images/logo-yellow.svg";
import { Link, router } from "expo-router";
import { Button } from "@swift-byte/switftbytecomponents";
import { SB_COLOR_SCHEME } from "@/contstants";
import WelcomeImage from "../assets/images/sb-welcome.svg";

export default function welcome() {
  return (
    <SafeAreaView
      style={{ height: "100%", backgroundColor: SB_COLOR_SCHEME.SB_SECONDARY }}
    >
      <View style={styles.container}>
        <Logo width={200} height={250} />
        <WelcomeImage width={400} height={650}/>
        <View>
          <Button
            text={"Sign In"}
            type={"primary"}
            onPress={function (): void {
              router.navigate("/signIn");
            }}
          ></Button>
          <Button
            text={"Sign Up"}
            type={"secondary"}
            onPress={function (): void {
              router.navigate("/signUp");
            }}
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: SB_COLOR_SCHEME.SB_SECONDARY,
  },
});
