import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../constants/Colors";

function TrackClientLocation({ navigation }) {
  const [superLong, setSuperLong] = useState(21.4735);
  const [superLat, setSuperLat] = useState(55.9754);

  // React.useEffect(() => {
  //   requestLocationPermission();
  //   getLoc();
  // }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      getLoc();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getLoc();
        } else {
          alert(
            "Permission Access denied. Pease Make Sure GPS Permission is enabled and then exit app and run again"
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getLoc = async () => {
    await Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        console.log(position);
        setSuperLong(position.coords.longitude);
        setSuperLat(position.coords.latitude);
        readyOKDone();
      },
      (error) => {
        ToastAndroid.show(
          "Error in getting your current location, Trying Again. Make Sure your GPS turn on",
          ToastAndroid.SHORT
        );
        getLoc();
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };

  const readyOKDone = () => {
    // var abc = msh.map(({store}) => `${store}`);
    // var msh = 'msh';
    // abc.push(msh);
    var abc = ["xx"];
    mapView.current.fitToSuppliedMarkers(abc, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  };

  const mapView = useRef();

  const pinColor = "blue";
  {
    /*map end*/
  }

  const loginWithGoogle = () => {
    navigation.navigate("SelectCity");
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.statusbar} />

      <View style={styles.container}>
        <View style={{ width: wp("100%") }}>
          <LinearGradient
            colors={["#00c13e", "#00c193"]}
            style={styles.linearGradient}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(14, 580),
                  fontWeight: "700",
                  alignSelf: "center",
                  marginVertical: hp("0.5%"),
                }}
              >
                TRACK CLIENT'S LOCATION
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.main}>
          <MapView
            style={styles.mapStyle}
            showsUserLocation={false}
            zoomEnabled={true}
            zoomControlEnabled={true}
            ref={mapView}
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
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    width: wp("100%"),
    height: hp("100%"),
    alignItems: "center",
  },
  linearGradient: {
    width: "100%",
    height: hp("6%"),
    paddingVertical: "1%",
  },
  searchBtn: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 4,
    flexDirection: "row",
  },
  textArea: {
    width: "90%",
    height: hp(5.5),
    paddingLeft: wp(2),
    fontSize: RFValue(11, 580),
    justifyContent: "flex-start",
    borderColor: "lightgrey",
    color: "#000",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});

export default TrackClientLocation;
