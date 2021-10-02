import React from "react";
import { Container, Text, Grid, Col, View, Content } from "native-base";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";
import baseURL from "../constants/baseURL";
import { useSelector } from "react-redux";
import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";

function Dashboard({ navigation }) {
  var vendor = useSelector((state) => state.newVendor);
  const vendorName = vendor.firstName + " " + vendor.lastName;

  const showNotification = (remoteMessage) => {
    fetch(`${baseURL}/getClient/${remoteMessage.data.clientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return navigation.navigate("AcceptOrder", {
          clientUserName: data.clientUserName,
          clientImage: data.clientImage,
          clientPhone: data.clientPhone,
          clientToken: remoteMessage.data.clientToken,
          clientLatitude: remoteMessage.data.Lat,
          clientLongitude: remoteMessage.data.Long,
          serviceTitle: remoteMessage.data.serviceTitle,
          orderId: remoteMessage.data.item,
        });
      });
  };

  React.useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(remoteMessage.data);
      showNotification(remoteMessage);
    });
    messaging().onMessage((remoteMessage) => {
      console.log(remoteMessage.data);
      showNotification(remoteMessage);
    });
    messaging().onTokenRefresh(() => {
      messaging()
        .getToken()
        .then((updatedToken) => {
          console.log("Token was updated!");
          firestore().collection("vendorLocations").doc(vendor._id).update({
            vendorToken: updatedToken,
          });
        });
    });
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#00c13e" />
      <Container>
        <ScrollView>
          <Content>
            <LinearGradient
              colors={["#00c13e", "#00c193"]}
              style={styles.linearGradient}
            >
              <Grid>
                <Col style={{ width: "100%", alignItems: "center" }}>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: "100%",
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Icon name="map-marker" size={wp(6)} color="#fff" />
                        <Text
                          style={{
                            fontSize: RFValue(15, 580),
                            color: "#fff",
                            paddingHorizontal: 10,
                          }}
                        >
                          {vendor.city}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Col>
              </Grid>
              <Grid style={{ marginTop: "2%" }}>
                <Col style={{ width: "100%", alignItems: "center" }}>
                  <View style={{ width: "90%" }}>
                    <Text style={styles.txt1}>Welcome!</Text>
                  </View>
                </Col>
              </Grid>
              <Grid>
                <Col style={{ width: "100%", alignItems: "center" }}>
                  <View style={{ width: "90%" }}>
                    <Text style={styles.txt2}>{vendorName}</Text>
                  </View>
                </Col>
              </Grid>
            </LinearGradient>
            <Avatar
              alignSelf="center"
              bottom={hp("6%")}
              marginBottom={-hp("11.5%")}
              borderWidth={2}
              borderColor={Colors.primary}
              rounded
              size={120}
              source={{ uri: vendor.image }}
            />
            <View style={styles.bigcard}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MyServices");
                }}
              >
                <View style={styles.card}>
                  <Image
                    source={require("../assets/images/myServices.png")}
                    style={{
                      marginTop: hp("1%"),
                      marginBottom: hp("0.5%"),
                      alignSelf: "center",
                      tintColor: Colors.primary,
                      height: hp("8%"),
                      width: wp("16%"),
                    }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      color: Colors.primary,
                      fontSize: RFValue(12, 580),
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    My{"\n"}Services
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SelectSubCategory");
                }}
              >
                <View style={styles.card}>
                  <Image
                    source={require("../assets/images/addService.png")}
                    style={{
                      marginTop: hp("1%"),
                      marginBottom: hp("0.5%"),
                      alignSelf: "center",
                      tintColor: Colors.primary,
                      height: hp("8%"),
                      width: wp("16%"),
                    }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      color: Colors.primary,
                      fontSize: RFValue(12, 580),
                      fontWeight: "700",
                    }}
                  >
                    {" "}
                    Add{"\n"}New Service
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MyAppointments");
                }}
              >
                <View style={styles.card}>
                  <Image
                    source={require("../assets/images/myAppointments.png")}
                    style={{
                      marginTop: hp("1%"),
                      marginBottom: hp("0.5%"),
                      alignSelf: "center",
                      tintColor: Colors.primary,
                      height: hp("8%"),
                      width: wp("16%"),
                    }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      color: Colors.primary,
                      fontSize: RFValue(12, 580),
                      fontWeight: "700",
                    }}
                  >
                    {" "}
                    My{"\n"}Appointments
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MyPayments");
                }}
              >
                <View style={styles.card}>
                  <Image
                    source={require("../assets/images/myPayments.png")}
                    style={{
                      marginTop: hp("1%"),
                      marginBottom: hp("0.5%"),
                      alignSelf: "center",
                      tintColor: Colors.primary,
                      height: hp("8%"),
                      width: wp("16%"),
                    }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      color: Colors.primary,
                      fontSize: RFValue(12, 580),
                      fontWeight: "700",
                    }}
                  >
                    {" "}
                    My{"\n"}Payments
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "95%",
                height: hp("5%"),
                marginHorizontal: hp("1%"),
                backgroundColor: Colors.secondary,
              }}
            >
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: RFValue(13, 580),
                  fontWeight: "700",
                  marginTop: hp("1%"),
                }}
              >
                {" "}
                YOUR NEXT APPOINTMENTS
              </Text>
            </View>
            <ScrollView>
              <View style={styles.appoitmentscard}>
                <Text
                  style={{
                    color: "black",
                    fontSize: RFValue(13, 580),
                    fontWeight: "700",
                    marginTop: hp("2%"),
                    marginHorizontal: wp("2%"),
                  }}
                >
                  {" "}
                  Arif Lodhi
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: hp("1%"),
                  }}
                >
                  <Text
                    style={{
                      color: "limegreen",
                      fontSize: RFValue(11, 580),
                      fontWeight: "700",
                      marginVertical: hp("0.5%"),
                      marginLeft: wp("2%"),
                    }}
                  >
                    {" "}
                    March 24,2014 -
                  </Text>
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: RFValue(11, 580),
                      fontWeight: "700",
                      marginVertical: hp("0.5%"),
                    }}
                  >
                    {" "}
                    DHA Phase 6
                  </Text>
                </View>
              </View>
              <View style={styles.appoitmentscard}>
                <Text
                  style={{
                    color: "black",
                    fontSize: RFValue(13, 580),
                    fontWeight: "700",
                    marginTop: hp("2%"),
                    marginHorizontal: wp("2%"),
                  }}
                >
                  {" "}
                  Arif Lodhi
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: hp("1%"),
                  }}
                >
                  <Text
                    style={{
                      color: "limegreen",
                      fontSize: RFValue(11, 580),
                      fontWeight: "700",
                      marginVertical: hp("0.5%"),
                      marginLeft: wp("2%"),
                    }}
                  >
                    {" "}
                    March 24,2014 -
                  </Text>
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: RFValue(11, 580),
                      fontWeight: "700",
                      marginVertical: hp("0.5%"),
                    }}
                  >
                    {" "}
                    Nishter Hospital
                  </Text>
                </View>
              </View>
              <View style={styles.appoitmentscard}>
                <Text
                  style={{
                    color: "black",
                    fontSize: RFValue(13, 580),
                    fontWeight: "700",
                    marginTop: hp("2%"),
                    marginHorizontal: wp("2%"),
                  }}
                >
                  {" "}
                  Arif Lodhi
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: hp("1%"),
                  }}
                >
                  <Text
                    style={{
                      color: "limegreen",
                      fontSize: RFValue(11, 580),
                      fontWeight: "700",
                      marginVertical: hp("0.5%"),
                      marginLeft: wp("2%"),
                    }}
                  >
                    {" "}
                    March 24,2014 -
                  </Text>
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: RFValue(11, 580),
                      fontWeight: "700",
                      marginVertical: hp("0.5%"),
                    }}
                  >
                    {" "}
                    Nishter Hospital
                  </Text>
                </View>
              </View>
              <View style={styles.appoitmentscard}>
                <Text
                  style={{
                    color: "black",
                    fontSize: RFValue(13, 580),
                    fontWeight: "700",
                    marginTop: hp("2%"),
                    marginHorizontal: wp("2%"),
                  }}
                >
                  {" "}
                  Arif Lodhi
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: hp("1%"),
                  }}
                >
                  <Text
                    style={{
                      color: "limegreen",
                      fontSize: RFValue(11, 580),
                      fontWeight: "700",
                      marginVertical: hp("0.5%"),
                      marginLeft: wp("2%"),
                    }}
                  >
                    {" "}
                    March 24,2014 -
                  </Text>
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: RFValue(11, 580),
                      fontWeight: "700",
                      marginVertical: hp("0.5%"),
                    }}
                  >
                    {" "}
                    Nishter Hospital
                  </Text>
                </View>
              </View>
            </ScrollView>
          </Content>
        </ScrollView>
      </Container>
    </>
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
    backgroundColor: "#02C2EA",
    borderRadius: 30,
    padding: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: wp("32%"),
    height: hp("15.5%"),
    marginHorizontal: wp("3%"),
    marginVertical: hp("2%"),
    borderWidth: 1.1,
    borderColor: "limegreen",
    borderRadius: 10,
    alignItems: "center",
  },
  bigcard: {
    marginTop: hp("6%"),
    width: wp("80%"),
    height: hp("40%"),
    marginHorizontal: wp("10%"),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  appoitmentscard: {
    borderColor: "lightgrey",
    borderWidth: 1,
  },
  txt1: {
    color: "#fff",
    fontSize: RFValue(16, 580),
  },
  txt2: {
    color: "#fff",
    fontSize: RFValue(20, 580),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  linearGradient: {
    width: "100%",
    paddingTop: "3%",
    paddingBottom: "10%",
  },
});

export default Dashboard;
