import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import { Button } from "@swift-byte/switftbytecomponents";
import { Link, router } from "expo-router";
import Logo from "../assets/images/logo-green.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SB_COLOR_SCHEME } from "@/contstants";
import { RestaurantContext } from "@/context/RestaurantContext";

export default function signUp() {
  const { updateAuth, editDetail, setAllMenu } = useContext(RestaurantContext);
  const [name, setName] = useState<string>("");
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = () => {
    if (name && restaurantName && parseInt(phone) && email && password) {
      updateAuth(true, email, password);
      editDetail({
        _id: "001",
        categories: [],
        name: restaurantName,
        address: "",
        phone: "",
        averageRating: 0,
        averageWaitTime: 0,
        description: "",
        imageUrl: "",
      });
      setAllMenu([]);
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
            Sign Up
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
              <Text style={styles.subtitle}>Name</Text>
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
                value={name}
                style={styles.textInput}
                placeholder="Enter name"
                placeholderTextColor={SB_COLOR_SCHEME.SB_DISABLED}
                onChangeText={setName}
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
              <Text style={styles.subtitle}>Restaurant Name</Text>
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
                value={restaurantName}
                style={styles.textInput}
                placeholder="Enter restaurant name"
                placeholderTextColor={SB_COLOR_SCHEME.SB_DISABLED}
                onChangeText={setRestaurantName}
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
                style={styles.textInput}
                placeholder="test@swiftbyte.com"
                placeholderTextColor={SB_COLOR_SCHEME.SB_DISABLED}
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
              <Text style={styles.subtitle}>Phone</Text>
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
                value={phone}
                style={styles.textInput}
                placeholder="Enter phone number"
                placeholderTextColor={SB_COLOR_SCHEME.SB_DISABLED}
                onChangeText={setPhone}
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
                style={styles.textInput}
                placeholder="Enter password"
                secureTextEntry={true}
                placeholderTextColor={SB_COLOR_SCHEME.SB_DISABLED}
                onChangeText={setPassword}
              ></TextInput>
            </View>
          </View>
          <Button
            text={"Sign Up"}
            type={"secondary"}
            onPress={function (): void {
              handleSignUp();
            }}
          ></Button>
          <View style={[styles.dFlex, { justifyContent: "center", gap: 4 }]}>
            <Text style={{ fontWeight: "500" }}>Already have an account?</Text>
            <Text
              style={{
                color: SB_COLOR_SCHEME.SB_TERTIARY,
                textDecorationLine: "underline",
              }}
              onPress={() => router.navigate("/signIn")}
            >
              Sign In
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
    // to remove focus outline
    outlineStyle: "none",
  },
  dFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
