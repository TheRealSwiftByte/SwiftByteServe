import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useContext } from "react";
import { router } from "expo-router";
import { MenuItem, RestaurantContext,  } from "@/context/RestaurantContext";
import { SB_COLOR_SCHEME } from "@/contstants";

export default function MyMenu() {
  const { menu, addToMenu, removeFromMenu } = useContext(RestaurantContext);

  const renderItem = (item: MenuItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.dFlex, { marginBottom: 16 }]}
        onPress={() => router.navigate({
            pathname: "MenuModal",
            params: {
                menuItemId: item.id.toString(),
            },
        })}
      >
        <View>
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 70,
              height: 70,
              backgroundColor: "grey",
              borderRadius: 25,
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
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
      </TouchableOpacity>
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
        keyExtractor={(item) => item.id.toString()}
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
