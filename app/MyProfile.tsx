// RestaurantProfilePage.js

import { RestaurantContext } from "@/context/RestaurantContext";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { SB_COLOR_SCHEME } from "@/contstants";
import { Button, TextInput } from "@swift-byte/switftbytecomponents";
import { router } from "expo-router";
import Plus from "../assets/icons/plus.svg";
import Close from "../assets/icons/close-outline.svg";
import { categories_data } from "@/mock_data";
import { FoodCategory } from "@/api/schema/Restaurant";
import { Api } from "@/api/api";

const MyProfile = () => {
  const { details, editDetail } = useContext(RestaurantContext);
  const [image, setImage] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const foodCategoriesArray: string[] = Object.values(FoodCategory);

  function getInitial(): string {
    const temp = details.name?.split(" ");
    if (temp) {
      if (temp.length > 1) {
        return `${temp[0].charAt(0).toUpperCase()}${temp[1]
          .charAt(0)
          .toUpperCase()}`;
      } else {
        return `${temp[0].charAt(0).toUpperCase()}`;
      }
    }
    return "";
  }

  const handleSubmit = () => {
    const images = [
      "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ];

    console.log(name, phone, address, description);
    if (!(name && phone && address && description)) {
      return;
    }

    console.log("categories", categories);

    try {
      const updated = {
        id: details.id,
        name,
        description,
        phone,
        address,
        categories,
        averageRating: details.averageRating,
        averageWaitTime: details.averageWaitTime,
        imageURI: image,
        menu: details.menu,
        email: details.email,
        password: details.password,
      };
      // const response = Api.getApi().updateRestaurant(updated);
      console.log("update response", updated);
      editDetail(updated);
    } catch (err) {
      console.log(err);
      return;
    }

    router.navigate("/profile");
  };

  function getEnumKeyByValue(enumObj: any, value: string): string | undefined {
    return Object.keys(enumObj).find((key) => enumObj[key] === value);
  }

  useEffect(() => {
    async function fetch() {
      try {
        const restaurant = await Api.getApi().getRestaurant(
          Api.getApi().getActiveRestaurant().id
        );
        if (restaurant) {
          console.log(restaurant);
          setName(restaurant.name);
          setAddress(restaurant.address);
          setPhone(restaurant.phone);
          setDescription(restaurant.description);
          setCategories(restaurant.categories);
          setImage(restaurant?.imageURI as string);
        } else {
          console.log(restaurant);
          setName(details.name);
          setAddress(details.address);
          setPhone(details.phone);
          setDescription(details.description);
          setCategories(details.categories);
          setImage(details?.imageURI as string);
        }
      } catch (err) {
        console.log(err);
      }
    }

    // fetch();
    console.log(details);
    setName(details.name);
    setAddress(details.address);
    setPhone(details.phone);
    setDescription(details.description);
    setCategories(details.categories);
    setImage(details?.imageURI as string);
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
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Avatar
            size="xlarge"
            source={{ uri: image }}
            title={getInitial()}
            activeOpacity={0.7}
            containerStyle={{
              backgroundColor: SB_COLOR_SCHEME.SB_SECONDARY,
              marginBottom: 20,
              alignSelf: "center",
              width: "100%",
            }}
            onPress={pickImage}
          />
          <Text
            style={{ textAlign: "center", fontStyle: "italic" }}
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
            <Text style={[styles.label, { marginBottom: 10 }]}>Category</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              {categories?.map((cat) => {
                return (
                  <Pressable
                    onPress={() =>
                      setCategories((prevCat) => {
                        if (prevCat.length > 1) {
                          return prevCat.filter((i) => i != cat);
                        } else {
                          return [];
                        }
                      })
                    }
                    key={cat}
                    style={[
                      styles.cat,
                      { backgroundColor: SB_COLOR_SCHEME.SB_PRIMARY },
                    ]}
                  >
                    <Text style={{ color: SB_COLOR_SCHEME.SB_SECONDARY }}>
                      {cat.charAt(0).toUpperCase()}
                      {cat.substring(1).toLowerCase()}
                    </Text>
                    <Close height={20} width={20} />
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.separator}></View>
            <ScrollView horizontal>
              {foodCategoriesArray
                .filter((i) => {
                  if (
                    categories?.find((a) => a.toLowerCase() == i.toLowerCase())
                  ) {
                    return false;
                  } else {
                    return true;
                  }
                })
                .map((cat) => {
                  return (
                    <Pressable
                      key={cat}
                      style={styles.cat}
                      onPress={() =>
                        setCategories((prevCat) => [
                          ...prevCat,
                          getEnumKeyByValue(FoodCategory, cat) as FoodCategory,
                        ])
                      }
                    >
                      <Text style={{ color: SB_COLOR_SCHEME.SB_PRIMARY }}>
                        {cat.charAt(0).toUpperCase()}
                        {cat.substring(1)}
                      </Text>
                      <Plus height={20} width={20} />
                    </Pressable>
                  );
                })}
            </ScrollView>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 32,
    alignItems: "flex-start",
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
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#eee",
    marginVertical: 20,
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
    width: 150,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    padding: 15,
    paddingHorizontal: 20,
    marginRight: 10,
  },
});

export default MyProfile;
