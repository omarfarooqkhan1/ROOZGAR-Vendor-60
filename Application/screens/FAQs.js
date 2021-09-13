import React from "react";
import { Container, Text, Left, Grid, Col, View, Content } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";

function FAQs({ navigation }) {
  const [first, setFirst] = React.useState(true);
  const [second, setSecond] = React.useState(false);
  const [third, setThird] = React.useState(false);
  const [fourth, setFourth] = React.useState(false);
  const [fifth, setFifth] = React.useState(false);
  const [sixth, setSixth] = React.useState(false);

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
              <Icon
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
              FAQs
            </Text>
          </Col>
        </Grid>
      </LinearGradient>
      <ScrollView>
        <Content>
          <Grid>
            <Col>
              <View style={{ width: wp("100%"), alignItems: "center" }}></View>
            </Col>
          </Grid>
          {/*FAQs*/}
          <Grid>
            <Col style={{ alignItems: "center" }}>
              {/* start*/}
              {first == true ? (
                <View
                  style={{
                    width: wp("100%"),
                    backgroundColor: Colors.secondary,
                    paddingBottom: hp(2),
                    borderBottomWidth: 1,
                    borderColor: "#ECECEC",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setFirst(!first);
                    }}
                  >
                    <View
                      style={{
                        width: wp("95%"),
                        paddingVertical: hp(2),
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{ width: wp("80%"), justifyContent: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(14, 580),
                            color: "#001837",
                            fontWeight: "bold",
                          }}
                        >
                          What is ROOZGAR?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp("15%"),
                          alignItems: "flex-end",
                          paddingHorizontal: wp(1),
                        }}
                      >
                        <Ionicons
                          name="chevron-up-outline"
                          size={wp(5)}
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/*Content*/}
                  <View style={{ width: wp("95%") }}>
                    <Text
                      style={{
                        fontSize: RFValue(13, 580),
                        color: "grey",
                        textAlign: "justify",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc quis enim et felis pulvinar malesuada. Nulla erat
                      lacus, tempor eu viverra nec, finibus at dui. In justo
                      dui, semper nec quam sit amet, semper pellentesque eros.
                      Aliquam venenatis ante orci, ut interdum justo faucibus
                      non. Vestibulum tincidunt erat sit amet.
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: wp("100%"),

                    borderBottomWidth: 1,
                    borderColor: "#ECECEC",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setFirst(!first);
                    }}
                  >
                    <View
                      style={{
                        width: wp("95%"),
                        paddingVertical: hp(2.5),
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{ width: wp("80%"), justifyContent: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(14, 580),
                            color: "#001837",
                            fontWeight: "bold",
                          }}
                        >
                          What is ROOZGAR?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp("15%"),
                          alignItems: "flex-end",
                          paddingHorizontal: wp(1),
                        }}
                      >
                        <Ionicons
                          name="chevron-down-outline"
                          size={wp(5)}
                          color="#92A1BC"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {/*End*/}
              {/* start*/}
              {second == true ? (
                <View
                  style={{
                    width: wp("100%"),
                    backgroundColor: Colors.secondary,
                    paddingBottom: hp(2),
                    borderBottomWidth: 1,
                    borderColor: "#ECECEC",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setSecond(!second);
                    }}
                  >
                    <View
                      style={{
                        width: wp("95%"),
                        paddingVertical: hp(2),
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{ width: wp("80%"), justifyContent: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(14, 580),
                            color: "#001837",
                            fontWeight: "bold",
                          }}
                        >
                          Aliquam id nibh sed orci?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp("15%"),
                          alignItems: "flex-end",
                          paddingHorizontal: wp(1),
                        }}
                      >
                        <Ionicons
                          name="chevron-up-outline"
                          size={wp(5)}
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/*Content*/}
                  <View style={{ width: wp("95%") }}>
                    <Text
                      style={{
                        fontSize: RFValue(11, 580),
                        color: "#001837",
                        textAlign: "justify",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc quis enim et felis pulvinar malesuada. Nulla erat
                      lacus, tempor eu viverra nec, finibus at dui. In justo
                      dui, semper nec quam sit amet, semper pellentesque eros.
                      Aliquam venenatis ante orci, ut interdum justo faucibus
                      non. Vestibulum tincidunt erat sit amet.
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: wp("100%"),

                    borderBottomWidth: 1,
                    borderColor: "#ECECEC",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setSecond(!second);
                    }}
                  >
                    <View
                      style={{
                        width: wp("95%"),
                        paddingVertical: hp(2.5),
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{ width: wp("80%"), justifyContent: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(14, 580),
                            color: "#001837",
                            fontWeight: "bold",
                          }}
                        >
                          Aliquam id nibh sed orci?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp("15%"),
                          alignItems: "flex-end",
                          paddingHorizontal: wp(1),
                        }}
                      >
                        <Ionicons
                          name="chevron-down-outline"
                          size={wp(5)}
                          color="#92A1BC"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {/*End*/}
              {/* start*/}
              {third == true ? (
                <View
                  style={{
                    width: wp("100%"),
                    backgroundColor: Colors.secondary,
                    paddingBottom: hp(2),
                    borderBottomWidth: 1,
                    borderColor: "#ECECEC",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setThird(!third);
                    }}
                  >
                    <View
                      style={{
                        width: wp("95%"),
                        paddingVertical: hp(2),
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{ width: wp("80%"), justifyContent: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(14, 580),
                            color: "#001837",
                            fontWeight: "bold",
                          }}
                        >
                          Imperdiet diam id tortor luct ?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp("15%"),
                          alignItems: "flex-end",
                          paddingHorizontal: wp(1),
                        }}
                      >
                        <Ionicons
                          name="chevron-up-outline"
                          size={wp(5)}
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/*Content*/}
                  <View style={{ width: wp("95%") }}>
                    <Text
                      style={{
                        fontSize: RFValue(11, 580),
                        color: "#001837",
                        textAlign: "justify",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc quis enim et felis pulvinar malesuada. Nulla erat
                      lacus, tempor eu viverra nec, finibus at dui. In justo
                      dui, semper nec quam sit amet, semper pellentesque eros.
                      Aliquam venenatis ante orci, ut interdum justo faucibus
                      non. Vestibulum tincidunt erat sit amet.
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: wp("100%"),

                    borderBottomWidth: 1,
                    borderColor: "#ECECEC",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setThird(!third);
                    }}
                  >
                    <View
                      style={{
                        width: wp("95%"),
                        paddingVertical: hp(2.5),
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{ width: wp("80%"), justifyContent: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(14, 580),
                            color: "#001837",
                            fontWeight: "bold",
                          }}
                        >
                          Imperdiet diam id tortor luct ?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp("15%"),
                          alignItems: "flex-end",
                          paddingHorizontal: wp(1),
                        }}
                      >
                        <Ionicons
                          name="chevron-down-outline"
                          size={wp(5)}
                          color="#92A1BC"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {/*End*/}
              {/* start*/}
              {fourth == true ? (
                <View
                  style={{
                    width: wp("100%"),
                    backgroundColor: Colors.secondary,
                    paddingBottom: hp(2),
                    borderBottomWidth: 1,
                    borderColor: "#ECECEC",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setFourth(!fourth);
                    }}
                  >
                    <View
                      style={{
                        width: wp("95%"),
                        paddingVertical: hp(2),
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{ width: wp("80%"), justifyContent: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(14, 580),
                            color: "#001837",
                            fontWeight: "bold",
                          }}
                        >
                          Nulla facilisis nisi vitae risus auctor?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp("15%"),
                          alignItems: "flex-end",
                          paddingHorizontal: wp(1),
                        }}
                      >
                        <Ionicons
                          name="chevron-up-outline"
                          size={wp(5)}
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/*Content*/}
                  <View style={{ width: wp("95%") }}>
                    <Text
                      style={{
                        fontSize: RFValue(11, 580),
                        color: "#001837",
                        textAlign: "justify",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc quis enim et felis pulvinar malesuada. Nulla erat
                      lacus, tempor eu viverra nec, finibus at dui. In justo
                      dui, semper nec quam sit amet, semper pellentesque eros.
                      Aliquam venenatis ante orci, ut interdum justo faucibus
                      non. Vestibulum tincidunt erat sit amet.
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: wp("100%"),

                    borderBottomWidth: 1,
                    borderColor: "#ECECEC",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setFourth(!fourth);
                    }}
                  >
                    <View
                      style={{
                        width: wp("95%"),
                        paddingVertical: hp(2.5),
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{ width: wp("80%"), justifyContent: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(14, 580),
                            color: "#001837",
                            fontWeight: "bold",
                          }}
                        >
                          Nulla facilisis nisi vitae risus auctor?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp("15%"),
                          alignItems: "flex-end",
                          paddingHorizontal: wp(1),
                        }}
                      >
                        <Ionicons
                          name="chevron-down-outline"
                          size={wp(5)}
                          color="#92A1BC"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {/*End*/}
              {/* start*/}
              {fifth == true ? (
                <View
                  style={{
                    width: wp("100%"),
                    backgroundColor: Colors.secondary,
                    paddingBottom: hp(2),
                    borderBottomWidth: 1,
                    borderColor: "#ECECEC",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setFifth(!fifth);
                    }}
                  >
                    <View
                      style={{
                        width: wp("95%"),
                        paddingVertical: hp(2),
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{ width: wp("80%"), justifyContent: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(14, 580),
                            color: "#001837",
                            fontWeight: "bold",
                          }}
                        >
                          Sed dictum tellus non efficitur?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp("15%"),
                          alignItems: "flex-end",
                          paddingHorizontal: wp(1),
                        }}
                      >
                        <Ionicons
                          name="chevron-up-outline"
                          size={wp(5)}
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/*Content*/}
                  <View style={{ width: wp("95%") }}>
                    <Text
                      style={{
                        fontSize: RFValue(11, 580),
                        color: "#001837",
                        textAlign: "justify",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc quis enim et felis pulvinar malesuada. Nulla erat
                      lacus, tempor eu viverra nec, finibus at dui. In justo
                      dui, semper nec quam sit amet, semper pellentesque eros.
                      Aliquam venenatis ante orci, ut interdum justo faucibus
                      non. Vestibulum tincidunt erat sit amet.
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: wp("100%"),

                    borderBottomWidth: 1,
                    borderColor: "#ECECEC",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setFifth(!fifth);
                    }}
                  >
                    <View
                      style={{
                        width: wp("95%"),
                        paddingVertical: hp(2.5),
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{ width: wp("80%"), justifyContent: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(14, 580),
                            color: "#001837",
                            fontWeight: "bold",
                          }}
                        >
                          Sed dictum tellus non efficitur?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp("15%"),
                          alignItems: "flex-end",
                          paddingHorizontal: wp(1),
                        }}
                      >
                        <Ionicons
                          name="chevron-down-outline"
                          size={wp(5)}
                          color="#92A1BC"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {/*End*/}
              {/* start*/}
              {sixth == true ? (
                <View
                  style={{
                    width: wp("100%"),
                    backgroundColor: Colors.secondary,
                    paddingBottom: hp(2),
                    borderBottomWidth: 1,
                    borderColor: "#ECECEC",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setSixth(!sixth);
                    }}
                  >
                    <View
                      style={{
                        width: wp("95%"),
                        paddingVertical: hp(2),
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{ width: wp("80%"), justifyContent: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(14, 580),
                            color: "#001837",
                            fontWeight: "bold",
                          }}
                        >
                          Maecenas ultrices mauris in ves?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp("15%"),
                          alignItems: "flex-end",
                          paddingHorizontal: wp(1),
                        }}
                      >
                        <Ionicons
                          name="chevron-up-outline"
                          size={wp(5)}
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/*Content*/}
                  <View style={{ width: wp("95%") }}>
                    <Text
                      style={{
                        fontSize: RFValue(11, 580),
                        color: "#001837",
                        textAlign: "justify",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc quis enim et felis pulvinar malesuada. Nulla erat
                      lacus, tempor eu viverra nec, finibus at dui. In justo
                      dui, semper nec quam sit amet, semper pellentesque eros.
                      Aliquam venenatis ante orci, ut interdum justo faucibus
                      non. Vestibulum tincidunt erat sit amet.
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: wp("100%"),

                    borderBottomWidth: 1,
                    borderColor: "#ECECEC",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setSixth(!sixth);
                    }}
                  >
                    <View
                      style={{
                        width: wp("95%"),
                        paddingVertical: hp(2.5),
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{ width: wp("80%"), justifyContent: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(14, 580),
                            color: "#001837",
                            fontWeight: "bold",
                          }}
                        >
                          Maecenas ultrices mauris in ves?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp("15%"),
                          alignItems: "flex-end",
                          paddingHorizontal: wp(1),
                        }}
                      >
                        <Ionicons
                          name="chevron-down-outline"
                          size={wp(5)}
                          color="#92A1BC"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {/*End*/}
            </Col>
          </Grid>
        </Content>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  linearGradient: {
    width: "100%",
    paddingTop: "4%",
    paddingBottom: "5%",
    backgroundColor: "#1D75D3",
  },
  textArea: {
    width: "100%",
    fontSize: RFValue(12, 580),
    justifyContent: "flex-start",
    borderColor: "black",
    color: "#000",
  },
});

export default FAQs;
