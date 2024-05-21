import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MenuItem, Order, orders } from "@/mock_data";
import { useLocalSearchParams } from "expo-router";

export default function orderHistory() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [order, setOrder] = useState<Order>();
  const [items, setItems] = useState<
    {
      item: MenuItem | undefined;
      count: number;
    }[]
  >();

  useEffect(() => {
    if (id) {
      console.log("id", id);
      const ord = orders.find((item) => item.id == id);
      setOrder(ord);
      const itemIdCounts: { [itemId: string]: number } = {};

      ord?.items.forEach((item) => {
        const itemId = item.id.toString();
        itemIdCounts[itemId] = (itemIdCounts[itemId] || 0) + 1;
      });

      const temp: {
        item: MenuItem | undefined;
        count: number;
      }[] = Object.keys(itemIdCounts).map((itemId) => ({
        item: ord?.items.find((i) => i.id == itemId),
        count: itemIdCounts[itemId],
      }));

      setItems(temp);
      console.log(temp, order);
    }
  }, []);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View></View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "flex-end",
              gap: 20,
            }}
          >
            <View>
              <Text style={styles.subtitle}>Restaurant</Text>
              <Text style={{ marginTop: 8 }}>{order?.restaurant.name}</Text>
              <Text style={{ lineHeight: 25 }}>
                {order?.restaurant.address.street},{" "}
                {order?.restaurant.address.city},{" "}
                {order?.restaurant.address.state},{" "}
                {order?.restaurant.address.zipCode}
              </Text>
            </View>
          </View>

          <View style={{ width: "100%", marginBottom: 8 }}>
            <Text style={styles.subtitle}>Delivery Address</Text>
            <Text style={{ lineHeight: 25, marginTop: 8 }}>
              {order?.deliveryAddress}
            </Text>
          </View>
          <View style={{ width: "100%", marginBottom: 8 }}>
            <Text style={styles.subtitle}>Delivery Instruction</Text>
            <Text style={{ lineHeight: 25, marginTop: 8 }}>
              {order?.deliveryInstruction}
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <Text style={styles.subtitle}>Order Summary</Text>
            <View>
              {items?.map((item) => {
                return (
                  <View key={item.item?.id} style={styles.summaryItem}>
                    <Text style={{ color: "black" }}>
                      {item.count}x {item.item?.name}
                    </Text>
                    <Text style={{ color: "black" }}>
                      $
                      {item.item?.price
                        ? item.item?.price * item.count
                        : item.item?.price}
                    </Text>
                  </View>
                );
              })}
              <View style={styles.summaryItem}>
                <Text style={{ color: "black" }}>Delivery Fee</Text>
                <Text style={{ color: "black" }}>
                  ${((order?.netTotal ?? 0) * 0.05).toFixed(2)}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={{ color: "black" }}>VAT</Text>
                <Text style={{ color: "black" }}>${order?.tax.toFixed(2)}</Text>
              </View>
              <View
                style={
                  order?.promoCode ? styles.summaryItem : { display: "none" }
                }
              >
                <Text style={{ color: "black" }}>Coupon</Text>
                <Text style={{ color: "black" }}>-${order?.discount}</Text>
              </View>
              <View style={[styles.summaryItem, { borderBottomWidth: 0 }]}>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Total
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  ${order?.netTotal}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 16,
  },
  scrollView: {
    backgroundColor: "white",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  summaryItem: {
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
