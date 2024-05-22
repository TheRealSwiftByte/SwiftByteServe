import React, { useCallback, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useFocusEffect } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import IconOrders from "../../assets/icons/clipboard-outline.svg";
import IconProfile from "../../assets/icons/storefront-outline.svg";
import HomeIcon from "../../assets/icons/home-outline.svg";
import ReviewIcon from "../../assets/icons/star-outline.svg";
import HistoryIcon from "../../assets/icons/receipt-outline.svg";
import { SB_COLOR_SCHEME } from "@/contstants";
import { RestaurantContextProvider } from "@/context/RestaurantContext";
import { orders } from "@/mock_data";
import { Api } from "@/api/api";
import { Order } from "@/api/schema/Order";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [order, setOrder] = useState<Order[]>();

  useFocusEffect(
    useCallback(() => {
      try {
        Api.getApi()
          .getOrdersByRestaurantId(Api.getApi().getActiveRestaurant().id)
          .then((res) => {
            setOrder(res);
          });
      } catch (err) {
        console.log(err);
      }
    }, [])
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="orderRequests"
        options={{
          title: "Orders",
          tabBarIcon: () => <IconOrders />,
          tabBarBadge: order?.length,
        }}
      />
      <Tabs.Screen
        name="orderHistory"
        options={{
          title: "Order History",
          tabBarIcon: () => <HistoryIcon />,
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          title: "Reviews",
          tabBarIcon: () => <ReviewIcon />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => <IconProfile />,
        }}
      />
    </Tabs>
  );
}
