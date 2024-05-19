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
import Toast from "react-native-toast-message";

export default function signIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { auth, updateAuth, editDetail, setAllMenu } =
    useContext(RestaurantContext);

  const handleSubmit = () => {
    if (email === "avery@sb.com" && password === "mypassword") {
      updateAuth(true, email, password);
      editDetail({
        _id: "001",
        categories: [
          {
            id: 7,
            name: "Thailand",
            imageUrl:
              "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
        ],
        name: "Kinn Thai",
        address: "3 Crown St, Wollongong",
        phone: "045678909",
        averageRating: 4.5,
        averageWaitTime: 48,
        description: "Famous thai restaurant in Wollongong.",
        imageUrl:
          "https://images.pexels.com/photos/12178096/pexels-photo-12178096.jpeg?auto=compress&cs=tinysrgb&w=800",
      });
      setAllMenu([
        {
          id: "1",
          name: "Pad Thai",
          description:
            "A stir-fried rice noodle dish commonly served as a street food and at most restaurants in Thailand.",
          price: 10,
          imageUrl:
            "https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          id: "2",
          name: "Sushi",
          description:
            "A Japanese dish of prepared vinegared rice, usually with some sugar and salt, accompanying a variety of ingredients.",
          price: 12,
          imageUrl:
            "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          id: "3",
          name: "Kimchi",
          description:
            "A staple in Korean cuisine, made from salted and fermented vegetables, most commonly napa cabbage and Korean radishes.",
          price: 8,
          imageUrl:
            "https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          id: "4",
          name: "Pho",
          description:
            "A Vietnamese soup consisting of broth, rice noodles, herbs, and meat, often served with bean sprouts and lime wedges.",
          price: 12,
          imageUrl:
            "https://images.pexels.com/photos/2089712/pexels-photo-2089712.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          id: "5",
          name: "Dim Sum",
          description:
            "A style of Chinese cuisine prepared as small bite-sized portions of food served in small steamer baskets or on small plates.",
          price: 16,
          imageUrl:
            "https://images.pexels.com/photos/2689419/pexels-photo-2689419.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          id: "6",
          name: "Shezuan Chicken",
          description:
            "A style of Chinese cuisine prepared as small bite-sized portions of food served in small steamer baskets or on small plates.",
          price: 18,
          imageUrl:
            "https://images.pexels.com/photos/3297882/pexels-photo-3297882.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
      ]);

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
