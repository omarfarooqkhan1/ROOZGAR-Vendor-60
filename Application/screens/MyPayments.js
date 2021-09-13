import React from "react";
import { Container, Text, Grid, Col, View } from "native-base";
import Icon2 from "react-native-vector-icons/Foundation";
import Colors from "../constants/Colors";

const DATA = [
  {
    id: "1",
    title: "Arif Lodhi",
    hospital: "Chak Shahzad",
  },
  {
    id: "2",
    title: "Omer Farooq",
    hospital: "Civic Center",
  },
  {
    id: "3",
    hospital: "F-10/4",
    title: "Saqlain Ali",
  },
];
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

function MyFinance({ navigation }) {
  const { firstName, lastName } = useSelector((state) => state.newVendor);
  const vendorName = firstName + " " + lastName;
  return (
    <Container>
      <StatusBar backgroundColor="#00c13e" />
      <LinearGradient
        colors={["#00c13e", "#00c193"]}
        style={{ height: hp("16.5%") }}
      >
        <Grid>
          <Col style={{ width: "100%", alignItems: "center" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(15, 580),
                  fontWeight: "700",
                  marginVertical: hp("2%"),
                  marginLeft: wp("35%"),
                }}
              >
                {" "}
                MY FINANCE
              </Text>
              <View
                style={{
                  width: wp("20%"),
                  display: "flex",
                  flexDirection: "row",
                  marginTop: hp("2%"),
                  marginRight: hp("1%"),
                }}
              ></View>
            </View>

            <View
              style={{
                width: wp("100%"),
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(17, 580),
                  fontWeight: "700",
                  marginTop: hp("2.5%"),
                  marginLeft: wp("3%"),
                }}
              >
                {vendorName}
              </Text>
              <View>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: RFValue(11, 580),
                    fontWeight: "400",
                    marginLeft: wp("6%"),
                    marginTop: hp("0%"),
                  }}
                >
                  {" "}
                  Total Earning
                </Text>

                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: RFValue(11, 580),
                      fontWeight: "700",
                      marginTop: hp("1%"),
                    }}
                  >
                    {" "}
                    PKR
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: RFValue(18, 580),
                      fontWeight: "700",

                      marginRight: hp("2%"),
                    }}
                  >
                    {" "}
                    25,000
                  </Text>
                </View>
              </View>
            </View>
          </Col>
        </Grid>
      </LinearGradient>
      <View style={styles.bigcard}>
        <LinearGradient colors={["#00c13e", "#00c193"]} style={styles.card}>
          <Text
            style={{
              color: "#fff",
              fontSize: RFValue(15, 680),
              fontWeight: "700",
              marginTop: hp("2%"),
            }}
          >
            {" "}
            This Month{" "}
          </Text>

          <Text
            style={{
              color: "#fff",
              fontSize: RFValue(13, 580),
              fontWeight: "700",
            }}
          >
            {" "}
            PKR 25,000
          </Text>
        </LinearGradient>

        <View style={[styles.card]}>
          <Text
            style={{
              color: "black",
              fontSize: RFValue(13, 680),
              fontWeight: "700",
              marginTop: hp("2%"),
            }}
          >
            {" "}
            Today's Earnings{" "}
          </Text>

          <Text
            style={{
              color: Colors.primary,
              fontSize: RFValue(12, 580),
            }}
          >
            {" "}
            PKR 1500
          </Text>
        </View>
      </View>
      <View style={{ marginVertical: hp("1%") }}>
        <Text
          style={{
            color: "black",
            fontSize: RFValue(12, 580),
            fontWeight: "700",
          }}
        >
          {" "}
          - THIS MONTH -
        </Text>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("Receipt")}>
              {item.id % 2 !== 0 ? (
                <View style={styles.appoitmentscard}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "black",
                        fontSize: RFValue(10, 580),
                        fontWeight: "700",
                        marginTop: hp("3%"),
                        marginHorizontal: hp("1%"),
                        backgroundColor: "lightgrey",
                        borderRadius: 50,
                        display: "flex",
                        flexDirection: "row",

                        justifyContent: "center",

                        alignItems: "center",
                        width: wp("3.5%"),
                        height: wp("4%"),
                      }}
                    >
                      {" "}
                      {item.id}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: RFValue(13, 580),
                        fontWeight: "700",
                        marginTop: hp("3%"),
                      }}
                    >
                      {" "}
                      {item.title}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      marginBottom: hp("1%"),
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: "grey",
                          fontSize: RFValue(11, 580),
                          fontWeight: "700",
                          marginVertical: hp("0%"),
                          marginLeft: wp("8%"),
                        }}
                      >
                        {" "}
                        March 24,2014-
                      </Text>
                      <Text
                        style={{
                          color: Colors.primary,
                          fontSize: RFValue(11, 580),
                          fontWeight: "700",
                          marginBottom: hp("1%"),
                          marginLeft: wp("8%"),
                        }}
                      >
                        {" "}
                        {item.hospital}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "#e8f4f8",
                        borderRadius: 20,
                        justifyContent: "center",
                        width: wp("27%"),
                        height: hp("3%"),
                        marginRight: wp("5%"),
                        alignItems: "center",
                      }}
                    >
                      <Icon2
                        name="dollar-bill"
                        size={20}
                        color={Colors.primary}
                        style={{
                          marginLeft: wp("2%"),
                          marginTop: hp("0%"),
                        }}
                      />
                      <Text
                        style={{
                          color: "grey",
                          fontSize: RFValue(10, 580),
                          fontWeight: "700",
                          marginTop: hp("0%"),
                          marginRight: wp("5%"),
                        }}
                      >
                        {" "}
                        RS 1500
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={[
                    styles.appoitmentscard,
                    { borderBottomColor: "white" },
                  ]}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "black",
                        fontSize: RFValue(10, 580),
                        fontWeight: "700",
                        marginTop: hp("3%"),
                        marginHorizontal: hp("1%"),
                        backgroundColor: "lightgrey",
                        borderRadius: 50,
                        display: "flex",
                        flexDirection: "row",

                        justifyContent: "center",

                        alignItems: "center",
                        width: wp("3.5%"),
                        height: wp("4%"),
                      }}
                    >
                      {" "}
                      {item.id}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: RFValue(13, 580),
                        fontWeight: "700",
                        marginTop: hp("3%"),
                      }}
                    >
                      {" "}
                      {item.title}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      marginBottom: hp("1%"),
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: "grey",
                          fontSize: RFValue(11, 580),
                          fontWeight: "700",
                          marginVertical: hp("0%"),
                          marginLeft: wp("8%"),
                        }}
                      >
                        {" "}
                        March 24,2014-
                      </Text>
                      <Text
                        style={{
                          color: Colors.primary,
                          fontSize: RFValue(11, 580),
                          fontWeight: "700",
                          marginBottom: hp("1%"),
                          marginLeft: wp("8%"),
                        }}
                      >
                        {" "}
                        {item.hospital}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "#e8f4f8",
                        borderRadius: 20,
                        justifyContent: "center",
                        width: wp("27%"),
                        height: hp("3%"),
                        marginRight: wp("5%"),
                        alignItems: "center",
                      }}
                    >
                      <Icon2
                        name="dollar-bill"
                        size={20}
                        color={Colors.primary}
                        style={{
                          marginLeft: wp("2%"),
                          marginTop: hp("0%"),
                        }}
                      />
                      <Text
                        style={{
                          color: "grey",
                          fontSize: RFValue(10, 580),
                          fontWeight: "700",
                          marginTop: hp("0%"),
                          marginRight: wp("5%"),
                        }}
                      >
                        {" "}
                        RS 1500
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btn: {
    width: wp("75%"),
    height: hp("6.5%"),
    backgroundColor: Colors.primary,
    borderRadius: 30,
    padding: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: wp("42%"),
    height: hp("10%"),
    marginHorizontal: wp("1%"),
    marginVertical: hp("2%"),
    borderWidth: 0.7,
    borderColor: "lightgrey",
    borderRadius: 5,
    alignItems: "center",
  },
  bigcard: {
    marginTop: hp("2%"),
    backgroundColor: "white",
    width: wp("99%"),
    height: hp("15%"),
    marginHorizontal: wp("5%"),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  appoitmentscard: {
    borderBottomColor: "lightgrey",
    borderWidth: 1,
    borderColor: "white",
  },
});

export default MyFinance;
