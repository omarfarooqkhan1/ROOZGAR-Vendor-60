import React from "react";
import { Container, Text, Grid, Col, View, Content } from "native-base";
import { Avatar } from "react-native-elements";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
const DATA = [
  {
    id: "2",
    title: "CHANGE PASSWORD",
    navigateTo: "ChangePassword",
  },
  {
    id: "3",
    title: "FAQs",
    navigateTo: "FAQs",
  },
  {
    id: "5",
    title: "CONTACT US",
    navigateTo: "ContactUs",
  },
  {
    id: "6",
    title: "LOGOUT",
    navigateTo: "Login",
  },
];
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Settings({ navigation }) {
  const dispatch = useDispatch();
  var vendor = useSelector((state) => state.newVendor);
  const vendorName = vendor.firstName + " " + vendor.lastName;

  const logout = async () => {
    try {
      await AsyncStorage.getAllKeys()
        .then((keys) => AsyncStorage.multiRemove(keys))
        .then(() => {
          vendor = {};
          dispatch({ type: "ADD_NEW_VENDOR", payload: vendor });
          navigation.replace("Login");
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.statusbar} />
      <Container>
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
                        Islamabad
                      </Text>
                    </View>
                  </View>
                </View>
              </Col>
            </Grid>
            <Grid>
              <Col
                style={{
                  width: "100%",
                  alignItems: "center",
                  marginTop: hp("2%"),
                }}
              >
                <View style={{ width: "90%" }}>
                  <Text style={styles.txt2}>{vendorName}</Text>
                </View>
              </Col>
            </Grid>
          </LinearGradient>
          <Avatar
            alignSelf="center"
            bottom={hp("6%")}
            marginBottom={-hp("6%")}
            borderWidth={3}
            borderColor={Colors.primary}
            rounded
            size={120}
            source={{ uri: vendor.image }}
          />
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item.id == 6) {
                      return logout();
                    }
                    navigation.navigate(item.navigateTo);
                  }}
                >
                  <View style={styles.card}>
                    <Text
                      style={{
                        color: "black",
                        fontSize: RFValue(11, 480),
                        fontWeight: "700",
                        alignSelf: "center",
                        letterSpacing: 0,
                      }}
                    >
                      {" "}
                      {item.title}
                    </Text>

                    {item.id == 6 ? (
                      <MaterialIcons
                        name="logout"
                        size={25}
                        color="grey"
                        style={{
                          alignSelf: "center",
                        }}
                      />
                    ) : (
                      <MaterialIcons
                        name="arrow-forward-ios"
                        size={25}
                        color="grey"
                        style={{
                          alignSelf: "center",
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </Content>
      </Container>
    </>
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
  txt1: {
    color: "#fff",
    fontSize: RFValue(16, 580),
  },
  txt2: {
    color: "#fff",
    fontSize: RFValue(20, 580),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp("2%"),
  },
  linearGradient: {
    width: "100%",
    paddingTop: "3%",
    paddingBottom: "10%",
  },
});

export default Settings;
