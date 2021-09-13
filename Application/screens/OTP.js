import React from "react";
import { Title, Header, Text, View, Button, Body, H1 } from "native-base";
import { TouchableOpacity, StatusBar } from "react-native";
import SMSVerifyCode from "react-native-sms-verifycode";
import Colors from "../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const OTP = ({ navigation }) => {
  const { phone } = useSelector((state) => state.newVendor);
  return (
    <>
      <StatusBar backgroundColor={Colors.statusbar} />
      <Header style={{ backgroundColor: Colors.primary }}>
        <Body>
          <Title style={{ alignSelf: "center" }}>ROOZGAR</Title>
        </Body>
      </Header>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: Colors.secondary,
        }}
      >
        <H1 style={{ textAlign: "center", marginVertical: hp("2%") }}>
          Enter SMS Code
        </H1>
        <Text
          style={{
            alignSelf: "center",
            fontSize: RFValue(15, 580),
            color: "grey",
          }}
        >
          SMS Code was sent to: +92{phone.substring(1)}
        </Text>
        <View style={{ alignItems: "center" }}>
          <SMSVerifyCode
            containerPaddingHorizontal={30}
            verifyCodeLength={4}
            containerBackgroundColor={Colors.secondary}
            focusedCodeViewBorderColor="green"
          />
        </View>
        <Button
          rounded
          success
          onPress={() => navigation.navigate("SetPassword")}
          style={{ alignSelf: "center", marginVertical: hp("2%") }}
        >
          <Text style={{ fontSize: RFValue(15, 580) }}>VERIFY!</Text>
        </Button>
        <View style={{ alignSelf: "center", flexDirection: "row" }}>
          <Text>Didn't get code? </Text>
          <TouchableOpacity>
            <Text style={{ fontWeight: "bold", color: Colors.primary }}>
              RESEND
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default OTP;
