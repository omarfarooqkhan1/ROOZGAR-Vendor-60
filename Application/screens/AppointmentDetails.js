import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  StatusBar,
} from "react-native";
import Colors from "../constants/Colors";
import { Title, Card } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AppointmentDetails = ({ navigation, route }) => {
  const { image, clientName } = route.params;

  const openDial = (phone) => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.statusbar} />
      <LinearGradient
        colors={["#00c13e", "#00c193"]}
        style={styles.linearGradient}
      >
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
              fontSize: RFValue(14, 580),
              fontWeight: "700",
              alignSelf: "center",
              marginVertical: hp("0.5%"),
            }}
          >
            APPOINTMENT DETAILS
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.root}>
        <Text style={styles.title}>Requested Service:</Text>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.image}
            source={require("../assets/images/wiring.jpg")}
          />
        </View>
        <View style={{ alignItems: "center", margin: 15 }}>
          <Title>Home or office external wiring</Title>
        </View>
        <Text style={styles.title}>Client Details:</Text>
        <View style={{ alignItems: "center" }}>
          <Image style={styles.image} source={image} />
        </View>
        <View style={{ alignItems: "center", margin: 15 }}>
          <Title>{clientName}</Title>
        </View>
        <Card
          style={styles.mycard}
          onPress={() => {
            Linking.openURL(`mailto:hamza_abbasi56@gmail.com`);
          }}
        >
          <View style={styles.cardContent}>
            <MaterialIcons name="email" size={32} color={Colors.primary} />
            <Text style={styles.mytext}>hamza_abbasi56@gmail.com</Text>
          </View>
        </Card>
        <Card style={styles.mycard} onPress={() => openDial("03040069010")}>
          <View style={styles.cardContent}>
            <Entypo name="phone" size={32} color={Colors.primary} />
            <Text style={styles.mytext}>+92-3040069010</Text>
          </View>
        </Card>
        <Card style={styles.mycard}>
          <View style={styles.cardContent}>
            <MaterialIcons
              name="location-pin"
              size={32}
              color={Colors.primary}
            />
            <Text style={styles.mytext}>Track Client's Location</Text>
          </View>
        </Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,
          }}
        ></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
  root: {
    flex: 1,
  },
  mycard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 8,
  },
  mytext: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },
  title: {
    fontSize: 26,
    color: Colors.primary,
    textAlign: "center",
    marginVertical: 7,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    marginTop: 1,
  },
  linearGradient: {
    width: "100%",
    height: hp("6%"),
    paddingVertical: "1%",
  },
});

export default AppointmentDetails;
