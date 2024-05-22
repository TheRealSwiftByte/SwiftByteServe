import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { orders } from "@/mock_data";
import { router } from "expo-router";

export default function orderHistory() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <Text style={styles.title}>Order History</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View style={styles.listContainer}>
          {orders.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() =>
                  router.navigate({
                    pathname: "/orderDetail",
                    params: { id: item.id },
                  })
                }
              >
                <Text>{item.restaurant.name}</Text>
                <Text>
                  {item.eta.toLocaleTimeString()} |{"  "}
                  {item.deliveryPerson.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 35,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
  },

  listContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  item: {
    backgroundColor: "#F2F2F7",
    borderRadius: 6,
    padding: 15,
    flex: 1,
    flexDirection: "column",
    gap: 8,
    marginBottom: 8,
  },
});
