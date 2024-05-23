import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MenuItem, Order } from "@/api/schema/SwiftByteTypes";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { Button } from "@swift-byte/switftbytecomponents";
import { SB_COLOR_SCHEME } from "@/contstants";
import { Api } from "@/api/api";

export default function orderHistory() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [order, setOrder] = useState<Order>();
  const [items, setItems] = useState<
    {
      item: MenuItem | undefined;
      count: number;
    }[]
  >();

  useFocusEffect(useCallback(()=>{
    Api.getApi().getOrder(id).then(()=>{
      console.log("order", order)
      setOrder(order)
      if (order?.foodItems){
        setItems(order?.foodItems)
      }
    })
  }, []))

  useEffect(() => {
    //TODO: double check this logic, I don't thiiiink its working
    if (order) {
      order.foodItems.forEach((item) => {
        item.quantity = item.quantity || 1
      });
    }
  }, [order]);

  const handleAcceptOrder = (id: string) => {};

  const handleRejectOrder = (id: string) => {};


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
                {order?.restaurant.address},{" "}
              </Text>
            </View>
            <Button
              size="small"
              text={order ? order?.orderStatus.toUpperCase() : ""}
              buttonStyle={{
                width: "10%",
                backgroundColor:
                  order?.orderStatus == "completed"
                    ? SB_COLOR_SCHEME.SB_SECONDARY
                    : order?.orderStatus == "declined"
                    ? SB_COLOR_SCHEME.SB_WARNING
                    : SB_COLOR_SCHEME.SB_PRIMARY,
                marginRight: 10,
              }}
              type={"primary"}
              onPress={() => {}}
              textStyle={{
                color:
                  order?.orderStatus == "completed"
                    ? SB_COLOR_SCHEME.SB_PRIMARY
                    : SB_COLOR_SCHEME.SB_SECONDARY,
              }}
            />
          </View>

          <View style={{ width: "100%", marginBottom: 8 }}>
            <Text style={styles.subtitle}>Delivery Address</Text>
            <Text style={{ lineHeight: 25, marginTop: 8 }}>
              {order?.deliveryAddress}
            </Text>
          </View>
          <View style={{ width: "100%", marginBottom: 8 }}>
            <Text style={styles.subtitle}>Contact Information</Text>
            <Text style={{ lineHeight: 25, marginTop: 8 }}>
              {order?.customer.phone}
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
                  <View key={item.item?.name} style={styles.summaryItem}>
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
                  ${((order?.totalPrice ?? 0) * 0.05).toFixed(2)}
                </Text>
              </View>
              {/* <View style={styles.summaryItem}>
                <Text style={{ color: "black" }}>VAT</Text>
                <Text style={{ color: "black" }}>${order?.tax.toFixed(2)}</Text>
              </View> */}
              {/* <View
                style={
                  order?.promoCode ? styles.summaryItem : { display: "none" }
                }
              >
                <Text style={{ color: "black" }}>Coupon</Text>
                <Text style={{ color: "black" }}>-${order?.discount}</Text>
              </View> */}
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
                  ${order?.totalPrice}
                </Text>
              </View>
            </View>
          </View>
          {order?.orderStatus == "pending" ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "flex-end",
              }}
            >
              <Button
                size="small"
                text={"Decline"}
                buttonStyle={{
                  width: "20%",
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: SB_COLOR_SCHEME.SB_WARNING,
                  marginRight: 10,
                }}
                type={"primary"}
                onPress={() => handleRejectOrder(order.id)}
                textStyle={{ color: SB_COLOR_SCHEME.SB_WARNING }}
              />
              <Button
                size="small"
                text={"Accept"}
                buttonStyle={{ width: "20%" }}
                type={"secondary"}
                onPress={() => handleAcceptOrder(order.id)}
              />
            </View>
          ) : (
            <></>
          )}
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
