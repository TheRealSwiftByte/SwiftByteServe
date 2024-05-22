import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Button, TextInput as TS } from "@swift-byte/switftbytecomponents";
import { Link, router } from "expo-router";
import Logo from "../assets/images/logo-green.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SB_COLOR_SCHEME } from "@/contstants";
import { RestaurantContext } from "@/context/RestaurantContext";
import { Api } from "@/api/api";
import { Restaurant } from "@/api/schema/SwiftByteTypes";

export default function signIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { auth, updateAuth, editDetail, setAllMenu } =
    useContext(RestaurantContext);

  const handleSubmit = async () => {
    if (email  && password ) {
      const authorisedRestaurant = await Api.getApi().signInRestaurant(email, password);
      if (!authorisedRestaurant) {
        alert("Invalid email or password");
        return;
      }
      updateAuth(true, email, password);
      editDetail({
        ...authorisedRestaurant
      });
      console.log('res',authorisedRestaurant)
      setAllMenu(authorisedRestaurant.menu);

      router.navigate("/");
    }
  };

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "white" }}>
      <KeyboardAwareScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Logo width={130} height={50} />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: SB_COLOR_SCHEME.SB_SECONDARY,
            }}
          >
            Sign In
          </Text>
          <View
            style={[
              styles.dFlex,
              { alignItems: "flex-end", marginBottom: -10 },
            ]}
          >
            <View
              style={[
                styles.dFlex,
                { flexDirection: "column", alignItems: "flex-start" },
              ]}
            >
              <Text style={styles.subtitle}>Email address</Text>
            </View>
          </View>
          <View
            style={[
              styles.dFlex,
              {
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#BBC5C1",
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={[styles.dFlex, { backgroundColor: "transparent" }]}>
              <TextInput
                value={email}
                placeholderTextColor={SB_COLOR_SCHEME.SB_DISABLED}
                style={styles.textInput}
                placeholder="test@swiftbyte.com"
                onChangeText={setEmail}
              ></TextInput>
            </View>
          </View>
          <View
            style={[
              styles.dFlex,
              { alignItems: "flex-end", marginBottom: -10 },
            ]}
          >
            <View
              style={[
                styles.dFlex,
                { flexDirection: "column", alignItems: "flex-start" },
              ]}
            >
              <Text style={styles.subtitle}>Password</Text>
            </View>
          </View>
          <View
            style={[
              styles.dFlex,
              {
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#BBC5C1",
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={[styles.dFlex, { backgroundColor: "transparent" }]}>
              <TextInput
                value={password}
                secureTextEntry={true}
                placeholderTextColor={SB_COLOR_SCHEME.SB_DISABLED}
                style={styles.textInput}
                placeholder="Enter password"
                onChangeText={setPassword}
              ></TextInput>
            </View>
          </View>
          <Button
            text={"Sign In"}
            type={"secondary"}
            onPress={function (): void {
              handleSubmit();
            }}
          ></Button>

          <View style={[styles.dFlex, { justifyContent: "center", gap: 4 }]}>
            <Text style={{ fontWeight: "500" }}>Don't have an account?</Text>
            <Text
              style={{
                color: SB_COLOR_SCHEME.SB_TERTIARY,
                textDecorationLine: "underline",
              }}
              onPress={() => router.navigate("/signUp")}
            >
              Sign Up
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    flexDirection: "column",
    marginTop: 50,
    width: "50%",
    gap: 25,
    alignSelf: "center",
  },
  scrollView: {
    backgroundColor: "white",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: SB_COLOR_SCHEME.SB_SECONDARY,
  },
  textInput: {
    borderRadius: 40,
    borderWidth: 2,
    marginHorizontal: 0,
    borderColor: "transparent",
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    // @ts-ignore
    outlineStyle: "none",
  },
  dFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
