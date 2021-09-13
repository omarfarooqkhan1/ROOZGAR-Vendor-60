import React from "react";
import { Container, Text, Grid, Col, View, Content } from "native-base";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import baseURL from "../constants/baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

function WelcomeVendor({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.newVendor);
  const vendorName = vendor.firstName + " " + vendor.lastName;

  React.useEffect(() => {
    sendCred();
  }, []);

  const sendCred = async () => {
    setIsLoading(true);
    fetch(`${baseURL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: vendor.firstName,
        lastName: vendor.lastName,
        cnic: vendor.cnic,
        phone: vendor.phone,
        password: vendor.password,
        image: vendor.image,
        category: vendor.category,
        cnicFront: vendor.cnicFront,
        cnicBack: vendor.cnicBack,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.vendor) {
          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem("vendor", JSON.stringify(data.vendor));
          dispatch({ type: "ADD_NEW_VENDOR", payload: data.vendor });
        }
        setIsLoading(false);
      })
      .catch((e) => {
        Alert.alert("Error", e);
        console.log(e);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <>
        <StatusBar backgroundColor={Colors.statusbar} />
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </>
    );
  }

  return (
    <Container>
      <StatusBar backgroundColor="#00c13e" />
      <ScrollView>
        <Content>
          <LinearGradient
            colors={["#00c13e", "#00c193"]}
            style={{ height: hp("35%") }}
          >
            <Grid>
              <Col style={{ width: "100%", alignItems: "center" }}>
                <Text
                  style={{
                    marginTop: hp("8%"),
                    fontSize: RFValue(20, 580),
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Welcome
                </Text>
                <Text
                  style={{
                    marginTop: hp("5%"),
                    fontSize: RFValue(25, 580),
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {vendorName}
                </Text>
                <Avatar
                  alignSelf="center"
                  borderWidth={3}
                  marginTop={hp("5%")}
                  borderColor={Colors.primary}
                  rounded
                  size={150}
                  source={{ uri: vendor.image }}
                />
              </Col>
            </Grid>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SelectSubCategory");
            }}
          >
            <Grid style={{ marginTop: "35%", paddingBottom: "8%" }}>
              <Col style={{ width: "100%", alignItems: "center" }}>
                <View style={styles.btn}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: RFValue(14, 580),
                    }}
                  >
                    Add New Service
                  </Text>
                </View>
              </Col>
            </Grid>
          </TouchableOpacity>
          <Grid style={{ marginTop: hp("0.5%") }}>
            <Col style={{ alignItems: "center", width: "100%" }}>
              <Text
                style={{
                  color: "grey",
                  fontWeight: "bold",
                  fontSize: RFValue(13, 580),
                  letterSpacing: 0.3,
                }}
              >
                OR
              </Text>
            </Col>
          </Grid>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("TabNavigation");
            }}
          >
            <Grid style={{ marginTop: hp("2%"), marginBottom: "5%" }}>
              <Col style={{ alignItems: "center", width: "100%" }}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontWeight: "bold",
                    fontSize: RFValue(16, 580),
                    letterSpacing: 0.3,
                  }}
                >
                  Do It Later
                </Text>
              </Col>
            </Grid>
          </TouchableOpacity>

          <Grid style={{ marginTop: hp("4%"), marginBottom: hp("8%") }}>
            <Col
              style={{
                alignItems: "center",
                width: "100%",
              }}
            >
              <Icon
                name="phone"
                size={25}
                color="#345A63"
                style={{
                  borderWidth: 1,
                  borderColor: "grey",
                  borderRadius: 25,
                  paddingVertical: 10,
                  paddingHorizontal: 13,
                }}
              />
              <Text
                style={{
                  color: "#000",
                  fontSize: RFValue(14, 580),
                }}
              >
                Help
              </Text>
            </Col>
          </Grid>
        </Content>
      </ScrollView>
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
    height: hp("7%"),
    backgroundColor: Colors.primary,
    borderRadius: 30,
    padding: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
});

export default WelcomeVendor;
