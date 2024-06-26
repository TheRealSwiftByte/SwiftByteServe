import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useContext } from "react";
import { router } from "expo-router";
import { RestaurantContext } from "@/context/RestaurantContext";
import { SB_COLOR_SCHEME } from "@/contstants";
import IconTrash from "../assets/icons/trash-outline.svg";
import { MenuItem } from "@/api/schema/MenuItem";
import { Button } from "@swift-byte/switftbytecomponents";

export default function MyMenu() {
  const { menu, addToMenu, removeFromMenu } = useContext(RestaurantContext);

  const renderItem = (item: MenuItem) => {
    return (
      <View
        key={item.id}
        style={[
          styles.dFlex,
          { marginBottom: 16, justifyContent: "space-between" },
        ]}
      >
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
          onPress={() =>
            router.navigate({
              pathname: "MenuModal",
              params: {
                menuItemId: item?.name,
              },
            })
          }
        >
          <View>
            <Image
              source={{ uri: item.imagePath }}
              style={{
                width: 70,
                height: 70,
                backgroundColor: "grey",
                borderRadius: 25,
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Text>{item.description}</Text>
            <Text
              style={{
                color: SB_COLOR_SCHEME.SB_SECONDARY,
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              ${item.price}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={{
            marginRight: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "flex-end",
          }}
          onPress={() => removeFromMenu(item)}
        >
          <Button
            size="small"
            text={item.isAvailable ? "Available" : "Not Available"}
            buttonStyle={[
              {
                width: 250,
                backgroundColor: item.isAvailable
                  ? SB_COLOR_SCHEME.SB_SECONDARY
                  : SB_COLOR_SCHEME.SB_WARNING,
              },
            ]}
            textStyle={{ textAlign: "center" }}
            type={"secondary"}
            onPress={() => {}}
          />
          <IconTrash width={24} height={24} />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Menu</Text>
      <Text style={{ marginBottom: 20, opacity: 0.6 }}>
        Add your new menu now and launch it in SwiftByte Eat! Click on the menu
        item to edit information / click '+ Add Menu' to add your new menu item.
      </Text>
      <FlatList
        data={menu}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item?.name?.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#d1d1d1",
              marginBottom: 16,
            }}
          ></View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },
  dFlex: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
});
