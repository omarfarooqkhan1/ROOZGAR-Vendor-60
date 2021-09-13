import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  PermissionsAndroid,
} from "react-native";
import { Avatar } from "react-native-elements";
import Colors from "../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { useSelector } from "react-redux";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";

const Map = () => {
  const vendor = useSelector((state) => state.newVendor);
  const vendorName = vendor.firstName + " " + vendor.lastName;
  const [myProfileModal, setMyProfileModal] = React.useState(false);
  const [superLat, setSuperLat] = React.useState(55.9754);
  const [superLong, setSuperLong] = React.useState(21.4735);
  const [vendorToken, setVendorToken] = React.useState("");

  React.useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
          alert("Permission Denied");
        }
      } catch (err) {
        alert("err", err);
      }
    };
    requestLocationPermission();
    messaging()
      .getToken()
      .then((token) => {
        setVendorToken(token);
        console.log(token);
      });
  }, []);

  const setCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (data) => {
        setSuperLat(data.coords.latitude);
        setSuperLong(data.coords.longitude);
        console.log(data.coords);
      },
      console.log,
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 3600000,
      }
    );
    firestore()
      .collection("vendorLocations")
      .add({
        vendorId: vendor._id,
        vendorLocation: new firestore.GeoPoint(superLat, superLong),
        vendorCategory: vendor.category._id,
        vendorToken: vendorToken,
      })
      .then(() => {
        console.log("Location added!");
      });
    // firestore()
    //   .collection("clientLocations")
    //   .onSnapshot((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.data());
    //       //list.push(doc.data());
    //     });
    //   })
    //   .then(() => {
    //     console.log("Location got!");
    //   });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MapView
        style={styles.mapStyle}
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: parseFloat(superLat),
          longitude: parseFloat(superLong),
          latitudeDelta: 0.922,
          longitudeDelta: 0.421,
        }}
      >
        <>
          <Marker
            coordinate={{
              latitude: parseFloat(superLat),
              longitude: parseFloat(superLong),
            }}
            title={"User Location"}
            description={"Current Location"}
            identifier={`xx`}
          />
        </>
      </MapView>
      <TouchableOpacity
        onPress={() => {
          setMyProfileModal(true);
          setCurrentLocation();
        }}
        style={{
          height: hp("16%"),
          width: wp("32%"),
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          borderTopRightRadius: 0,
          backgroundColor: Colors.primary,
          elevation: 9,
          position: "absolute",
        }}
      >
        <Text
          style={{
            fontSize: RFValue(15, 580),
            fontWeight: "700",
            color: "#fff",
          }}
        >
          Go!
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={myProfileModal}
        animationType="slide"
        onRequestClose={() => setMyProfileModal(false)}
      >
        <View
          style={{
            width: wp("100%"),
            height: hp("35%"),
            marginTop: hp("35%"),
            opacity: 0.9,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Avatar
              borderWidth={2}
              borderColor={Colors.primary}
              rounded
              size={"large"}
              source={{ uri: vendor.image }}
              alignSelf="flex-end"
            />
            <Text
              style={{
                fontWeight: "bold",
                color: "#000",
              }}
            >
              {`  ${vendorName}`}
            </Text>
          </View>
          <View
            style={{
              alignSelf: "center",
              width: wp("85%"),
              height: "30%",
              backgroundColor: Colors.primary,
              borderRadius: 10,
              marginTop: hp("2%"),
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              paddingVertical: 5,
              paddingLeft: 2,
            }}
          >
            <View
              style={{
                width: wp("30%"),
                alignItems: "center",
              }}
            >
              <Feather name="clock" size={25} color="#fff" />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: RFValue(13, 580),
                  color: "#fff",
                }}
              >
                10.2
              </Text>
              <Text style={{ fontSize: RFValue(10, 580), color: "#fff" }}>
                Hours online
              </Text>
            </View>
            <View
              style={{
                width: wp("30%"),
                alignItems: "center",
              }}
            >
              <SimpleLineIcons name="speedometer" size={20} color="#fff" />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: RFValue(13, 580),
                  color: "#fff",
                }}
              >
                30 KM
              </Text>
              <Text style={{ fontSize: RFValue(10, 580), color: "#fff" }}>
                Total Distance
              </Text>
            </View>
            <View
              style={{
                width: wp("30%"),
                alignItems: "center",
              }}
            >
              <Feather name="briefcase" size={25} color="#fff" />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: RFValue(13, 580),
                  color: "#fff",
                }}
              >
                20
              </Text>
              <Text style={{ fontSize: RFValue(10, 580), color: "#fff" }}>
                Total Orders
              </Text>
            </View>
          </View>
          <View
            mt={hp("4%")}
            alignSelf="center"
            borderBottomWidth={5}
            borderColor="#333132"
            borderRadius={5}
            w={wp("30%")}
          ></View>
        </View>
      </Modal>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});
