import React from "react";
import { Text, View, Button, Title, Body, Header, H1 } from "native-base";
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const CNICFront = ({ navigation }) => {
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.newVendor);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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
        setModalVisible(!modalVisible);
        handleUpload(newfile);
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
        setModalVisible(!modalVisible);
        handleUpload(newfile);
      }
    } else {
      Alert.alert("Error", "You need to enable permission for Camera Access!");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "vendorApp");
    data.append("cloud_name", "omarfarooqkhan");
    setIsLoading(true);
    fetch("https://api.cloudinary.com/v1_1/omarfarooqkhan/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        vendor.cnicFront = data.url;
        dispatch({ type: "ADD_NEW_VENDOR", payload: vendor });
        Alert.alert("Success", "CNIC Front-side uploaded successfully!");
        navigation.replace("CNICBack");
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
    <View style={{ height: "100%", backgroundColor: Colors.secondary }}>
      <StatusBar backgroundColor={Colors.statusbar} />
      <Header style={{ backgroundColor: Colors.primary }}>
        <Body>
          <Title style={{ alignSelf: "center" }}>ROOZGAR</Title>
        </Body>
      </Header>
      <View
        style={{
          height: "80%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.secondary,
        }}
      >
        <H1 style={{ textAlign: "center", marginVertical: hp("2%") }}>
          Upload CNIC Front-side
        </H1>
        <Text
          style={{
            textAlign: "center",
            fontSize: RFValue(13, 580),
            color: "grey",
          }}
        >
          For verification purposes, it is required to upload a picture your
          CNIC. Consider the following picture, for example:
        </Text>
        <Image
          source={require("../assets/images/CNIC_front_sample.jpg")}
          style={{
            borderWidth: 1,
            borderColor: "grey",
            marginVertical: hp("5%"),
            width: wp("80%"),
            height: hp("25%"),
          }}
        />
        <Button
          rounded
          success
          style={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            width: "40%",
            marginVertical: hp("2%"),
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ textAlign: "center" }}>UPLOAD PICTURE</Text>
        </Button>
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
            <Text style={styles.panelSubtitle}>Choose an option:</Text>
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
    </View>
  );
};

export default CNICFront;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
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
