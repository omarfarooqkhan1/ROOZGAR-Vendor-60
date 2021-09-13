import React, { useState } from "react";
import { Container, Text, Grid, Col, View } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
const DATA = [
  {
    id: "1",
    title: "Arif Lodhi",
    appointmentType: "Past",
    image: require("../assets/images/arif.jpg"),
    location: "DHA Phase 6",
    time: "Sep 6, 2021 - 10:00 AM",
  },
  {
    id: "2",
    title: "Arif Lodhi",
    appointmentType: "Past",
    image: require("../assets/images/arif.jpg"),
    location: "DHA Phase 6",
    time: "Sep 6, 2021 - 11:00 AM",
  },
  {
    id: "3",
    title: "Hamza Abbasi",
    appointmentType: "Today",
    image: require("../assets/images/hamza.jpg"),
    location: "Civic Center",
    time: "10:00 AM",
  },
  {
    id: "4",
    title: "Hamza Abbasi",
    appointmentType: "Today",
    image: require("../assets/images/hamza.jpg"),
    location: "Civic Center",
    time: "12:00 PM",
  },
  {
    id: "5",
    title: "Saqlain Ali",
    appointmentType: "Upcoming",
    image: require("../assets/images/saqlain.jpg"),
    location: "Blue Area",
    time: "Sep 9, 2021 - 10:00 AM",
  },
  {
    id: "6",
    title: "Saqlain Ali",
    appointmentType: "Upcoming",
    image: require("../assets/images/saqlain.jpg"),
    location: "Blue Area",
    time: "Sep 9, 2021 - 11:30 AM",
  },
];
import Icon3 from "react-native-vector-icons/Entypo";
import { TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function DoctorAppointments({ navigation }) {
  const [pastColor, setPastColor] = React.useState("lightgrey");
  const [todayColor, setTodayColor] = React.useState("white");
  const [upcomingColor, setUpcomingColor] = React.useState("lightgrey");
  const [getDetails, setDetails] = React.useState("Today");
  const [getNum, setNum] = useState();
  const getModal = (item) => {
    console.log(item.id);
    setNum(item.id);
  };

  const setPast = () => {
    setPastColor("white");
    setTodayColor("lightgrey");
    setUpcomingColor("lightgrey");
    setDetails("Past");
  };
  const setToday = () => {
    setTodayColor("white");
    setPastColor("lightgrey");
    setUpcomingColor("lightgrey");
    setDetails("Today");
  };
  const setUpcoming = () => {
    setUpcomingColor("white");
    setPastColor("lightgrey");
    setTodayColor("lightgrey");
    setDetails("Upcoming");
  };

  return (
    <Container>
      <LinearGradient
        colors={["#00c13e", "#00c193"]}
        style={{ height: hp("15%") }}
      >
        <Grid>
          <Col style={{ width: "100%", alignItems: "center" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  marginVertical: hp("2%"),
                  fontSize: RFValue(13, 580),
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                MY APPOINTMENTS
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: hp(1),
                height: hp(4),
                width: wp(90),
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setPast();
                }}
              >
                <Text
                  style={{
                    color: pastColor,
                    fontSize: RFValue(12, 580),
                    fontWeight: "bold",
                    paddingHorizontal: wp(2),
                  }}
                >
                  PAST
                </Text>
                {getDetails == "Past" ? (
                  <Text
                    style={{
                      color: "white",
                      fontSize: RFValue(18, 580),
                      fontWeight: "bold",
                      paddingHorizontal: wp(2),
                      alignSelf: "center",
                      paddingBottom: hp("5%"),
                    }}
                  >
                    .
                  </Text>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setToday();
                }}
              >
                <Text
                  style={{
                    color: todayColor,
                    fontSize: RFValue(12, 580),
                    fontWeight: "bold",
                    paddingHorizontal: wp(2),
                  }}
                >
                  TODAY
                </Text>
                {getDetails == "Today" ? (
                  <Text
                    style={{
                      color: "white",
                      fontSize: RFValue(18, 580),
                      fontWeight: "bold",
                      paddingHorizontal: wp(0),
                      alignSelf: "center",
                    }}
                  >
                    .
                  </Text>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setUpcoming();
                }}
              >
                <Text
                  style={{
                    color: upcomingColor,
                    fontSize: RFValue(12, 580),
                    fontWeight: "bold",
                    paddingHorizontal: wp(0),
                  }}
                >
                  UPCOMING
                </Text>
                {getDetails == "Upcoming" ? (
                  <Text
                    style={{
                      color: "white",
                      fontSize: RFValue(18, 580),
                      fontWeight: "bold",
                      paddingHorizontal: wp(0),
                      alignSelf: "center",
                    }}
                  >
                    .
                  </Text>
                ) : null}
              </TouchableOpacity>
            </View>
          </Col>
        </Grid>
      </LinearGradient>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return item.appointmentType.localeCompare(getDetails) === 0 ? (
            <View style={styles.notificationTab}>
              <TouchableOpacity
                style={{ display: "flex", flexDirection: "row" }}
                onPress={() => {
                  navigation.navigate("AppointmentDetails", {
                    clientName: item.title,
                    image: item.image,
                  });
                }}
              >
                <View>
                  <Image
                    source={item.image}
                    style={{
                      alignSelf: "flex-start",
                      marginVertical: hp("1%"),
                      height: hp("7%"),
                      width: hp("7%"),
                      marginLeft: wp("5%"),
                      borderColor: "lightgrey",
                      borderWidth: 1,
                      borderRadius: 30,
                    }}
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: hp("15%"),
                    marginHorizontal: wp("2%"),
                    marginBottom: hp("1%"),
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: RFValue(13, 580),
                      fontWeight: "700",
                      marginTop: hp("1%"),
                      marginHorizontal: wp("0%"),
                    }}
                  >
                    {" "}
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: "grey",
                      fontSize: RFValue(10, 580),
                      fontWeight: "700",
                    }}
                  >
                    {" "}
                    {item.location}
                  </Text>
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: RFValue(10, 580),
                      fontWeight: "700",
                    }}
                  >
                    {" "}
                    {item.time}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("TrackClientLocation");
                    }}
                  >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Icon
                        name="my-location"
                        size={wp(4)}
                        color={Colors.primary}
                        style={{
                          alignSelf: "flex-end",
                        }}
                      />
                      <Text
                        style={{
                          color: "grey",
                          fontSize: RFValue(10, 580),
                          fontWeight: "700",

                          marginTop: hp(2),
                        }}
                      >
                        {" "}
                        Track Client Location
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {item.id == getNum ? (
                    <View
                      style={{
                        width: wp("42%"),
                        height: hp(8),
                        backgroundColor: "#fff2",
                        margin: hp(2),
                        right: 70,
                        borderColor: "grey",
                        borderRadius: 3,
                        borderWidth: 1,
                      }}
                    >
                      <View
                        style={{
                          height: hp(4),
                          width: wp("41.5%"),
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "red",
                          overflow: "hidden",
                          borderRadius: 3,
                          borderWidth: 0,
                          borderColor: "#fff2",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: RFValue(12, 580),
                            fontWeight: "700",

                            alignSelf: "center",
                          }}
                        >
                          Cancel Appointment
                        </Text>
                      </View>
                      <View
                        style={{
                          height: hp(4),
                          width: wp("41.5%"),
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#fff2",
                          overflow: "hidden",
                          borderRadius: 3,
                          borderWidth: 2,
                          borderColor: "#fff2",
                        }}
                      >
                        <Text
                          style={{
                            color: "grey",
                            fontSize: RFValue(12, 580),
                            fontWeight: "700",

                            alignSelf: "flex-start",
                          }}
                        >
                          {"  "}
                          Reschedule
                        </Text>
                      </View>
                    </View>
                  ) : item.id < 3 ? (
                    <View
                      style={{
                        width: wp("22%"),
                        height: hp("4%"),
                        alignItems: "center",
                        marginVertical: hp(1),
                        borderRadius: 30,
                        backgroundColor: "#14D4AD",
                        justifyContent: "center",
                        marginLeft: 12,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFValue(10, 580),

                          color: "white",
                          alignSelf: "center",
                        }}
                      >
                        COMPLETED
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: wp("22%"),
                        height: hp("4%"),
                        marginVertical: hp(1),
                        borderRadius: 30,
                        backgroundColor: "lightgrey",
                        justifyContent: "center",
                        marginLeft: 12,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFValue(10, 580),

                          color: "grey",
                          alignSelf: "center",
                        }}
                      >
                        PENDING
                      </Text>
                    </View>
                  )}
                  <Icon3
                    name="dots-three-vertical"
                    size={25}
                    onPress={() => {
                      getModal(item);
                    }}
                    color="grey"
                    style={{
                      marginTop: hp("1.2"),
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ) : null;
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  notificationTab: {
    height: hp("15%"),

    width: wp("98%"),
    alignSelf: "center",
    marginBottom: hp("1%"),
    borderColor: "white",
    borderBottomColor: "lightgrey",
    borderWidth: 1,
  },
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
    backgroundColor: Colors.primary,
    borderRadius: 30,
    padding: 9,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DoctorAppointments;
