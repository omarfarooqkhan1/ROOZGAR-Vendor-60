import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";

const Loading = ({ navigation }) => {
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.replace("TabNavigation");
    } else navigation.replace("SplashScreen");
  };

  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
});

export default Loading;
