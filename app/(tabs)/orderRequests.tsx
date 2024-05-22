import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SB_COLOR_SCHEME } from "@/contstants";
import { router, useFocusEffect } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from "@swift-byte/switftbytecomponents";
import { Api } from "@/api/api";
import { Order } from "@/api/schema/SwiftByteTypes";

export default function OrderRequests() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("req");
  const [restaurant, setRestaurant] = useState(Api.getApi().getActiveRestaurant());
  const [items, setItems] = useState([
    { label: "On Going", value: "ord" },
    { label: "Requests", value: "req" },
  ]);
  const [orderList, setOrderList] = useState<Order[]>();
  const [order, setOrder] = useState<Order | undefined>();

  useFocusEffect(useCallback(()=>{
    setRestaurant(Api.getApi().getActiveRestaurant());
    Api.getApi().getOrdersByRestaurantId(restaurant.id).then((res) => {
      setOrderList(res);
    });
  }, []));
  /* const { id } = useLocalSearchParams<{id: string}>();
    const [order, setOrder] = useState<Order | undefined>();
    const [items, setItems] = useState<{ item: MenuItem | undefined; count: number }[]>([]);
    const insets = useSafeAreaInsets();
  
    useEffect(() => {
        if (id) {
            const selectedOrder = orders.find((order) => order.id === id);
            setOrder(selectedOrder);

            if (selectedOrder) {
                const itemIdCounts: { [itemId: string]: number } = {};

                selectedOrder.items.forEach((item) => {
                    const itemId = item.id.toString();
                    itemIdCounts[itemId] = (itemIdCounts[itemId] || 0) + 1;
                });

                const itemsWithCount = Object.keys(itemIdCounts).map((itemId) => ({
                    item: selectedOrder.items.find((i) => i.id.toString() === itemId),
                    count: itemIdCounts[itemId],
                }));

                setItems(itemsWithCount);
            }
        }
    }, [id]);*/
  const updateOrderStatus = (
    orderId: string,
    newStatus: "pending" | "accepted" | "declined" | "completed"
  ) => {
    const updatedOrders = orderList.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrderList(updatedOrders);
    Alert.alert(
      `Order ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
      `Order ${orderId} has been ${newStatus}.`
    );
  };

  const handleAcceptOrder = (id: string) => {
    updateOrderStatus(id, "accepted");
  };

  const handleRejectOrder = (id: string) => {
    updateOrderStatus(id, "declined");
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#FF9D2B"; // Orange
      case "accepted":
        return "#2F80ED"; // Blue
      case "declined":
        return "#EB5757"; // Red
      case "completed":
        return "#27AE60"; // Green
      default:
        return "#000"; // Default color
    }
  };

  const renderItem = (item: Order) => {
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
            width: "100%",
            padding: 15,
            backgroundColor: "#f5f5f5",
            borderRadius: 8,
          }}
          onPress={() =>
            router.navigate({
              pathname: "orderDetail",
              params: {
                id: item.id.toString(),
              },
            })
          }
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 30,
                  backgroundColor: SB_COLOR_SCHEME.SB_SECONDARY,
                }}
              ></View>
              <View>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}
                >
                  {item.id}
                </Text>
                <Text>
                  {item.items.length} items | {item.customer.name} |{" "}
                  {item.customer.phone}
                </Text>
              </View>
            </View>

            {item.status == "pending" ? (
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
                  onPress={() => handleRejectOrder(item.id)}
                  textStyle={{ color: SB_COLOR_SCHEME.SB_WARNING }}
                />
                <Button
                  size="small"
                  text={"Accept"}
                  buttonStyle={{ width: "20%" }}
                  type={"secondary"}
                  onPress={() => handleAcceptOrder(item.id)}
                />
              </View>
            ) : (
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
                  text={"Complete"}
                  buttonStyle={{ width: "20%" }}
                  type={"secondary"}
                  onPress={() => handleAcceptOrder(item.id)}
                />
              </View>
            )}
          </View>
        </Pressable>

        <Pressable style={{ marginRight: 20 }}></Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>Orders</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        containerStyle={{ width: 200 }}
        dropDownContainerStyle={{ zIndex: 1 }}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      {value == "req" ? (
        orders.filter((item) => item.status == "pending").length > 0 ? (
          <FlatList
            data={orders.filter((item) => item.status == "pending")}
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
        ) : (
          <Text>You have no order requests.</Text>
        )
      ) : orders.filter((item) => item.status == "accepted").length > 0 ? (
        <FlatList
          data={orders.filter((item) => item.status == "accepted")}
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
      ) : (
        <Text>You have no on going orders.</Text>
      )}
    </View>
    // <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    //   <KeyboardAwareScrollView style={styles.scrollView}>
    //     <View style={[styles.container]}>
    //       <View style={styles.rev}>
    //         <View style={styles.page}>
    //           <Text
    //             style={{
    //               fontSize: 24,
    //               fontWeight: "500",
    //               marginBottom: 20,
    //             }}
    //           >
    //             Order requests
    //           </Text>
    //           <View style={{ flex: 1 }}>
    //             <View style={{ flex: 1 }}>
    //               <Text style={[styles.title]}>Order</Text>
    //             </View>
    //             <View style={{ flex: 1 }}>
    //               <Text style={[styles.title]}>Date and Time</Text>
    //             </View>
    //           </View>
    //           <View style={styles.lineView}>
    //             <View style={styles.heading}>
    //               <Text style={[styles.title, styles.columnLarge]}>Order</Text>
    //               <Text
    //                 style={[
    //                   styles.title,
    //                   styles.columnLarge,
    //                   { marginLeft: -20 },
    //                 ]}
    //               >
    //                 Date and Time
    //               </Text>
    //               <Text
    //                 style={[
    //                   styles.title,
    //                   styles.columnLarge,
    //                   { marginLeft: 20 },
    //                 ]}
    //               >
    //                 Customer Name
    //               </Text>
    //               <Text
    //                 style={[
    //                   styles.title,
    //                   styles.columnLarge,
    //                   { marginLeft: 70 },
    //                 ]}
    //               >
    //                 Address
    //               </Text>
    //               <Text
    //                 style={[styles.title, styles.column, { marginLeft: 70 }]}
    //               >
    //                 Amount
    //               </Text>
    //               <Text
    //                 style={[styles.title, styles.column, { marginLeft: 30 }]}
    //               >
    //                 Status
    //               </Text>
    //               <Text
    //                 style={[
    //                   styles.title,
    //                   styles.columnLarge,
    //                   { marginRight: 15 },
    //                 ]}
    //               >
    //                 Action
    //               </Text>
    //             </View>
    //           </View>
    //           {orderList.map((order) => (
    //             <View style={styles.orderRow} key={order.id}>
    //               <Text style={[styles.value, styles.column]}>{order.id}</Text>
    //               <Text
    //                 style={[styles.value, styles.column, { marginLeft: -10 }]}
    //               >
    //                 {order.orderDate.toLocaleDateString()}
    //               </Text>
    //               <Text style={[styles.value, styles.column]}>
    //                 {order.customer.name}
    //               </Text>
    //               <Text style={[styles.value, styles.columnLarge]}>
    //                 {order.deliveryAddress}
    //               </Text>
    //               <Text style={[styles.value, styles.column]}>
    //                 {order.total}
    //               </Text>
    //               <View
    //                 style={[
    //                   styles.statusButton,
    //                   { borderColor: getStatusColor(order.status) },
    //                   { marginLeft: -80 },
    //                 ]}
    //               >
    //                 <Text
    //                   style={[
    //                     styles.statusButtonText,
    //                     { color: getStatusColor(order.status) },
    //                   ]}
    //                 >
    //                   {order.status}
    //                 </Text>
    //               </View>

    //               <View style={[styles.buttonContainer, styles.column]}>
    //                 <Button
    //                   title="Accept"
    //                   onPress={() => handleAcceptOrder(order.id)}
    //                   color="#FF9D2B"
    //                   disabled={order.status !== "pending"}
    //                 />
    //                 <Button
    //                   title="Decline"
    //                   onPress={() => handleRejectOrder(order.id)}
    //                   color="#EB5757"
    //                   disabled={order.status !== "pending"}
    //                 />
    //               </View>
    //             </View>
    //           ))}
    //         </View>
    //       </View>
    //     </View>
    //   </KeyboardAwareScrollView>
    // </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  container: {
    padding: 32,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    // marginTop: 50,
    // width: "80%",
    gap: 25,
    // alignSelf: "center",
    // justifyContent: "center",
  },
  rev: {
    flex: 1,
    flexDirection: "column",
    marginTop: 15,
    //gap: 8,
    //position: "absolute",
    backgroundColor: "transparent",
  },
  page: {
    letterSpacing: 0.2,
    fontWeight: "500",
    color: "#000",
    textAlign: "left",
    display: "flex",
    //alignItems: "center",
    width: "100%",
  },
  heading: {
    flexDirection: "row",
    //position: "absolute",
    alignItems: "stretch",
    //gap: 40,
  },
  dFlex: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  lineView: {
    borderStyle: "solid",
    borderColor: "#828282",
    borderTopWidth: 2,
    flex: 1,
    width: "100%",
    height: 2,
  },
  orderRow: {
    flexDirection: "row",
    marginTop: 15,
    //gap:10,
  },
  value: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  actionButton: {
    color: "transparent",
    margin: 10,
    borderRadius: 30,
    //textTransform: "lowercase",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    borderRadius: 40,
    fontStyle: "normal",
    gap: 5,
    marginLeft: 10,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  columnLarge: {
    flex: 2,
    alignItems: "center",
  },
  statusButtonText: {
    fontWeight: "400",
  },
  statusButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 40,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    // width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
