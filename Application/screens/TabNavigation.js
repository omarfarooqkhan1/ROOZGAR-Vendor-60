import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FAQs from "./FAQs";
import Map from "./Map";
import Dashboard from "./Dashboard";
import MyPayments from "./MyPayments";
import MyServices from "./Services/MyServices";
import ServiceDetails from "./Services/ServiceDetails";
import SelectSubCategory from "./SelectSubCategory";
import AddService from "./Services/AddService";
import EditService from "./Services/EditService";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import ChangePassword from "./ChangePassword";
import Rating from "./Rating";
import Receipt from "./Receipt";
import ContactUs from "./ContactUs";
import SendMessage from "./SendMessage";
import MyAppointments from "./MyAppointments";
import AppointmentDetails from "./AppointmentDetails";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function DashboardTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="SelectSubCategory" component={SelectSubCategory} />
      <Stack.Screen name="MyServices" component={MyServices} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="EditService" component={EditService} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen name="MyPayments" component={MyPayments} />
      <Stack.Screen name="Receipt" component={Receipt} />
    </Stack.Navigator>
  );
}

function SettingsTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="FAQs" component={FAQs} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="SendMessage" component={SendMessage} />
    </Stack.Navigator>
  );
}

function ProfileTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}

function TabNavigation() {
  var vendor = null;
  const dispatch = useDispatch();

  const loadVendorData = async () => {
    try {
      vendor = await AsyncStorage.getItem("vendor");
      if (vendor !== null) {
        vendor = JSON.parse(vendor);
        dispatch({ type: "ADD_NEW_VENDOR", payload: vendor });
      }
    } catch (e) {
      Alert.alert("Error", e);
    }
  };

  React.useEffect(() => {
    loadVendorData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={
        ({},
        ({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home-outline" : "home-outline";
              return <Ionicons name={iconName} size={wp(7)} color={color} />;
            } else if (route.name === "Profile") {
              iconName = focused ? "user" : "user";
              return <Feather name={iconName} size={wp(7)} color={color} />;
            } else if (route.name === "Go Online") {
              iconName = focused ? "map-pin" : "map-pin";
              return <Feather name={iconName} size={wp(6.5)} color={color} />;
            } else if (route.name === "Rating") {
              iconName = focused ? "star" : "star";
              return <Foundation name={iconName} size={wp(7)} color={color} />;
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings";
              return <Feather name={iconName} size={wp(6.5)} color={color} />;
            }
          },
        }))
      }
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: "#B2BDCF",
        labelStyle: {
          fontSize: RFValue(9.5, 580),
          top: -3,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardTab}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Go Online"
        component={Map}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Rating"
        component={Rating}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsTab}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  image00: {
    width: 25,
    right: 10,
  },
});

export default TabNavigation;
