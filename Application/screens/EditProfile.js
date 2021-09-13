import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Grid, Col } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../constants/Colors";
import baseURL from "../constants/baseURL";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useDispatch } from "react-redux";

function MyProfileDetails({ navigation }) {
  const vendor = useSelector((state) => state.newVendor);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = React.useState(vendor.firstName);
  const [lastName, setLastName] = React.useState(vendor.lastName);
  const [phone, setPhone] = React.useState(vendor.phone);
  const [image, setImage] = React.useState(vendor.image);
  const [imageData, setImageData] = React.useState("");

  const dispatch = useDispatch();

  const updateProfile = async () => {
    if (
      vendor.firstName == firstName &&
      vendor.lastName == lastName &&
      vendor.phone == phone &&
      vendor.image == image
    ) {
      return;
    }
    if (!firstName) {
      return Alert.alert("Error", "Please enter your first name!");
    }
    if (!lastName) {
      return Alert.alert("Error", "Please enter your last name!");
    }
    if (!phone) {
      return Alert.alert("Error", "Please enter your mobile no.!");
    }
    setIsLoading(true);
    handleImageUpload(imageData);
    fetch(`${baseURL}/editVendorDetails/${vendor._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        image: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        dispatch({ type: "ADD_NEW_VENDOR", payload: data.vendor });
        Alert.alert("Success", data.success);
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

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[0]}`,
        };
        setImage(data.uri);
        setModalVisible(!modalVisible);
        setImageData(newfile);
      }
    } else {
      Alert.alert("Error", "You need to enable permission for Gallery Access!");
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[0]}`,
        };
        setImage(data.uri);
        setModalVisible(!modalVisible);
        setImageData(newfile);
      }
    } else {
      Alert.alert("Error", "You need to enable permission for Camera Access!");
    }
  };

  const handleImageUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "vendorApp");
    data.append("cloud_name", "omarfarooqkhan");
    fetch("https://api.cloudinary.com/v1_1/omarfarooqkhan/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.url);
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          "Looks like you aren't connected to the internet!"
        );
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={Colors.statusbar} />
      <View style={styles.container}>
        <LinearGradient
          colors={["#00c13e", "#00c193"]}
          style={styles.linearGradient}
        >
          <View style={{ width: wp("100%"), flexDirection: "row" }}>
            <View
              style={{
                width: wp("60%"),
                paddingHorizontal: wp(3),
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => navigation.pop()}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(13, 580),
                  fontWeight: "bold",
                  paddingHorizontal: wp(2),
                }}
              >
                BACK
              </Text>
            </View>
            <View
              style={{
                width: wp("40%"),
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: wp(2),
                }}
              >
                <Icon name="map-marker" size={22} color="#fff" />
                <Text
                  style={{
                    fontSize: RFValue(14, 580),
                    color: "#fff",
                    paddingLeft: 6,
                  }}
                >
                  Lahore
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <>
          <View style={styles.main}>
            <ScrollView>
              {/*Profile photo section*/}
              <View
                style={{
                  width: wp("100%"),
                  alignItems: "center",
                  marginTop: hp(2),
                }}
              >
                <View style={{ width: wp("90%"), flexDirection: "row" }}>
                  <View style={{ width: wp("32%") }}>
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: wp("30%"),
                        height: wp("30%"),
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: Colors.primary,
                      }}
                    ></Image>
                  </View>
                  <View style={{ width: wp("58%"), justifyContent: "center" }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: Colors.primary,
                          paddingTop: 2,
                          fontWeight: "bold",
                        }}
                      >
                        Change Photo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/*Name input section*/}
              <View
                style={{
                  width: wp("100%"),
                  alignItems: "center",
                  marginTop: hp(2),
                }}
              >
                <View style={{ width: wp("92%") }}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: "#001837",
                      fontWeight: "bold",
                    }}
                  >
                    FIRST NAME
                  </Text>
                </View>
                <View
                  style={{
                    width: wp("93%"),
                    borderWidth: 1,
                    borderColor: "#92A1BC",
                    borderRadius: 4,
                    marginTop: hp(1),
                  }}
                >
                  <TextInput
                    style={styles.textArea}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First Name Here"
                    placeholderTextColor="grey"
                  />
                </View>
              </View>

              <View
                style={{
                  width: wp("100%"),
                  alignItems: "center",
                  marginTop: hp(2),
                }}
              >
                <View style={{ width: wp("92%") }}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: "#001837",
                      fontWeight: "bold",
                    }}
                  >
                    LAST NAME
                  </Text>
                </View>
                <View
                  style={{
                    width: wp("93%"),
                    borderWidth: 1,
                    borderColor: "#92A1BC",
                    borderRadius: 4,
                    marginTop: hp(1),
                  }}
                >
                  <TextInput
                    style={styles.textArea}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last Name Here"
                    placeholderTextColor="grey"
                  />
                </View>
              </View>

              {/*Phone input section*/}
              <View
                style={{
                  width: wp("100%"),
                  alignItems: "center",
                  marginTop: hp(2),
                }}
              >
                <View style={{ width: wp("92%") }}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: "#001837",
                      fontWeight: "bold",
                    }}
                  >
                    MOBILE NO.
                  </Text>
                </View>
                <View
                  style={{
                    width: wp("93%"),
                    borderWidth: 1,
                    borderColor: "#92A1BC",
                    borderRadius: 4,
                    marginTop: hp(1),
                  }}
                >
                  <TextInput
                    style={styles.textArea}
                    value={phone}
                    onChangeText={setPhone}
                    maxLength={11}
                    placeholder="Mobile No. Here"
                    placeholderTextColor="grey"
                  />
                </View>
              </View>
              {/*City rect*/}
              <View
                style={{
                  width: wp("100%"),
                  marginTop: hp(2),
                  alignItems: "center",
                }}
              ></View>
              <Grid style={{ marginTop: hp(2) }}>
                <Col style={{ paddingHorizontal: wp(4) }}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    LOCATION
                  </Text>
                </Col>
              </Grid>
              {/*Module*/}
              <Grid style={{ marginTop: hp("0.5%") }}>
                <Col style={{ alignItems: "center" }}>
                  {/*Location*/}
                  <View
                    style={{
                      width: wp("100%"),
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: wp("90%"),
                        alignItems: "center",
                        borderColor: "lightgrey",
                      }}
                    >
                      <View
                        style={{
                          width: wp("92%"),
                          flexDirection: "row",
                          borderWidth: 1,
                          backgroundColor: "#eee",
                          borderRadius: 4,
                          paddingVertical: hp(2),
                          borderColor: "grey",
                        }}
                      >
                        <View
                          style={{ width: "80%", justifyContent: "center" }}
                        >
                          <Text
                            style={{
                              fontSize: RFValue(11, 580),
                              paddingHorizontal: wp(2),
                              color: "grey",
                              bottom: hp(0.2),
                            }}
                          >
                            <Icon name="map-marker" size={18} color="grey" />{" "}
                            Street 3, Faisal Town...
                          </Text>
                        </View>
                        <View style={{ width: "20%", alignItems: "center" }}>
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontSize: RFValue(11, 580),
                                paddingHorizontal: wp(2),
                                color: Colors.primary,
                                textDecorationLine: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              Change
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Col>
              </Grid>
            </ScrollView>
          </View>
        </>
        <View
          style={{
            width: wp("100%"),
            height: hp("10%"),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            marginTop: 50,
            elevation: 20,
          }}
        >
          <TouchableOpacity onPress={updateProfile}>
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
                Update
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.panel}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>
              Choose Your Profile Picture
            </Text>
          </View>
          <TouchableOpacity style={styles.panelButton} onPress={pickFromCamera}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={pickFromGallery}
          >
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: {
    width: wp("100%"),
    alignItems: "center",
    backgroundColor: "#fff",
  },
  linearGradient: {
    height: "7%",
    width: "100%",
    paddingTop: "4%",
    backgroundColor: "#1D75D3",
  },
  searchBtn: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 4,
    flexDirection: "row",
  },

  mapStyle: {
    width: "100%",
    height: "100%",
  },
  textArea: {
    width: "100%",
    height: hp(7),
    paddingLeft: wp(2),
    fontSize: RFValue(11, 580),
    justifyContent: "flex-start",
    color: "#000",
  },
  panel: {
    padding: 30,
    backgroundColor: "#FFFFFF",
    marginTop: 450,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  panelTitle: {
    fontSize: 27,
    fontWeight: "bold",
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: "center",
    marginVertical: 7,
    height: 50,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
});

export default MyProfileDetails;
