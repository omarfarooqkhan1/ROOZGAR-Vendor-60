import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";

import Colors from "../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { RFValue } from "react-native-responsive-fontsize";

function Profile({ navigation }) {
  const { firstName, lastName, image, category } = useSelector(
    (state) => state.newVendor
  );
  const vendorName = firstName + " " + lastName;
  const categoryName = category.title;

  return (
    <>
      <StatusBar backgroundColor="#00c13e" />
      <View style={styles.container}>
        <LinearGradient
          colors={["#00c13e", "#00c193"]}
          style={styles.linearGradient}
        >
          <View style={{ width: wp("100%"), flexDirection: "row" }}>
            <View
              style={{
                width: wp("40%"),
                paddingHorizontal: wp(2),
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={25} color="#fff" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: wp("60%"),
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="share-social-outline"
                  size={25}
                  color="#fff"
                  style={{
                    paddingHorizontal: wp(2),
                  }}
                />
              </View>
            </View>
          </View>
          {/*Image*/}
          <View
            style={{
              width: wp("100%"),
              alignItems: "center",
              marginTop: hp(2),
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: wp("35%"),
                height: wp("35%"),
                borderRadius: 100,
                borderWidth: 3,
                borderColor: Colors.primary,
              }}
            ></Image>
          </View>
          {/*Title and subtitle*/}
          <View
            style={{ width: wp("90%"), flexDirection: "row", marginTop: hp(1) }}
          >
            <View
              style={{
                width: wp("60%"),
                paddingHorizontal: wp(2),
                marginLeft: wp("3%"),
              }}
            >
              <View style={{ width: wp("90%") }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: RFValue(16, 580),
                    fontWeight: "bold",
                  }}
                >
                  {vendorName}
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    top: 2,
                    fontSize: RFValue(10, 580),
                  }}
                >
                  Category: {categoryName}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: wp("40%"),
                paddingHorizontal: wp(5),
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="star"
                  size={wp(4)}
                  color="#FBCC00"
                  style={{
                    margin: wp(0.4),
                  }}
                />
                <Ionicons
                  name="star"
                  size={wp(4)}
                  color="#FBCC00"
                  style={{
                    margin: wp(0.4),
                  }}
                />
                <Ionicons
                  name="star"
                  size={wp(4)}
                  color="#FBCC00"
                  style={{
                    margin: wp(0.4),
                  }}
                />
                <Ionicons
                  name="star"
                  size={wp(4)}
                  color="#FBCC00"
                  style={{
                    margin: wp(0.4),
                  }}
                />
                <Ionicons
                  name="star"
                  size={wp(4)}
                  color="#fff"
                  style={{
                    margin: wp(0.4),
                  }}
                />
              </View>
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(10, 580),
                  textAlign: "center",
                  marginLeft: wp("5%"),
                  top: 8,
                }}
              >
                4.4/5.0
              </Text>
            </View>
          </View>
        </LinearGradient>
        <ScrollView>
          <View style={styles.main}>
            <View
              style={{
                width: wp("100%"),
                marginTop: hp(1),
                paddingHorizontal: wp(2),
              }}
            >
              <Text
                style={{
                  fontSize: RFValue(14, 580),
                  color: "black",
                }}
              >
                About Me
              </Text>
            </View>
            <View
              style={{
                width: wp("100%"),
                marginTop: hp(1),
                paddingHorizontal: wp(2),
              }}
            >
              <Text
                numberOfLines={8}
                style={{
                  fontSize: RFValue(11, 580),
                  textAlign: "justify",
                  color: "grey",
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </Text>
            </View>
            {/*space rect*/}
            <View style={{ width: wp("100%"), marginVertical: hp(2) }}></View>
            <View
              style={{
                width: wp("96%"),
                height: hp("6%"),
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: wp("4%"),
              }}
            >
              <View
                style={{
                  width: wp("25%"),
                  height: hp("5%"),
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(11, 580),
                    color: "grey",
                    fontWeight: "bold",
                  }}
                >
                  Degree:
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(11, 580),
                    color: "grey",
                  }}
                >
                  DAE Electrical
                </Text>
              </View>
              <View
                style={{
                  width: wp("30%"),
                  height: hp("5%"),
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(11, 580),
                    color: "grey",
                    fontWeight: "bold",
                  }}
                >
                  Training:
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(11, 580),
                    color: "grey",
                  }}
                >
                  TTC College
                </Text>
              </View>
              <View
                style={{
                  width: wp("25%"),
                  height: hp("5%"),
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(11, 580),
                    color: "grey",
                    fontWeight: "bold",
                  }}
                >
                  Experience:
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(11, 580),
                    color: "grey",
                  }}
                >
                  5 years
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: hp("5%"),
                width: wp("96%"),
                height: hp("6%"),
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: wp("4%"),
              }}
            >
              <View
                style={{
                  width: wp("25%"),
                  height: hp("5%"),
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(11, 580),
                    color: "grey",
                    fontWeight: "bold",
                  }}
                >
                  Total Hours:
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(11, 580),
                    color: "grey",
                  }}
                >
                  100+
                </Text>
              </View>
              <View
                style={{
                  width: wp("30%"),
                  height: hp("5%"),
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(11, 580),
                    color: "grey",
                    fontWeight: "bold",
                  }}
                >
                  Total Orders:
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(11, 580),
                    color: "grey",
                  }}
                >
                  50
                </Text>
              </View>
              <View
                style={{
                  width: wp("25%"),
                  height: hp("5%"),
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(11, 580),
                    color: "grey",
                    fontWeight: "bold",
                  }}
                >
                  Last Order:
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(11, 580),
                    color: "grey",
                  }}
                >
                  2 hours ago
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          width: wp("100%"),
          height: hp("10%"),
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          marginBottom: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        >
          <View
            style={{
              width: wp("90%"),
              alignItems: "center",
              paddingVertical: hp(1.5),
              borderRadius: 4,
              backgroundColor: Colors.primary,
            }}
          >
            <Text
              style={{
                fontSize: RFValue(12, 580),
                paddingHorizontal: wp(3),
                color: "#fff",
              }}
            >
              Edit Profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: {
    width: wp("100%"),
    backgroundColor: "#fff",
    alignItems: "center",
  },
  linearGradient: {
    width: "100%",
    paddingTop: "3%",
    paddingBottom: "6%",
    backgroundColor: "#1D75D3",
  },
  searchBtn: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 4,
    flexDirection: "row",
  },
  textArea: {
    width: "90%",
    height: hp(5.5),
    paddingLeft: wp(2),
    fontSize: RFValue(11, 580),
    justifyContent: "flex-start",
    borderColor: "lightgrey",
    color: "#000",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});

export default Profile;
