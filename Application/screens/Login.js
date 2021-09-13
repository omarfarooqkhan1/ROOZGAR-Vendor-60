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
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.newVendor);

  React.useEffect(() => {
    if (vendor) {
      signUp();
    }
  }, []);

  const signUp = async () => {
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
          Alert.alert(
            "Success",
            "Registration has been completed. Once your documents are verified, we will notify you via SMS, and you will be able to offer your services."
          );
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          "Error",
          "Looks like you aren't connected to the internet!"
        );
        setIsLoading(false);
      });
  };

  const sendCred = () => {
    if (!phone || !password) {
      return Alert.alert("Error", "Must provide both mobile no. and password!");
    }
    if (phone.length < 11)
      return Alert.alert("Error", "Must enter a valid 11-digit mobile no.!");
    setIsLoading(true);
    fetch(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.vendor) {
          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem("vendor", JSON.stringify(data.vendor));
          navigation.replace("TabNavigation");
        } else if (data.error) {
          Alert.alert("Error", data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          "Error",
          "Looks like you aren't connected to the internet!"
        );
        setIsLoading(false);
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
          marginVertical: hp("3%"),
          alignSelf: "center",
        }}
      />
      <View>
        <H1 style={{ alignSelf: "center" }}>Welcome Back</H1>
        <Text
          style={{
            alignSelf: "center",
            fontSize: RFValue(15, 580),
            color: "grey",
          }}
        >
          Login with your vendor account!
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
          <Label style={{ color: "#000", marginVertical: 5 }}>Password</Label>
          <Item regular>
            <Input
              value={password}
              type={"password"}
              style={{ padding: 2 }}
              secureTextEntry={true}
              placeholder="Minimum 6 characters"
              onChangeText={setPassword}
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
          <Text style={{ fontSize: RFValue(15, 580) }}>LOGIN</Text>
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

export default Login;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
});
