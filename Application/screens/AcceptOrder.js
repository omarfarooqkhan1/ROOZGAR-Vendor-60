import React from "react";
import Geolocation from "@react-native-community/geolocation";
import { Text, View } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Avatar } from "react-native-elements";
import MapView from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";
import Geocoder from "react-native-geocoder";
import { useSelector, useDispatch } from "react-redux";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import RNLocation from "react-native-location";
import {
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Linking,
  Alert,
  Platform,
} from "react-native";
import Colors from "../constants/Colors";
import baseURL from "../constants/baseURL";

const AcceptOrder = ({ navigation, route }) => {
  const dispatch = useDispatch();
  var vendor = useSelector((state) => state.newVendor);
  const serviceTitle = route.params.serviceTitle;
  const clientUserName = route.params.clientUserName;
  const clientImage = route.params.clientImage;
  const clientPhone = route.params.clientPhone;
  const [superLat, setSuperLat] = React.useState(33.6844);
  const [superLong, setSuperLong] = React.useState(73.0479);
  const [distance, setDistance] = React.useState(0);
  const [clientLocation, setClientLocation] = React.useState("");
  const [orderStatus, setOrderStatus] = React.useState("");
  const [acceptedOrderId, setAcceptedOrderId] = React.useState("");

  const reqPermission = async () => {
    const backgroundgranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title: "Background Location Permission",
        message:
          "We need access to your location " +
          "so you can get live quality updates.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        (data) => {
          setSuperLat(data.coords.latitude);
          setSuperLong(data.coords.longitude);
        },
        console.log,
        {
          enableHighAccuracy: false,
          timeout: 2000,
          maximumAge: 3600000,
        }
      );
    }
  };

  const bg = async () => {
    RNLocation.configure({
      distanceFilter: 100, // Meters
      desiredAccuracy: {
        ios: "best",
        android: "balancedPowerAccuracy",
      },
      // Android only
      androidProvider: "auto",
      interval: 25000, // Milliseconds
      fastestInterval: 20000, // Milliseconds
      maxWaitTime: 25000, // Milliseconds
      // iOS Only
      activityType: "other",
      allowsBackgroundLocationUpdates: false,
      headingFilter: 1, // Degrees
      headingOrientation: "portrait",
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: false,
    });
    let locationSubscription = null;
    let locationTimeout = null;
    let count = 0;

    ReactNativeForegroundService.add_task(
      () => {
        RNLocation.requestPermission({
          ios: "whenInUse",
          android: {
            detail: "fine",
          },
        }).then((granted) => {
          console.log("Location Permissions: ", granted);
          // if has permissions try to obtain location with RN location
          if (granted) {
            locationSubscription && locationSubscription();
            locationSubscription = RNLocation.subscribeToLocationUpdates(
              ([locations]) => {
                locationSubscription();
                locationTimeout && clearTimeout(locationTimeout);
                firestore()
                  .collection("vendorLocations")
                  .doc(vendor._id)
                  .update({
                    vendorLocation: new firestore.GeoPoint(
                      locations.latitude,
                      locations.longitude
                    ),
                  })
                  .then(() => {
                    console.log(++count);
                  });
              }
            );
          } else {
            locationSubscription && locationSubscription();
            locationTimeout && clearTimeout(locationTimeout);
            console.log("no permissions to obtain location");
          }
        });
      },
      {
        delay: 1000,
        onLoop: true,
        taskId: "taskid",
        onError: (e) => console.log("Error logging:", e),
      }
    );
    ReactNativeForegroundService.start({
      id: 144,
      title: "Order Accepted!",
      message: "You have an ongoing order!",
    });
  };

  const setToken = () => {
    messaging()
      .getToken()
      .then((token) => {
        vendor.token = token;
        console.log(token);
      });
  };

  const getDistance = (LAT1, LONG1, LAT2, LONG2) => {
    return (
      (2 *
        6371000 *
        Math.asin(
          Math.sqrt(
            Math.pow(
              Math.sin((LAT2 * (3.14159 / 180) - LAT1 * (3.14159 / 180)) / 2),
              2
            ) +
              Math.cos(LAT2 * (3.14159 / 180)) *
                Math.cos(LAT1 * (3.14159 / 180)) *
                Math.sin(
                  Math.pow(
                    (LONG2 * (3.14159 / 180) - LONG1 * (3.14159 / 180)) / 2,
                    2
                  )
                )
          )
        )) /
      1000
    );
  };

  React.useEffect(() => {
    reqPermission();
    setToken();
    dispatch({ type: "ADD_NEW_VENDOR", payload: vendor });
    setDistance(
      getDistance(
        superLat,
        superLong,
        route.params.clientLatitude,
        route.params.clientLongitude
      )
    );
    let clientLoc = {
      lat: parseFloat(route.params.clientLatitude),
      lng: parseFloat(route.params.clientLongitude),
    };
    Geocoder.geocodePosition(clientLoc).then((res) => {
      setClientLocation(
        res[0].streetName +
          ", " +
          res[0].locality +
          ", " +
          res[0].subLocality +
          ", " +
          res[0].subAdminArea
      );
    });
  });

  return (
    <>
      <MapView
        style={styles.mapStyle}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: superLat,
          longitude: superLong,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      ></MapView>

      {/*Accept rect view*/}
      <View
        style={{
          width: "80%",
          height: "55%",
          bottom: "65%",
          backgroundColor: "#fff",
          alignSelf: "center",
          marginTop: hp(5),
          borderRadius: 10,
        }}
      >
        {/*Imag row start*/}
        <View
          style={{
            width: "100%",
            paddingVertical: hp(1.2),
            backgroundColor: "#F7F7F7",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "20%",
              alignItems: "center",
              marginHorizontal: wp(1),
            }}
          >
            <Avatar
              alignSelf="center"
              borderWidth={1}
              borderColor={Colors.primary}
              rounded
              size={60}
              source={{ uri: clientImage }}
            />
          </View>
          <View style={{ width: "45%", justifyContent: "center" }}>
            <Text
              style={{
                color: "#333132",
                fontSize: RFValue(13, 580),
                fontWeight: "bold",
              }}
            >
              {clientUserName}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "5%",
              }}
            >
              <Text
                style={{
                  color: "#333132",
                  fontSize: RFValue(9, 580),

                  height: hp("3"),
                  width: wp(20),
                  backgroundColor: Colors.primary,
                  borderRadius: 10,
                  marginRight: wp(1),
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                On Demand
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "30%",
              justifyContent: "center",
              paddingRight: wp(1.5),
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                color: "#333132",
                fontSize: RFValue(12, 580),
                fontWeight: "bold",
              }}
            >
              Distance
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: RFValue(10.5, 580),
                fontWeight: "bold",
              }}
            >
              {distance.toFixed(1)} KM
            </Text>
          </View>
        </View>
        {/*Image row end*/}

        {/*Location rect start*/}
        <View
          style={{
            width: "92%",
            marginTop: hp(1),
            paddingVertical: hp(1.4),
            backgroundColor: "#fff",
            alignItems: "flex-start",
            alignSelf: "center",
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Ionicons name="location-sharp" size={wp(7)} color="lightgrey" />
          <Text
            style={{
              color: "#333132",
              fontSize: RFValue(12.5, 580),
              marginTop: hp(0.2),
            }}
          >
            {clientLocation}
          </Text>
        </View>
        {/*Location rect end*/}

        {/*Phone number rect start*/}
        <TouchableOpacity
          style={{
            width: "92%",
            marginTop: hp(1),
            paddingVertical: hp(1.4),
            backgroundColor: "#fff",
            alignItems: "flex-start",
            alignSelf: "center",
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
          onPress={() => {
            if (Platform.OS === "android") {
              Linking.openURL(`tel:${clientPhone}`);
            } else {
              Linking.openURL(`telprompt:${clientPhone}`);
            }
          }}
        >
          <Ionicons name="call" size={wp(7)} color="lightgrey" />
          <Text
            style={{
              color: "lightgrey",
              fontSize: RFValue(12.5, 580),
              marginTop: hp(0.2),
              fontWeight: "bold",
            }}
          >
            {clientPhone}
          </Text>
        </TouchableOpacity>
        {/*Phone number rect end*/}

        {/*Drop off rect start*/}
        <View
          style={{
            width: "100%",
            paddingVertical: hp(1.4),
            marginTop: hp(1),
            backgroundColor: "#fff",
            alignItems: "flex-start",
            paddingLeft: wp(3),
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Text
            style={{
              color: "lightgrey",
              fontSize: RFValue(11, 580),
              fontWeight: "bold",
            }}
          >
            REQUESTED SERVICE
          </Text>
          <Text
            style={{
              marginTop: hp(0.8),
              fontSize: RFValue(12, 580),
            }}
          >
            {serviceTitle}
          </Text>
        </View>
        {/*Drop off rect start*/}

        {/* ignore rect start*/}
        <View
          style={{
            width: "100%",
            paddingVertical: hp(1.4),
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomColor: "lightgrey",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {!orderStatus ? (
            <>
              <View
                style={{
                  width: "45%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    fetch(`${baseURL}/cancelOrder`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        vendorToken: vendor.token,
                        clientToken: route.params.clientToken,
                        vendorId: vendor._id,
                        vendorImage: vendor.image,
                        orderId: route.params.orderId,
                      }),
                    })
                      .then((res) => res.json())
                      .then((data) => {})
                      .catch((error) => {
                        console.log(error);
                        Alert.alert(
                          "Error",
                          "Looks like you aren't connected to the internet!"
                        );
                      });
                    navigation.pop();
                  }}
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "red",
                    borderRadius: 6,
                    paddingVertical: hp(1.5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: RFValue(12, 580),
                      color: "#fff",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "45%",
                  alignItems: "flex-end",
                  paddingRight: wp(1.5),
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Colors.primary,
                    borderRadius: 6,
                    paddingVertical: hp(1.5),
                  }}
                  onPress={() => {
                    fetch(`${baseURL}/acceptOrder`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        vendorToken: vendor.token,
                        clientToken: route.params.clientToken,
                        vendorId: vendor._id,
                        vendorImage: vendor.image,
                        orderId: route.params.orderId,
                      }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        setAcceptedOrderId(data.acceptedOrderId);
                      })
                      .catch((error) => {
                        console.log(error);
                        Alert.alert(
                          "Error",
                          "Looks like you aren't connected to the internet!"
                        );
                      });
                    fetch(`${baseURL}/goOffline/${vendor._id}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
                      .then((res) => res.json())
                      .then((data) => {})
                      .catch((error) => {
                        console.log(error);
                        Alert.alert(
                          "Error",
                          "Looks like you aren't connected to the internet!"
                        );
                      });
                    setOrderStatus("accepted");
                    Linking.openURL(
                      `https://www.google.com/maps/dir/?api=1&destination=${route.params.clientLatitude},${route.params.clientLongitude}`
                    );
                    bg();
                  }}
                >
                  <Text
                    style={{
                      fontSize: RFValue(12, 580),
                    }}
                  >
                    Accept
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : orderStatus === "accepted" ? (
            <View
              style={{
                width: "80%",
                alignItems: "flex-end",
                paddingRight: wp(1.5),
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Colors.primary,
                  borderRadius: 6,
                  paddingVertical: hp(1.5),
                }}
                onPress={() => {
                  fetch(`${baseURL}/arrivedAtLocation`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      clientToken: route.params.clientToken,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {});
                  setOrderStatus("arrived");
                  ReactNativeForegroundService.stop();
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(12, 580),
                  }}
                >
                  Arrived!
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                width: "80%",
                alignItems: "flex-end",
                paddingRight: wp(1.5),
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Colors.primary,
                  borderRadius: 6,
                  paddingVertical: hp(1.5),
                }}
                onPress={() => {
                  fetch(`${baseURL}/completeOrder`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      vendorToken: vendor.token,
                      clientToken: route.params.clientToken,
                      vendorId: vendor._id,
                      vendorImage: vendor.image,
                      orderId: route.params.orderId,
                      acceptedOrderId: acceptedOrderId,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {})
                    .catch((error) => {
                      console.log(error);
                      Alert.alert(
                        "Error",
                        "Looks like you aren't connected to the internet!"
                      );
                    });
                  fetch(`${baseURL}/goOnline/${vendor._id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                    .then((res) => res.json())
                    .then((data) => {})
                    .catch((error) => {
                      console.log(error);
                      Alert.alert(
                        "Error",
                        "Looks like you aren't connected to the internet!"
                      );
                    });
                  navigation.pop();
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(12, 580),
                  }}
                >
                  Mark as Completed!
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* ignore rect end*/}
      </View>
    </>
  );
};

export default AcceptOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    height: hp("100%"),
  },
  linearGradient: {
    width: "100%",
    height: hp("8%"),
    paddingTop: "1%",
    paddingBottom: "3%",
    backgroundColor: "#1D75D3",
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
