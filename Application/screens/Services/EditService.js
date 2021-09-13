import React, { useState, useEffect } from "react";
import { Text, Grid, Col, View, Container } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../constants/Colors";
import baseURL from "../../constants/baseURL";
import { useDispatch } from "react-redux";

const EdiService = ({ navigation, route }) => {
  const { service } = route.params;
  const [title, setTitle] = useState(service.title);
  const [price, setPrice] = useState(`${service.price}`);
  const [description, setDescription] = useState(service.description);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const editService = async () => {
    if (
      service.title == title &&
      service.price == price &&
      service.description == description
    ) {
      return;
    }
    setIsLoading(true);
    fetch(`${baseURL}/editService/${service._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        dispatch({ type: "DELETE_SERVICE", payload: data.service._id });
        dispatch({ type: "ADD_NEW_SERVICE", payload: data.service });
        Alert.alert("Success", "Service edited successfully!");
        navigation.pop();
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
      <>
        <StatusBar backgroundColor={Colors.statusbar} />
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </>
    );
  }

  return (
    <Container style={{ backgroundColor: Colors.secondary }}>
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
              EDIT SERVICE
            </Text>
          </Col>
        </Grid>
      </LinearGradient>
      <View style={styles.centered}>
        <Text style={{ alignSelf: "flex-start" }}>Title</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Title Here"
            placeholderTextColor="#666666"
            value={title}
            onChangeText={setTitle}
            style={styles.textInput}
          />
        </View>
        <Text style={{ alignSelf: "flex-start" }}>Price</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Price Here"
            placeholderTextColor="#666666"
            value={price}
            onChangeText={setPrice}
            style={styles.textInput}
          />
        </View>
        <Text style={{ alignSelf: "flex-start" }}>Description</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Description Here"
            placeholderTextColor="#666666"
            value={description}
            onChangeText={setDescription}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={editService}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="briefcase-plus" size={23} color="#fff" />
            <Text style={styles.panelButtonTitle}> Update Service</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    padding: 10,
    justifyContent: "space-between",
    marginTop: hp("20%"),
    alignItems: "center",
    width: wp("80%"),
    height: hp("50%"),
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "lightgrey",
    borderWidth: 2,
  },
  commandButton: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: "center",
    marginTop: 20,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
});

export default EdiService;
