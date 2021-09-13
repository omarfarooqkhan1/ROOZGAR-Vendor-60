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
import { useSelector, useDispatch } from "react-redux";

const AddService = ({ navigation, route }) => {
  const vendor = useSelector((state) => state.newVendor);
  const { subCategory } = route.params;
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const addNewService = async () => {
    setIsLoading(true);
    fetch(`${baseURL}/addService/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vendorId: vendor._id,
        title: title,
        description: description,
        subCategoryId: subCategory._id,
        price: subCategory.price,
        image: subCategory.picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        dispatch({ type: "ADD_NEW_SERVICE", payload: data.service });
        Alert.alert("Success", "New service has been added successfully!");
        navigation.replace("TabNavigation");
      })
      .catch((e) => {
        Alert.alert("Error", e);
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
              ENTER SERVICE DETAILS
            </Text>
          </Col>
        </Grid>
      </LinearGradient>
      <View style={styles.centered}>
        <Text style={{ alignSelf: "flex-start" }}>Title</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Title"
            placeholderTextColor="#666666"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.textInput}
          />
        </View>
        <Text style={{ alignSelf: "flex-start" }}>Sub Category</Text>
        <View style={styles.action}>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            value={subCategory.title}
            style={styles.textInput}
          />
        </View>
        <Text style={{ alignSelf: "flex-start" }}>Description</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Description"
            placeholderTextColor="#666666"
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={addNewService}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="briefcase-plus" size={23} color="#fff" />
            <Text style={styles.panelButtonTitle}> Add New Service</Text>
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

export default AddService;
