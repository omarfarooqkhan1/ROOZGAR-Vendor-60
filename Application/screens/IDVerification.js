import React from "react";
import {
  Body,
  Title,
  Icon as NBIcon,
  Text,
  StatusBar,
  View,
  H1,
  FlatList,
  Fab,
} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../constants/Colors";
import { TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";

const SelectCategory = ({ navigation }) => {
  const dispatch = useDispatch();
  class Step {
    constructor(title, icon, description, navigateTo) {
      this.title = title;
      this.icon = icon;
      this.description = description;
      this.navigateTo = navigateTo;
    }
  }

  const steps = [
    new Step(
      "Terms and Conditions",
      "fact-check",
      `Accept our company's terms and conditions`,
      "TermsAndConditions"
    ),
    new Step(
      "Profile Picture",
      "camera-front",
      "Your recent portrait photo",
      "ProfilePicture"
    ),
    new Step(
      "CNIC Front-side",
      "contact-mail",
      "Clear photo of CNIC",
      "CNICFront"
    ),
    new Step(
      "CNIC Back-side",
      "quick-contacts-mail",
      "Clear photo of CNIC",
      "CNICBack"
    ),
  ];

  return (
    <View height={"100%"} bg={Colors.secondary}>
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
        }}
      >
        <H1 style={{ textAlign: "center", marginVertical: hp("2%") }}>
          Welcome, John Doe
        </H1>
        <Text
          style={{
            textAlign: "center",
            fontSize: RFValue(15, 580),
            color: "grey",
          }}
        >
          Please complete the following steps to complete your registration:
        </Text>
      </View>
      <FlatList
        style={{
          marginVertical: "10%",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
        }}
        data={steps}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate(item.navigateTo);
            }}
          >
            <View
              style={{
                borderWidth: 1,
                backgroundColor: Colors.secondary,
                padding: "3%",
                marginVertical: "2%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{ alignItems: "space-between", flexDirection: "row" }}
              >
                <Icon name={item.icon} size={22} color="white" />

                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: "white" }}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <Icon name="chevron-right" size={22} color="white" />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(category) => category.icon}
      />
      <Fab
        placement="bottom-right"
        colorScheme="green"
        size="lg"
        renderInPortal={false}
        icon={
          <NBIcon
            as={<Icon name={"playlist-add-check"} />}
            size="md"
            color="white"
          />
        }
        onPress={() => {
          Alert.alert(
            "Registration Completed!",
            "Now wait for account verification."
          );
          navigation.replace("Login");
        }}
      />
    </View>
  );
};

export default SelectCategory;
