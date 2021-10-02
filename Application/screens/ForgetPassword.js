import React from "react";
import { Label, Input, Form, Item, H1, Button, View, Text } from "native-base";
import Colors from "../constants/Colors";
import baseURL from "../constants/baseURL";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import {
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";

const ForgetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [phone, setPhone] = React.useState("");

  const sendCred = () => {
    if (!phone) {
      return Alert.alert("Error", "Must provide a phone number!");
    }
    if (phone.length < 11)
      return Alert.alert("Error", "Must enter a valid 11-digit mobile no.!");
    setIsLoading(true);
    fetch(`${baseURL}/checkAlreadyRegistered/${phone}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        console.log("data", data);
        if (data.error) {
          const vendor = {
            phone: phone,
          };
          dispatch({ type: "ADD_NEW_VENDOR", payload: vendor });
          navigation.navigate("OTP", {
            navigateTo: "ResetPassword",
          });
        } else {
          return Alert.alert(
            "Error",
            "Sorry, no account found with this mobile number!"
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        Alert.alert(
          "Error",
          "Looks like you aren't connected to the internet!"
        );
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <View style={{ height: "100%", backgroundColor: Colors.secondary }}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <Image
        source={require("../assets/images/LOGO.jpg")}
        style={{
          width: wp("70%"),
          height: hp("25%"),
          marginTop: hp("12%"),
          marginBottom: hp("3%"),
          alignSelf: "center",
        }}
      />
      <View>
        <H1 style={{ alignSelf: "center" }}>Forgot your password?</H1>
        <Text
          style={{
            alignSelf: "center",
            fontSize: RFValue(15, 580),
            color: "grey",
          }}
        >
          Let's recover your account!
        </Text>
      </View>
      <ScrollView
        style={{ width: "100%", paddingHorizontal: 5, marginVertical: 5 }}
      >
        <Form style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <Label style={{ color: "#000", marginVertical: 5 }}>Mobile #</Label>
          <Item regular style={{ marginBottom: 10 }}>
            <Input
              style={{ padding: 2 }}
              value={phone}
              placeholder="11-Digit No. (e.g. 03001234567)"
              maxLength={11}
              keyboardType={"number-pad"}
              onChangeText={setPhone}
            />
          </Item>
        </Form>
        <View
          style={{
            width: wp("95%"),
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        ></View>
        <Button
          rounded
          success
          onPress={sendCred}
          style={{
            marginVertical: 10,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            width: wp("30%"),
          }}
        >
          <Text style={{ fontSize: RFValue(15, 580) }}>NEXT</Text>
        </Button>
        <View style={{ alignSelf: "center", flexDirection: "row" }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("SignUp")}>
            <Text style={{ fontWeight: "bold", color: Colors.primary }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
});
