import React, { useState } from "react";
import { Container, Text, Input, Grid, Col, View, Content } from "native-base";
import Icon2 from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";

function SendMessage({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [icon, setIcon] = useState("phone");
  return (
    <Container>
      <StatusBar backgroundColor={Colors.statusbar} />
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
      <ScrollView>
        <Content>
          <Grid>
            <Col>
              <Grid style={{ marginTop: hp("3%") }}>
                <Col style={{ paddingHorizontal: wp(3.4) }}>
                  <Text
                    style={{
                      fontSize: RFValue(11, 580),
                      color: "#000",
                      fontWeight: "bold",
                      marginLeft: wp("2%"),
                    }}
                  >
                    NAME
                  </Text>
                </Col>
              </Grid>
              <Grid style={{ marginTop: "2%" }}>
                <Col style={{ width: "100%", alignItems: "center" }}>
                  <View
                    style={{
                      borderWidth: 1,
                      paddingBottom: 12,
                      borderRadius: 4,
                      height: 50,
                      justifyContent: "center",
                      width: "90%",
                      flexDirection: "row",
                      paddingLeft: 5,
                      borderColor: "grey",
                    }}
                  >
                    <Input
                      style={{ color: "grey", marginLeft: wp("3%") }}
                      placeholder="Enter your name"
                      placeholderTextColor="grey"
                    />
                  </View>
                </Col>
              </Grid>
              <Grid style={{ marginTop: hp("3%") }}>
                <Col style={{ paddingHorizontal: wp(3.4) }}>
                  <Text
                    style={{
                      fontSize: RFValue(11, 580),
                      color: "#000",
                      fontWeight: "bold",
                      marginLeft: wp("2%"),
                    }}
                  >
                    MOBILE NO.
                  </Text>
                </Col>
              </Grid>
              <Grid style={{ marginTop: "2%" }}>
                <Col style={{ width: "100%", alignItems: "center" }}>
                  <View
                    style={{
                      borderWidth: 1,
                      paddingBottom: 12,
                      borderRadius: 4,
                      height: 50,
                      justifyContent: "center",
                      width: "90%",
                      flexDirection: "row",
                      paddingLeft: 5,
                      borderColor: "grey",
                    }}
                  >
                    <Input
                      style={{ color: "grey", marginLeft: wp("3%") }}
                      placeholder="Enter your mobile number"
                      placeholderTextColor="grey"
                    />
                  </View>
                </Col>
              </Grid>
              <Grid style={{ marginTop: hp("3%") }}>
                <Col style={{ paddingHorizontal: wp(3.4) }}>
                  <Text
                    style={{
                      fontSize: RFValue(11, 580),
                      color: "#000",
                      fontWeight: "bold",
                      marginLeft: wp("2%"),
                    }}
                  >
                    SUBJECT
                  </Text>
                </Col>
              </Grid>
              <Grid style={{ marginTop: "2%" }}>
                <Col style={{ width: "100%", alignItems: "center" }}>
                  <View
                    style={{
                      borderWidth: 1,
                      paddingBottom: 12,
                      borderRadius: 4,
                      height: 50,
                      justifyContent: "center",
                      width: "90%",
                      flexDirection: "row",
                      paddingLeft: 5,
                      borderColor: "grey",
                    }}
                  >
                    <Input
                      style={{ color: "grey", marginLeft: wp("3%") }}
                      placeholder="Subject of your query"
                      placeholderTextColor="grey"
                    />
                  </View>
                </Col>
              </Grid>
              <Grid style={{ marginTop: hp("3%") }}>
                <Col style={{ paddingHorizontal: wp(3.4) }}>
                  <Text
                    style={{
                      fontSize: RFValue(11, 580),
                      color: "#000",
                      fontWeight: "bold",
                      marginLeft: wp("2%"),
                    }}
                  >
                    MESSAGE
                  </Text>
                </Col>
              </Grid>
              <Grid style={{ marginTop: hp("1.5%") }}>
                <Col
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View style={styles.nametype}>
                    <TextInput
                      style={styles.textAreaBox}
                      placeholder="Enter your message"
                      placeholderTextColor="grey"
                      numberOfLines={8}
                    />
                  </View>
                </Col>
              </Grid>
            </Col>
          </Grid>
        </Content>
      </ScrollView>
      <View
        style={{
          width: wp("100%"),
          height: hp("10%"),
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          marginBottom: 0,
          bottom: 0,
          position: "absolute",
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <View
            style={{
              width: wp("90%"),
              alignItems: "center",
              paddingVertical: hp(1.5),
              borderRadius: 4,
              backgroundColor: Colors.primary,
            }}
          >
            <Text
              style={{
                fontSize: RFValue(12, 580),
                paddingHorizontal: wp(3),
                color: "#fff",
              }}
            >
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setIcon("phone");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <LinearGradient
            colors={["#00c13e", "#00c193"]}
            style={{ borderRadius: 15 }}
          >
            <View style={styles.modalView}>
              <View
                style={{
                  alignSelf: "flex-end",
                  top: hp("1%"),
                  right: wp("2%"),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIcon("phone");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Ionicons size={25} color="#fff" name="md-close-circle" />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  size={60}
                  color="#fff"
                  name="check-bold"
                  style={{
                    backgroundColor: "#14D4AD",
                    borderRadius: 50,
                    paddingTop: 8,
                    paddingLeft: 8,
                    borderWidth: 3,
                    borderColor: "#fff",
                  }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#fff",
                    marginVertical: 10,
                  }}
                >
                  MESSAGE SENT
                </Text>
                <Text
                  style={{
                    padding: 40,
                    backgroundColor: "#FFF",
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    textAlign: "center",
                  }}
                >
                  We have received your enquiry and{"\n"}will respond you with
                  in 24 hrs.
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    borderWidth: 4,
  },
  rect1: {
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
    backgroundColor: "#1D75D3",
  },
  nametype: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    flexDirection: "row",
  },
  textArea1: {
    width: "100%",
    height: 40,
    fontSize: RFValue(13, 580),
    justifyContent: "flex-start",
    borderColor: "lightgrey",
    color: "#000",
  },
  textAreaBox: {
    width: "100%",
    paddingHorizontal: 10,
    fontSize: RFValue(13, 580),
    justifyContent: "flex-start",
    borderColor: "lightgrey",
    color: "#000",
    textAlignVertical: "top",
    marginLeft: wp("3%"),
  },
  centeredView: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E2432",
    opacity: 0.9,
  },
  modalView: {
    alignItems: "center",
  },
});

export default SendMessage;
