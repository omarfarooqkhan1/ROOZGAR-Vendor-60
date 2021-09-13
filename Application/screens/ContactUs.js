import React from "react";
import { Container, Text, Grid, Col, View, Content } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";

function ContactUs({ navigation }) {
  return (
    <Container>
      <StatusBar backgroundColor="#00c13e" />
      <LinearGradient
        colors={["#00c13e", "#00c193"]}
        style={{ height: hp("7%") }}
      >
        <Grid>
          <Col style={{ width: "12%", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Icon2
                name="arrow-left"
                size={25}
                color="#fff"
                style={{
                  marginTop: hp("2%"),
                }}
              />
            </TouchableOpacity>
          </Col>
          <Col style={{ width: "78%", alignItems: "center" }}>
            <Text
              style={{
                marginTop: hp("2%"),
                fontSize: RFValue(15, 580),
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              CONTACT US
            </Text>
          </Col>
        </Grid>
      </LinearGradient>
      <Content>
        <View
          style={{
            width: wp("100%"),
            alignItems: "center",
          }}
        >
          <Grid style={{ marginTop: "60%" }}>
            <Col style={{ width: "100%", alignItems: "center" }}>
              <TouchableOpacity>
                <View style={styles.btn}>
                  <View
                    flexDirection="row"
                    style={{
                      marginLeft: wp("2%"),
                      marginRight: wp("5%"),
                    }}
                  >
                    <View width="10%">
                      <Icon
                        name="phone"
                        size={25}
                        color="#fff"
                        style={{ alignSelf: "flex-start" }}
                      />
                    </View>
                    <View width="90%">
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: RFValue(14, 580),
                          alignSelf: "center",
                        }}
                      >
                        Make a call
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
          </Grid>

          <Grid style={{ marginVertical: hp("5%") }}>
            <Col style={{ alignItems: "center", width: "100%" }}>
              <Text
                style={{
                  color: "darkgrey",
                  fontWeight: "bold",
                  fontSize: RFValue(13, 580),
                  letterSpacing: 0.3,
                }}
              >
                OR
              </Text>
            </Col>
          </Grid>

          <Grid>
            <Col style={{ width: "100%", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SendMessage");
                }}
              >
                <View style={styles.btn}>
                  <View
                    flexDirection="row"
                    style={{
                      marginLeft: wp("2%"),
                      marginRight: wp("5%"),
                    }}
                  >
                    <View width="10%">
                      <Icon
                        name="mail"
                        size={25}
                        color="#fff"
                        style={{ alignSelf: "flex-start" }}
                      />
                    </View>
                    <View width="90%">
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: RFValue(14, 580),
                          alignSelf: "center",
                        }}
                      >
                        Send us a message
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textArea: {
    width: "100%",
    fontSize: RFValue(12, 580),
    justifyContent: "flex-start",
    borderColor: "black",
    color: "#000",
  },
  btn: {
    width: wp("75%"),
    height: hp("7%"),
    backgroundColor: Colors.primary,
    borderRadius: 30,
    padding: 9,
    justifyContent: "center",
  },
});

export default ContactUs;
