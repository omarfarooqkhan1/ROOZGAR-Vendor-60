import React from "react";
import {
  Container,
  Text,
  Input,
  Left,
  Grid,
  Col,
  View,
  Right,
  Content,
} from "native-base";
import Colors from "../constants/Colors";
import Feather from "react-native-vector-icons/Feather";
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";

function SetPassword({ navigation }) {
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.newVendor);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordIcon, setPasswordIcon] = React.useState("eye");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = React.useState("eye");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const togglePassword = (state) => {
    setShowPassword(state);
    if (state) {
      setPasswordIcon("eye-off");
    } else {
      setPasswordIcon("eye");
    }
  };

  const toggleConfirmPassword = (state) => {
    setShowConfirmPassword(state);
    if (state) {
      setConfirmPasswordIcon("eye-off");
    } else {
      setConfirmPasswordIcon("eye");
    }
  };

  return (
    <Container>
      <StatusBar backgroundColor={Colors.statusbar} />
      <LinearGradient
        colors={["#00c13e", "#00c193"]}
        style={{ height: hp("7%") }}
      >
        <Grid>
          <Col style={{ width: "100%", alignItems: "center" }}>
            <Text
              style={{
                marginTop: hp("2%"),
                fontSize: RFValue(13, 580),
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              SET PASSWORD
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
                    PASSWORD
                  </Text>
                </Col>
              </Grid>
              <Grid style={{ marginTop: "2%" }}>
                <Col style={{ width: "100%", alignItems: "center" }}>
                  <View
                    style={{
                      borderWidth: 1,
                      paddingBottom: 10,
                      borderRadius: 4,
                      height: 50,
                      justifyContent: "center",
                      width: "90%",
                      flexDirection: "row",
                      paddingLeft: 5,
                      borderColor: "grey",
                    }}
                  >
                    <Left style={{ top: 10 }}>
                      <Input
                        style={{
                          color: "grey",
                          marginLeft: wp("3%"),
                        }}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        placeholder="Enter password"
                        placeholderTextColor="grey"
                      />
                    </Left>
                    <Right style={{ top: 5 }}>
                      <TouchableOpacity
                        onPress={() => togglePassword(!showPassword)}
                      >
                        <Feather
                          name={passwordIcon}
                          size={20}
                          color="lightgrey"
                          style={{
                            paddingHorizontal: 10,
                            top: 2,
                          }}
                        />
                      </TouchableOpacity>
                    </Right>
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
                    CONFIRM PASSWORD
                  </Text>
                </Col>
              </Grid>
              <Grid style={{ marginTop: "2%" }}>
                <Col style={{ width: "100%", alignItems: "center" }}>
                  <View
                    style={{
                      borderWidth: 1,
                      paddingBottom: 10,
                      borderRadius: 4,
                      height: 50,
                      justifyContent: "center",
                      width: "90%",
                      flexDirection: "row",
                      paddingLeft: 5,
                      borderColor: "grey",
                    }}
                  >
                    <Left style={{ top: 8 }}>
                      <Input
                        style={{ color: "grey", marginLeft: wp("3%") }}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        placeholder="Re-enter password"
                        placeholderTextColor="grey"
                      />
                    </Left>
                    <Right style={{ top: 5 }}>
                      <TouchableOpacity
                        onPress={() =>
                          toggleConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <Feather
                          name={confirmPasswordIcon}
                          size={20}
                          color="lightgrey"
                          style={{
                            paddingHorizontal: 10,
                            top: 2,
                          }}
                        />
                      </TouchableOpacity>
                    </Right>
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
        <TouchableOpacity
          onPress={() => {
            if (!password || !confirmPassword) {
              return Alert.alert("Error", "Please enter both fields!");
            }
            if (password.localeCompare(confirmPassword) === 0) {
              vendor.password = password;
              dispatch({ type: "ADD_NEW_VENDOR", payload: vendor });
              navigation.navigate("SelectCategory");
            } else {
              Alert.alert("Error", "Entered passwords don't match!");
            }
          }}
        >
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
              Save
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
});

export default SetPassword;
