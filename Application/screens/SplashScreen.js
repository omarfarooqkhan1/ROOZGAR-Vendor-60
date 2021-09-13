import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../constants/Colors";

const SplashScreen = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require("../assets/images/LOGO.jpg")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: "#fff",
            borderColor: "#000",
            borderRadius: 2,
            elevation: 20,
          },
        ]}
        animation="fadeInUpBig"
      >
        <Text
          style={[
            styles.title,
            {
              color: Colors.primary,
            },
          ]}
        >
          Sell your services online!
        </Text>
        <Text style={styles.text}>Become a ROOZGAR Vendor</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => props.navigation.replace("Login")}>
            <LinearGradient
              colors={[Colors.primary, "#01ab9d"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Let's Go!</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.4;
const width_logo = height * 0.35;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: width_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 32,
    fontWeight: "bold",
  },
  text: {
    marginTop: 5,
    fontSize: 18,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
