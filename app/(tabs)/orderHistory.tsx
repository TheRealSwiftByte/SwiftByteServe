import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import { router, useFocusEffect } from "expo-router";
import { Button } from "@swift-byte/switftbytecomponents";
import { SB_COLOR_SCHEME } from "@/contstants";
import { Order } from "@/api/schema/Order";
import { useCallback, useState } from "react";
import { Api } from "@/api/api";

export default function orderHistory() {
  const [orderHistory, setOrderHistory] = useState<Order[]>();
  const [restaurant, setRestaurant] = useState(
    Api.getApi().getActiveRestaurant()
  );

  useFocusEffect(
    useCallback(() => {
      try {
        setRestaurant(Api.getApi().getActiveRestaurant());
        Api.getApi()
          .getOrdersByRestaurantId(restaurant.id)
          .then((res) => {
            setOrderHistory(res);
          });
      } catch (err) {
        console.log(err);
      }
    }, [])
  );
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
          {orderHistory && orderHistory?.length > 0 ? (
            orderHistory
              ?.filter(
                (i) => i.orderStatus != "pending" && i.orderStatus != "accepted"
              )
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
                        {new Date(item.orderDate).toLocaleDateString()} |{"  "}
                        {item.deliveryAddress}
                      </Text>
                    </View>

                    <Button
                      size="small"
                      text={`${item.orderStatus
                        .charAt(0)
                        .toUpperCase()}${item.orderStatus.slice(1)}`}
                      buttonStyle={{
                        width: "10%",
                        backgroundColor:
                          item.orderStatus == "completed"
                            ? SB_COLOR_SCHEME.SB_SECONDARY
                            : item.orderStatus == "declined"
                            ? SB_COLOR_SCHEME.SB_WARNING
                            : SB_COLOR_SCHEME.SB_INFO,
                        marginRight: 10,
                      }}
                      type={"primary"}
                      onPress={() => {}}
                      textStyle={{
                        color:
                          item.orderStatus == "declined"
                            ? SB_COLOR_SCHEME.SB_SECONDARY
                            : "white",
                      }}
                    />
                  </TouchableOpacity>
                );
              })
          ) : (
            <Text>You have no order history.</Text>
          )}
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
