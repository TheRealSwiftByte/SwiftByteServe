import { RestaurantContext } from "@/context/RestaurantContext";
import React, { useCallback, useContext, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { SB_COLOR_SCHEME } from "@/contstants";
import NextIcon from "../../assets/icons/chevron-forward-outline.svg";
import { router, useFocusEffect } from "expo-router";
import { Api } from "@/api/api";

const Profile = () => {
  const { details, editDetail, auth, updateAuth } =
    useContext(RestaurantContext);
  // const [image, setImage] = useState<string>();

  function getInitial(): any {
    const temp = details.name?.split(" ");
    if (temp) {
      if (temp?.length > 1) {
        return `${temp[0]?.charAt(0).toUpperCase()}${temp[1]
          ?.charAt(0)
          .toUpperCase()}`;
      } else {
        return `${temp[0]?.charAt(0).toUpperCase()}`;
      }
    } else {
      return;
    }
  }

  const handleSignOut = () => {
    updateAuth(false, "", "");
    router.navigate("/welcome");
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     try {
  //       setRestaurant(Api.getApi().getActiveRestaurant());
  //       Api.getApi()
  //         .getOrdersByRestaurantId(restaurant.id)
  //         .then((res) => {
  //           setOrderHistory(res);
  //         });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }, [])
  // );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Avatar
          size="xlarge"
          rounded
          source={{ uri: details?.imageURI }}
          title={details ? getInitial() : ""}
          activeOpacity={0.7}
          containerStyle={{
            backgroundColor: SB_COLOR_SCHEME.SB_SECONDARY,
            marginBottom: 20,
          }}
        />
        <Text style={[styles.value, { fontWeight: "500", fontSize: 16 }]}>
          {details?.name}
        </Text>
        <Text style={styles.value}>{details?.address}</Text>
        <Pressable
          style={[styles.item, { marginTop: 20, width: "50%" }]}
          onPress={() => router.navigate("/MyProfile")}
        >
          <Text>My Profile</Text>
          <NextIcon width={20} height={20} />
        </Pressable>
        <Pressable
          style={[styles.item, { width: "50%" }]}
          onPress={() => router.navigate("/MyMenu")}
        >
          <Text>My Menu</Text>
          <NextIcon width={20} height={20} />
        </Pressable>
        <Pressable style={[styles.item, { width: "50%" }]}>
          <Text>Settings</Text>
          <NextIcon width={20} height={20} />
        </Pressable>
        <Pressable style={[styles.item, { width: "50%" }]}>
          <Text>Help</Text>
          <NextIcon width={20} height={20} />
        </Pressable>
        <Pressable
          style={[styles.item, { width: "50%" }]}
          onPress={handleSignOut}
        >
          <Text>Sign Out</Text>
          <NextIcon width={20} height={20} />
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 20,
    alignItems: "center",
    flexDirection: "column",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
    margin: 8,
    borderRadius: 6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  details: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "#333",
  },
  value: {
    fontSize: 14,
    marginBottom: 8,
    color: SB_COLOR_SCHEME.SB_SECONDARY,
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Profile;
