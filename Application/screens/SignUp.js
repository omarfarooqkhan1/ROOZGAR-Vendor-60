import React from "react";
import { Label, Input, Form, Item, H1, Button, View, Text } from "native-base";
import Colors from "../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  StyleSheet,
  StatusBar,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useDispatch } from "react-redux";
import baseURL from "../constants/baseURL";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [cnic, setCnic] = React.useState("");

  const sendCred = async () => {
    if (!firstName) {
      return Alert.alert("Error", "Please enter your first name!");
    }
    if (!lastName) {
      return Alert.alert("Error", "Please enter your last name!");
    }
    if (!phone) {
      return Alert.alert("Error", "Please enter your mobile no.!");
    }
    if (!cnic) {
      return Alert.alert("Error", "Please enter your CNIC!");
    }
    if (phone.length < 11)
      return Alert.alert("Error", "Please enter a valid 11-digit Mobile no.!");
    if (cnic.length < 13)
      return Alert.alert("Error", "Please enter a valid 13-digit CNIC!");
    setIsLoading(true);
    fetch(`${baseURL}/checkAlreadyRegistered/${phone}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setIsLoading(false);
          return Alert.alert("Error", data.error);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert(
          "Error",
          "Looks like you aren't connected to the internet!"
        );
        navigation.navigate("SignUp");
      });
    setIsLoading(false);
    const vendor = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      cnic: cnic,
    };
    dispatch({ type: "ADD_NEW_VENDOR", payload: vendor });
    navigation.navigate("OTP");
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={{ height: "100%", backgroundColor: Colors.secondary }}>
        <Image
          source={require("../assets/images/LOGO.jpg")}
          style={{
            width: wp("70%"),
            height: hp("25%"),
            marginVertical: hp("3%"),
            alignSelf: "center",
          }}
        />
        <View>
          <H1 style={{ alignSelf: "center", marginTop: -hp("2%") }}>
            Let's Get Started
          </H1>
          <Text
            style={{
              alignSelf: "center",
              fontSize: RFValue(15, 580),
              color: "grey",
            }}
          >
            Sign up as a Vendor!
          </Text>
        </View>
        <ScrollView
          style={{ width: "100%", paddingHorizontal: 5, marginVertical: 5 }}
        >
          <Form style={{ marginHorizontal: 10, marginTop: 10 }}>
            <Label style={{ color: "#000", marginVertical: 5 }}>
              First Name
            </Label>
            <Item regular style={{ marginBottom: 5 }}>
              <Input
                value={firstName}
                placeholder="First Name: (e.g. John)"
                _focus={{ borderColor: "green" }}
                onChangeText={setFirstName}
              />
            </Item>
            <Label style={{ color: "#000", marginVertical: 5 }}>
              Last Name
            </Label>
            <Item regular style={{ marginBottom: 5 }}>
              <Input
                value={lastName}
                placeholder="Last Name: (e.g. Doe)"
                _focus={{ borderColor: "green" }}
                onChangeText={setLastName}
              />
            </Item>
            <Label style={{ color: "#000", marginVertical: 5 }}>Mobile #</Label>
            <Item regular style={{ marginBottom: 5 }}>
              <Input
                value={phone}
                placeholder="11-Digit No. (e.g. 03001234567)"
                maxLength={11}
                keyboardType={"number-pad"}
                _focus={{ borderColor: "green" }}
                onChangeText={setPhone}
              />
            </Item>
            <Label style={{ color: "#000", marginVertical: 5 }}>CNIC #</Label>
            <Item regular style={{ marginBottom: 5 }}>
              <Input
                style={{ padding: 2 }}
                value={cnic}
                placeholder="13 Digit No: (e.g. 3630212345678)"
                maxLength={13}
                keyboardType={"number-pad"}
                _focus={{ borderColor: "green" }}
                onChangeText={setCnic}
              />
            </Item>
          </Form>
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
            <Text style={{ fontSize: RFValue(15, 580) }}>SIGN UP</Text>
          </Button>
          <View style={{ alignSelf: "center", flexDirection: "row" }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
              <Text style={{ fontWeight: "bold", color: Colors.primary }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
});
