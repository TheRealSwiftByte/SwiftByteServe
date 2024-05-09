import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import {
  BarChart,
  LineChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { SB_COLOR_SCHEME } from "@/contstants";

export default function index() {
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

  const data = [
    {
      name: "Menu 1",
      population: 160,
      color: SB_COLOR_SCHEME.SB_PRIMARY,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Menu 2",
      population: 212,
      color: SB_COLOR_SCHEME.SB_SECONDARY,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Menu 3",
      population: 80,
      color: SB_COLOR_SCHEME.SB_TERTIARY,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Menu 4",
      population: 47,
      color: 'black',
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Menu 5",
      population: 90,
      color: SB_COLOR_SCHEME.SB_PRIMARY_LIGHT,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Statistics</Text>
      <Text style={{marginTop: 20}}>Amount of order received per month</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <PieChart
        data={data}
        width={screenWidth*0.5}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
