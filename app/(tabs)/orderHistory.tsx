import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import { orders } from "@/mock_data";
import { router } from "expo-router";
import { Button } from "@swift-byte/switftbytecomponents";
import { SB_COLOR_SCHEME } from "@/contstants";

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
          {orders
            .filter((i) => i.status != "pending" && i.status != "accepted")
            .map((item) => {
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
                  <View style={{ backgroundColor: "transparent" }}>
                    <Text>{item.restaurant.name}</Text>
                    <Text>
                      {item.eta.toLocaleTimeString()} |{"  "}
                      {item.deliveryPerson.name}
                    </Text>
                  </View>

                  <Button
                    size="small"
                    text={`${item.status
                      .charAt(0)
                      .toUpperCase()}${item.status.slice(1)}`}
                    buttonStyle={{
                      width: "10%",
                      backgroundColor:
                        item.status == "completed"
                          ? SB_COLOR_SCHEME.SB_SECONDARY
                          : item.status == "declined"
                          ? SB_COLOR_SCHEME.SB_WARNING
                          : SB_COLOR_SCHEME.SB_INFO,
                      marginRight: 10,
                    }}
                    type={"primary"}
                    onPress={() => {}}
                    textStyle={{
                      color:
                        item.status == "declined"
                          ? SB_COLOR_SCHEME.SB_SECONDARY
                          : "white",
                    }}
                  />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
});
