import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SB_COLOR_SCHEME } from "@/contstants";
import { Button } from "@swift-byte/switftbytecomponents";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { RestaurantContext } from "@/context/RestaurantContext";
import uuid from "react-native-uuid";
import { router, useLocalSearchParams } from "expo-router";
import { MenuItemType } from "@/api/schema/MenuItem";
import DropDownPicker from "react-native-dropdown-picker";

export default function MenuModal() {
  const { menuItemId } = useLocalSearchParams<{ menuItemId: string }>();
  const { menu, addToMenu, editMenu } = useContext(RestaurantContext);
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [category, setCategory] = useState<MenuItemType>(MenuItemType.MAIN);

  const [open, setOpen] = useState(false);
  const [openAvailable, setOpenAvailable] = useState(false);
  const [items, setItems] = useState([
    { label: "Last 3 months", value: "3months" },
    { label: "Last 6 months", value: "6months" },
  ]);

  const [isAvailableItem, setIsAvailableItem] = useState([
    { label: "Yes", value: true },
    { label: "No", value: false },
  ]);

  const generateLabelValuePairs = (enumObj: any) => {
    return Object.values(enumObj).map((value) => ({
      //@ts-ignore
      label: (value.charAt(0).toUpperCase() + value.slice(1)) as string,
      value: value as MenuItemType,
    }));
  };

  useEffect(() => {
    setItems(generateLabelValuePairs(MenuItemType));
    if (menuItemId) {
      console.log("edit!");
      const item = menu.find((i) => i.id == menuItemId);
      if (item) {
        setImage(item?.imagePath);
        setName(item?.name);
        setDescription(item?.description);
        setPrice(item?.price);
        setIsAvailable(item?.isAvailable);
        setCategory(item?.category as MenuItemType);
      }
    }
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

  const handleSubmit = () => {
    console.log(category);
    if (menuItemId) {
      editMenu(menuItemId, {
        id: menuItemId,
        category,
        name,
        price,
        description,
        imagePath: image,
        isAvailable: isAvailable,
      });
      router.navigate("/MyMenu");
    } else {
      if (image && name && price && description) {
        addToMenu({
          id: uuid.v4().toString(),
          name,
          price,
          description,
          category,
          imagePath: image,
          isAvailable: isAvailable,
        });
        router.navigate("/MyMenu");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{}}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Avatar
            size="xlarge"
            source={{ uri: image }}
            activeOpacity={0.7}
            containerStyle={{
              backgroundColor: "#F2F2F7",
              marginBottom: 20,
            }}
            onPress={pickImage}
          />
          <Text
            style={{ fontStyle: "italic", marginBottom: 20 }}
            onPress={pickImage}
          >
            Edit picture
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Is this menu available?</Text>
          <DropDownPicker
            open={openAvailable}
            value={isAvailable}
            items={isAvailableItem}
            containerStyle={{ width: 200, marginBottom: 20 }}
            dropDownContainerStyle={{ zIndex: 1 }}
            setOpen={setOpenAvailable}
            setValue={setIsAvailable}
            setItems={setIsAvailableItem}
          />
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your menu name"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter short description"
            value={description}
            onChangeText={setDescription}
            maxLength={255}
          />
          <Text style={styles.label}>Category</Text>
          <DropDownPicker
            open={open}
            value={category}
            items={items}
            containerStyle={{ width: 200, marginBottom: 20 }}
            dropDownContainerStyle={{ zIndex: 2 }}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
          />

          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            value={price?.toString()}
            onChangeText={(text: string) => {
              if (parseInt(text)) {
                setPrice(parseInt(text));
              }
            }}
            maxLength={16}
          />
          <Button
            text={menuItemId ? "Save" : "Add"}
            buttonStyle={{ width: "20%" }}
            type={"secondary"}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 32,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: SB_COLOR_SCHEME.SB_SECONDARY,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: "#BBC5C1",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },
  smallInput: {
    fontSize: 16,
    padding: 15,
    borderRadius: 10,
    borderColor: "#BBC5C1",
    borderWidth: 1,
  },
});
