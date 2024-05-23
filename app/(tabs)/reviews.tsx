import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { Button, TextInput } from "@swift-byte/switftbytecomponents";
import { Link, router, useFocusEffect } from "expo-router";
import User from "../../assets/images/user.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SB_COLOR_SCHEME } from "@/contstants";
import { AirbnbRating } from "react-native-ratings";
import { reviews } from "@/mock_data";
import { Review as ReviewInterface } from "@/api/schema/SwiftByteTypes";
import { Api } from "@/api/api";
import { RestaurantContext } from "@/context/RestaurantContext";

const Review = () => {
  const [reviewList, setReviewList] = useState<ReviewInterface[]>();
  const { details } = useContext(RestaurantContext);
  useFocusEffect(
    useCallback(() => {
      try {
        Api.getApi()
          .getReviews(details.id)
          .then((res) => {
            console.log('restaurant', res)
            if (res) {
              setReviewList(res);
            } else {
              setReviewList([]);
            }
          });
      } catch (err) {
        console.log(err);
      }
    }, [])
  );

  const renderItem = (item: ReviewInterface) => {
    return (
      <View
        style={[
          styles.dFlex,
          { flex: 1, justifyContent: "space-between", width: "100%" },
        ]}
        key={item.id}
      >
        <View style={[styles.userRow, { flex: 4 }]}>
          <View
            style={[
              styles.dFlex,
              {
                alignItems: "flex-start",
                flexDirection: "column",
                // alignSelf: "stretch",
                width: "100%",
              },
            ]}
          >
            <View style={[styles.div, { width: "100%" }]}>
              <User width="50" />
              <View style={styles.author}>
                <Text
                  style={{
                    fontWeight: "100",
                    marginLeft: 8,
                    marginBottom: 4,
                    fontSize: 12,
                    color: "8E8E93",
                  }}
                >
                  {new Date(item.createdAt).toLocaleDateString()} |{" "}
                  {new Date(item.createdAt).toLocaleTimeString()}
                </Text>
                <Text
                  style={{
                    fontWeight: "500",
                    marginLeft: 8,
                    fontSize: 14,
                  }}
                >
                  {item.customerId}
                </Text>
                <View style={[styles.userRate, styles.rowFlexBox]}>
                  <View style={styles.star}>
                    <AirbnbRating
                      count={item.rating}
                      defaultRating={4}
                      size={10}
                      showRating={false}
                      isDisabled
                      selectedColor="yellow"
                    />
                  </View>
                </View>
                <Text
                  style={{
                    fontWeight: "100",
                    marginLeft: 8,
                    color: "8E8E93",
                    fontSize: 12,
                  }}
                >
                  {item.comment}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.dFlex, { flex: 1, justifyContent: "center" }]}>
          <Button
            text={"Reply"}
            type={"secondary"}
            onPress={() => router.navigate("/replyReviews")}
          ></Button>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={[styles.title]}>Reviews</Text>
        <FlatList
          data={reviewList}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item?.id?.toString()}
        />
        {reviewList?.length == 0 ? (
          <Text style={{ marginTop: 30 }}>You have no reviews.</Text>
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  container: {
    padding: 24,
    // flex: 1,
    // flexDirection: "row",
    // marginTop: 50,
    // width: "50%",
    // gap: 25,
    // alignSelf: "center",
  },
  heading: {
    marginBottom: 10,
    flexDirection: "column",
  },
  navbar: {
    flex: 1,
    flexDirection: "column",
    marginTop: 15,
    gap: 8,
    height: "100%",
    backgroundColor: SB_COLOR_SCHEME.SB_PRIMARY,
    // position: "absolute",
    // width: "40%",
  },
  dFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rev: {
    flex: 1,
    flexDirection: "column",
    marginTop: 15,
    //gap: 8,
    //position: "absolute",
    backgroundColor: "transparent",
  },
  author: {
    borderRadius: 10,
    flex: 1,
    width: "90%",
    marginLeft: 20,
    paddingHorizontal: 10,
    paddingVertical: 19,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#8bd9b5",
  },
  userRow: {
    marginTop: 24,
    // width: 400,
    // justifyContent: "flex-end",
  },
  userRate: {
    marginTop: 4,
    marginLeft: 3,
  },
  rowFlexBox: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
  star: {
    alignItems: "flex-start",
    marginBottom: 6,
  },
  div: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Review;
