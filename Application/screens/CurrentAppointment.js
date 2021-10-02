import React from "react";
import { View, PermissionsAndroid, Button } from "react-native";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import RNLocation from "react-native-location";
import firestore from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";

const CurrentAppointment = () => {
  const vendor = useSelector((state) => state.newVendor);

  React.useEffect(() => {
    reqPermission();
  }, []);

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
      title: "Foreground Service",
      message: "you are online!",
    });
  };

  const stopService = () => {
    ReactNativeForegroundService.stop();
  };

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly" }}
    >
      <Button onPress={bg} title="Get Location" />
      <Button onPress={stopService} title="Stop Getting Location" />
    </View>
  );
};

export default CurrentAppointment;
