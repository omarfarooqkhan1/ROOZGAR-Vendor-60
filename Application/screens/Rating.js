import React, { useState, useCallback } from "react";
import { Rating, Avatar } from "react-native-elements";
import { Container, Text, Grid, Col, View } from "native-base";
import ProgressCircle from "react-native-progress-circle";
import { StyleSheet, FlatList, StatusBar } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";
const DATA = [
  {
    id: "1",
    title: "A****",
    letter: "A",
    color: "blue",
    Comment:
      "The vendor was on-time and solved my issue in no time. Fully recommended!",
  },
  {
    id: "2",
    title: "O****",
    letter: "O",
    color: "red",
    Comment:
      "Great service, wonderful and warm experience from start to finish. Appreciate John Doe taking time to go over the diagnosis clearly and quickly coming up with solution.",
  },
  {
    id: "3",
    title: "S****",
    letter: "S",
    color: "lightgreen",
    Comment:
      "I would have no qualms in recommending them to friendly and friends. Quite impressive technique and caliber of this mechanic.",
  },
];
function Reviews({ navigation }) {
  const [stu, setStu] = React.useState("no");
  const [stv, setStv] = React.useState("fb");
  const [stc, setStc] = React.useState("no");
  const [show, getShow] = useState(false);
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
    console.log(e.nativeEvent);
  }, []);

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
                color: "#fff",
                fontSize: RFValue(14, 580),
                fontWeight: "700",
                marginTop: hp("2%"),
              }}
            >
              RATING & REVIEWS
            </Text>
          </Col>
        </Grid>
      </LinearGradient>
      <View style={styles.RatingCard}>
        <ProgressCircle
          percent={90}
          radius={50}
          borderWidth={4}
          color="#f1c40f"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text style={{ fontSize: RFValue(35, 580), fontWeight: "bold" }}>
            {"4.4"}
          </Text>
        </ProgressCircle>
        <View
          style={{
            backgroundColor: "#fff2",
            height: hp("10%"),
            marginHorizontal: wp("2%"),
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Rating imageSize={20} readonly startingValue={4} />
          <Text
            style={{
              color: "grey",
              fontSize: RFValue(10, 580),
              fontWeight: "700",
              marginTop: hp("1%"),
            }}
          >
            {" "}
            54 Reviews{" "}
          </Text>
        </View>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.commentcard}>
              <View style={styles.commentinfocard}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View
                    style={{
                      marginHorizontal: wp("1%"),
                      backgroundColor: item.color,
                      height: hp("4%"),
                      width: hp("4%"),
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "flex-end",
                    }}
                  >
                    <Avatar
                      size="small"
                      rounded
                      title={item.letter}
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.5}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "black",
                        fontSize: RFValue(12, 580),
                        fontWeight: "700",
                        marginBottom: hp("0.3%"),
                      }}
                    >
                      {" "}
                      {item.title}{" "}
                    </Text>
                    <Text
                      style={{
                        color: "grey",
                        fontSize: RFValue(11, 680),
                        fontWeight: "700",
                      }}
                    >
                      {" "}
                      2 minutes ago{" "}
                    </Text>
                  </View>
                </View>
                <View style={{ marginRight: wp("4%") }}>
                  <Rating imageSize={14} readonly startingValue={4} />
                </View>
              </View>
              <View
                style={{ marginHorizontal: wp("2%"), marginVertical: hp("1%") }}
              >
                <Text
                  onTextLayout={onTextLayout}
                  numberOfLines={textShown ? undefined : 3}
                  style={{
                    color: "grey",
                    fontSize: RFValue(10, 580),
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  {item.Comment}{" "}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  commentinfocard: {
    backgroundColor: "#fff2",
    height: hp("6%"),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentcard: {
    marginVertical: hp("1%"),
    height: hp("15%"),
    backgroundColor: "#fff2",
    width: wp("90%"),
    alignSelf: "center",
    borderBottomColor: "lightgrey",
    borderWidth: 1,
    borderColor: "#fff2",
  },
  RatingCard: {
    height: hp("15%"),
    backgroundColor: "white",
    width: wp("100%"),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btn: {
    width: wp("75%"),
    height: hp("6.5%"),
    backgroundColor: "#02C2EA",
    borderRadius: 30,
    padding: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: wp("32%"),
    height: hp("15%"),
    marginHorizontal: wp("3%"),
    marginVertical: hp("2%"),
    borderWidth: 0.7,
    borderColor: "#02C2EA",
    borderRadius: 10,
    alignItems: "center",
  },
  bigcard: {
    marginTop: hp("12%"),
    backgroundColor: "white",
    width: wp("80%"),
    height: hp("40%"),
    marginHorizontal: wp("10%"),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  appoitmentscard: {
    borderColor: "lightgrey",
    borderWidth: 1,
  },
});

export default Reviews;
