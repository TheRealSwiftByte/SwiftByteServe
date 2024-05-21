import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "@swift-byte/switftbytecomponents";
import { Link, router } from "expo-router";
import User from "../../assets/images/user.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SB_COLOR_SCHEME } from "@/contstants";
import { AirbnbRating } from "react-native-ratings";

const Review = () => {
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "white" }}>
      <KeyboardAwareScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.rev}>
            <View style={styles.heading}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  marginBottom: 8,
                }}
              >
                Reviews
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "8E8E93",
                }}
              >
                Reviews submitted by customers
              </Text>
            </View>

            <View style={styles.dFlex}>
              <View style={styles.userRow}>
                <View
                  style={[
                    styles.dFlex,
                    {
                      alignItems: "flex-end",
                      flexDirection: "column",
                      alignSelf: "stretch",
                    },
                  ]}
                >
                  <View style={styles.div}>
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
                        20/12/2020
                      </Text>
                      <Text
                        style={{
                          fontWeight: "500",
                          marginLeft: 8,
                          fontSize: 14,
                        }}
                      >
                        Awesome and Nice
                      </Text>
                      <View style={[styles.userRate, styles.rowFlexBox]}>
                        <View style={styles.star}>
                          <AirbnbRating
                            count={5}
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
                        This Food so tasty & delicious. Breakfast so fast
                        Delivered in my place.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={[
                  styles.dFlex,
                  { alignItems: "flex-start", marginLeft: 50 },
                ]}
              >
                <Button
                  text={"Reply"}
                  type={"secondary"}
                  onPress={() => router.navigate("/replyReviews")}
                ></Button>
              </View>
            </View>

            <View style={styles.dFlex}>
              <View style={styles.userRow}>
                <View
                  style={[
                    styles.dFlex,
                    {
                      alignItems: "flex-end",
                      flexDirection: "column",
                      alignSelf: "stretch",
                    },
                  ]}
                >
                  <View style={styles.div}>
                    <User width="50" />
                    <View style={styles.author}>
                      <Text
                        style={{
                          fontWeight: "100",
                          marginLeft: 8,
                          marginBottom: 4,
                          color: "8E8E93",
                          fontSize: 12,
                        }}
                      >
                        20/12/2020
                      </Text>
                      <Text
                        style={{
                          fontWeight: "500",
                          marginLeft: 8,
                          fontSize: 14,
                        }}
                      >
                        Great Food and Service
                      </Text>
                      <View style={[styles.userRate, styles.rowFlexBox]}>
                        <View style={styles.star}>
                          <AirbnbRating
                            count={5}
                            defaultRating={5}
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
                        This Food so tasty & delicious. Breakfast so fast
                        Delivered in my place. Chef is very friendly. I’m really
                        like chef for Home Food Order. Thanks.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.dFlex,
                  { alignItems: "flex-start", marginLeft: 50 },
                ]}
              >
                <Button
                  text={"Reply"}
                  type={"secondary"}
                  onPress={() => router.navigate("/replyReviews")}
                ></Button>
              </View>
            </View>

            <View style={styles.dFlex}>
              <View style={styles.userRow}>
                <View
                  style={[
                    styles.dFlex,
                    {
                      alignItems: "flex-end",
                      flexDirection: "column",
                      alignSelf: "stretch",
                    },
                  ]}
                >
                  <View style={styles.div}>
                    <User width="50" />
                    <View style={styles.author}>
                      <Text
                        style={{
                          fontWeight: "100",
                          marginLeft: 8,
                          marginBottom: 4,
                          color: "8E8E93",
                          fontSize: 12,
                        }}
                      >
                        20/12/2020
                      </Text>
                      <Text
                        style={{
                          fontWeight: "500",
                          marginLeft: 8,
                          fontSize: 14,
                        }}
                      >
                        Great Food and Service
                      </Text>
                      <View style={[styles.userRate, styles.rowFlexBox]}>
                        <View style={styles.star}>
                          <AirbnbRating
                            count={5}
                            defaultRating={5}
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
                        This Food so tasty & delicious. Breakfast so fast
                        Delivered in my place. Chef is very friendly. I’m really
                        like chef for Home Food Order. Thanks.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.dFlex,
                  { alignItems: "flex-start", marginLeft: 50 },
                ]}
              >
                <Button
                  text={"Reply"}
                  type={"secondary"}
                  onPress={() => router.navigate("/replyReviews")}
                ></Button>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  container: {
    padding: 24,
    flex: 1,
    flexDirection: "row",
    // marginTop: 50,
    // width: "50%",
    gap: 25,
    alignSelf: "center",
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
    position: "absolute",
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
    width: 400,
    justifyContent: "flex-end",
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
});

export default Review;
