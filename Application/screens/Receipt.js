import React from "react";
import { Container, Text, Grid, Col, View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function Receipt({ navigation }) {
  return (
    <Container>
      <LinearGradient
        colors={["#00c13e", "#00c193"]}
        style={{ height: hp("7%") }}
      >
        <Grid>
          <Col style={{ width: "100%", alignItems: "center" }}>
            <Text
              style={{
                color: "#fff",
                fontSize: RFValue(14, 580),
                fontWeight: "700",
                marginTop: hp("2%"),
              }}
            >
              RECEIPT
            </Text>
          </Col>
        </Grid>
      </LinearGradient>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: Colors.secondary,
        }}
      >
        <View
          style={{
            width: "82%",
            height: "90%",
            borderWidth: 1,
            borderColor: "lightgrey",
            borderRadius: 5,
            backgroundColor: "#FFFFFF",
            alignSelf: "center",
            marginTop: hp(1),
          }}
        >
          <View
            style={{
              width: "100%",
              height: hp("10%"),
              borderWidth: 1,
              borderColor: "white",
              borderBottomColor: "lightgrey",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "row",
                height: "100%",
                alignSelf: "flex-end",
                marginLeft: "2%",
              }}
            >
              <Image
                source={require("../assets/images/kiraan.png")}
                style={{
                  alignSelf: "flex-start",

                  height: hp("7%"),
                  width: wp("10%"),
                  borderRadius: 10,
                }}
              />
              <View style={{ marginLeft: wp(2), marginTop: hp(0.5) }}>
                <Text
                  style={{
                    color: Colors.secondary,
                    fontSize: RFValue(14, 580),
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Esther Berry
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "5%",
                  }}
                >
                  <Text
                    style={{
                      color: "#333132",
                      fontSize: RFValue(9, 580),

                      height: hp("3"),
                      width: wp(18),
                      backgroundColor: Colors.primary,
                      borderRadius: 10,
                      marginRight: wp(1),
                      textAlign: "center",
                      textAlignVertical: "center",
                    }}
                  >
                    {" "}
                    OnlinePay
                  </Text>
                  <Text
                    style={{
                      color: "#333132",
                      fontSize: RFValue(9, 580),

                      height: hp("3"),
                      width: wp(18),
                      backgroundColor: Colors.primary,
                      borderRadius: 10,
                      textAlign: "center",
                      textAlignVertical: "center",
                    }}
                  >
                    {" "}
                    Discount
                  </Text>
                </View>
              </View>
              <View style={{ marginLeft: wp(10), marginTop: hp(0.5) }}>
                <Text
                  style={{
                    color: "#333132",
                    fontSize: RFValue(15, 580),
                    fontWeight: "bold",
                  }}
                >
                  Rs. 25/-{" "}
                </Text>
                <Text
                  style={{
                    color: "lightgrey",
                    fontSize: RFValue(12, 580),
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  2.2 Km{" "}
                </Text>
              </View>
            </View>
          </View>
          <Ionicons
            name="menu"
            size={wp(8)}
            color="lightgrey"
            style={{
              alignSelf: "flex-start",
              marginLeft: wp("3%"),
            }}
          />
          <Text
            style={{
              color: "#333132",
              fontSize: RFValue(15, 580),
              fontWeight: "bold",
              marginLeft: wp(3),
            }}
          >
            {" "}
            Invoice{" "}
          </Text>
          <View>
            <Text style={{ color: "lightgrey", alignSelf: "center" }}>
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - - - - - -
            </Text>
          </View>
          <Text
            style={{
              color: "lightgrey",
              fontSize: RFValue(12, 580),

              marginLeft: wp(3),
            }}
          >
            {" "}
            DROP OFF
          </Text>
          <Text
            style={{
              color: "#333132",
              fontSize: RFValue(14, 580),

              marginLeft: wp(3),
            }}
          >
            {" "}
            105 Wilian St,Birgingham,UK{" "}
          </Text>
          <View>
            <Text style={{ color: "lightgrey", alignSelf: "center" }}>
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - - - - - -
            </Text>
          </View>
          <Text
            style={{
              color: "lightgrey",
              fontSize: RFValue(12, 580),

              marginLeft: wp(3),
            }}
          >
            {" "}
            NOTED
          </Text>
          <Text
            numberOfLines={3}
            style={{
              color: "#333132",
              fontSize: RFValue(13, 580),

              marginLeft: wp(3),
            }}
          >
            {" "}
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
          <View>
            <Text style={{ color: "lightgrey", alignSelf: "center" }}>
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - - - - - -
            </Text>
          </View>
          <Text
            style={{
              color: "lightgrey",
              fontSize: RFValue(12, 580),

              marginLeft: wp(3),
            }}
          >
            {" "}
            TRIP FARE
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: wp(1),
            }}
          >
            <Text
              style={{
                color: "#333132",
                fontSize: RFValue(14, 580),

                marginLeft: wp(2),
              }}
            >
              {" "}
              Online Pay
            </Text>
            <Text
              style={{
                color: "#333132",
                fontSize: RFValue(14, 580),

                marginRight: wp(3),
              }}
            >
              Rs. 27/-
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: wp(1),
            }}
          >
            <Text
              style={{
                color: "#333132",
                fontSize: RFValue(14, 580),

                marginLeft: wp(2),
              }}
            >
              {" "}
              Discount
            </Text>
            <Text
              style={{
                color: "#333132",
                fontSize: RFValue(14, 580),

                marginRight: wp(3),
              }}
            >
              Rs. 2/-
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: wp(1),
            }}
          >
            <Text
              style={{
                color: "#333132",
                fontSize: RFValue(14, 580),

                marginLeft: wp(2),
              }}
            >
              {" "}
              Paid Amount{" "}
            </Text>
            <Text
              style={{
                color: "#333132",
                fontSize: RFValue(14, 580),

                marginRight: wp(3),
              }}
            >
              Rs. 25/-
            </Text>
          </View>
          <View>
            <Text style={{ color: "lightgrey", alignSelf: "center" }}>
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - - - - - -
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{
              width: "90%",
              height: hp(5),
              alignSelf: "center",
              marginVertical: hp(1),
              borderRadius: 5,
              backgroundColor: Colors.primary,
            }}
          >
            <Text
              style={{
                fontSize: RFValue(17, 580),

                color: "#333132",
                height: hp(5),
                textAlignVertical: "center",
                alignSelf: "center",
              }}
            >
              SAVE RECEIPT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "90%",
              height: hp(5),
              alignSelf: "center",
              marginVertical: hp(1),
              borderRadius: 5,
              backgroundColor: "#333132",
            }}
          >
            <Text
              style={{
                fontSize: RFValue(17, 580),

                color: "white",
                height: hp(5),
                textAlignVertical: "center",
                alignSelf: "center",
              }}
            >
              LODGE COMPLAINT?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    height: hp("10%"),
    backgroundColor: "#fff3",

    width: wp("95%"),
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: hp("1%"),
    borderBottomColor: "lightgrey",
    borderWidth: 1,
    borderColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btn: {
    width: wp("75%"),
    height: hp("6.5%"),
    backgroundColor: "#02C2EA",
    borderRadius: 30,
    padding: 9,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Receipt;
