// RestaurantProfilePage.js

import {
  useRestaurantContext,
  FoodCategory,
} from "@/context/RestaurantContext";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { SB_COLOR_SCHEME } from "@/contstants";
import { Button, TextInput } from "@swift-byte/switftbytecomponents";
import { router } from "expo-router";

const MyProfile = () => {
  const { details, editDetail } = useRestaurantContext();
  const [image, setImage] = useState<string>();

  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<FoodCategory[]>([]);

  // Function to update restaurant details
  const updateDetail = (key: any, value: any) => {
    editDetail(key, value);
  };

  function getInitial(): string {
    const temp = details.name.split(" ");
    if (temp.length > 1) {
      return `${temp[0].charAt(0).toUpperCase()}${temp[1]
        .charAt(0)
        .toUpperCase()}`;
    } else {
      return `${temp[0].charAt(0).toUpperCase()}`;
    }
  }

  const handleSubmit = () => {
    console.log(name, phone, address, description)

    //still cant update details
    updateDetail("name", name);
    updateDetail("phone", phone);
    updateDetail("address", address);
    updateDetail("description", description);
    router.navigate("/profile");

  };

  useEffect(() => {
    setName(details.name);
    setAddress(details.address);
    setPhone(details.phone);
    setDescription(details.description);
    setCategories(details.categories);
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Avatar
          size="xlarge"
          rounded
          source={{ uri: image }}
          title={getInitial()}
          activeOpacity={0.7}
          containerStyle={{
            backgroundColor: SB_COLOR_SCHEME.SB_SECONDARY,
            marginBottom: 20,
            alignSelf: "center",
          }}
        />
        <Text
          style={{ textAlign: "center", textDecorationLine: "underline" }}
          onPress={pickImage}
        >
          Edit picture
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.details}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            style={styles.textInput}
            placeholder="Enter restaurant name"
            onChangeText={setName}
          ></TextInput>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            value={address}
            style={styles.textInput}
            placeholder="Enter restaurant address"
            onChangeText={setAddress}
          ></TextInput>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            value={phone}
            style={styles.textInput}
            placeholder="Enter phone"
            onChangeText={setPhone}
          ></TextInput>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Average Rating</Text>
          <Text style={styles.value}>{details.averageRating}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Average Wait Time</Text>
          <Text style={styles.value}>{details.averageWaitTime} mins</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            style={styles.textInput}
            placeholder="Enter description"
            onChangeText={setDescription}
          ></TextInput>
        </View>
        <View style={styles.details}>
          <Text style={[styles.label, { marginBottom: 10 }]}>
            Category {"  "}+
          </Text>
          {details.categories.map((cat) => {
            return (
              <View key={cat.id} style={styles.cat}>
                <Text style={{ color: SB_COLOR_SCHEME.SB_PRIMARY }}>
                  {cat.name}
                </Text>
              </View>
            );
          })}
        </View>
        <Button
          text={"Save changes"}
          type={"primary"}
          buttonStyle={{ width: "50%" }}
          onPress={() => handleSubmit()}
        ></Button>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 32,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 45,
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
    // textAlign: "center",
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
  textInput: {
    borderRadius: 6,
    borderWidth: 1,
    marginHorizontal: 0,
    borderColor: SB_COLOR_SCHEME.SB_DISABLED,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 0,
  },

  cat: {
    backgroundColor: SB_COLOR_SCHEME.SB_SECONDARY,
    borderRadius: 40,
    width: 100,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
  },
});

export default MyProfile;
