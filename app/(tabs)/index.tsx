import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import {
  BarChart,
  LineChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { SB_COLOR_SCHEME } from "@/contstants";
import { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "@/context/RestaurantContext";
import { Button } from "@swift-byte/switftbytecomponents";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("3months");
  const [items, setItems] = useState([
    { label: "Last 3 months", value: "3months" },
    { label: "Last 6 months", value: "6months" },
  ]);
  const { menu } = useContext(RestaurantContext);
  const [data, setData] = useState<
    {
      name: string;
      population: number;
      color: string;
      legendFontColor: string;
      legendFontSize: number;
    }[]
  >([
    {
      name: "Menu 1",
      population: 160,
      color: SB_COLOR_SCHEME.SB_PRIMARY,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ]);

  const [revenueData, setRevenueData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      color: (opacity?: number) => string;
      strokeWidth: number;
    }[];
  }>({
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  });

  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1D3D30",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#1D3D30",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  function getRandomNumber(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateData() {
    const color = [
      SB_COLOR_SCHEME.SB_PRIMARY,
      SB_COLOR_SCHEME.SB_SECONDARY,
      SB_COLOR_SCHEME.SB_TERTIARY,
      "black",
      SB_COLOR_SCHEME.SB_PRIMARY_LIGHT,
    ];
    if (menu.length > 0) {
      // max 5
      const tmp = menu.slice(0, 5).map((item, i) => {
        return {
          name: item.name,
          population: getRandomNumber(200, 10),
          color: color[i],
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        };
      });

      setData(tmp);
    }
  }

  function getLastMonths(numMonths: number) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const today = new Date();
    const result = [];

    for (let i = 0; i < numMonths; i++) {
      const month = new Date(
        today.getFullYear(),
        today.getMonth() - i,
        1
      ).getMonth();
      result.push(monthNames[month]);
    }

    return result.reverse();
  }

  function generateRevenueData() {
    const revenueData = {
      labels: value == "3months" ? getLastMonths(3) : getLastMonths(6),
      datasets: [
        {
          data:
            value == "3months"
              ? [
                  getRandomNumber(200, 100),
                  getRandomNumber(200, 100),
                  getRandomNumber(200, 100),
                ]
              : [
                  getRandomNumber(200, 100),
                  getRandomNumber(200, 100),
                  getRandomNumber(200, 100),
                  getRandomNumber(200, 100),
                  getRandomNumber(200, 100),
                  getRandomNumber(200, 100),
                ],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
    };

    setRevenueData(revenueData);
  }

  const exportReport = () => {};

  useEffect(() => {
    generateData();
    generateRevenueData();
  }, [value, menu]);

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title]}>Revenue Report</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        containerStyle={{ width: 200, marginTop: 20 }}
        dropDownContainerStyle={{ zIndex: 1 }}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingTop: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 20 }}>
            Amount of orders received per month based on menu
          </Text>
          <PieChart
            data={data}
            width={screenWidth * 0.5}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <View>
            <Text style={[styles.title, { marginTop: 20 }]}>Export Report</Text>
            <Text style={{ marginVertical: 20 }}>
              Export your revenue report for better future prediction and
              decition making.
            </Text>
            <Button
              text={"Export"}
              buttonStyle={{ width: "20%" }}
              type={"secondary"}
              onPress={exportReport}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 30 }}>
            Amount of revenue received per month
          </Text>
          <LineChart
            data={revenueData}
            width={screenWidth * 0.4}
            height={450}
            chartConfig={chartConfig}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 32,
    backgroundColor: "white",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    // width: "80%",
  },
});
