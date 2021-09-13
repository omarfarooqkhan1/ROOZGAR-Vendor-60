import React, { useState, useEffect } from "react";
import { Container, H1, View, Text, Grid, Col } from "native-base";
import {
  FlatList,
  Alert,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import ServiceItem from "../components/ServiceItem";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../constants/Colors";
import baseURL from "../constants/baseURL";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";

const SelectSubCategory = ({ navigation }) => {
  const vendor = useSelector((state) => state.newVendor);
  const [isLoading, setIsLoading] = useState(false);
  const [subCategoryList, setSubCategoryList] = useState([]);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    setIsLoading(true);
    fetch(`${baseURL}/getSubCategories/${vendor.category._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubCategoryList(data.subCategories);
        setIsLoading(false);
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          "Looks like you aren't connected to the internet!"
        );
        setIsLoading(false);
        navigation.pop();
      });
  };

  if (isLoading) {
    return (
      <>
        <StatusBar backgroundColor={Colors.statusbar} />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </>
    );
  }

  return (
    <Container>
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
              ADD NEW SERVICE
            </Text>
          </Col>
        </Grid>
      </LinearGradient>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <H1 style={{ textAlign: "center", marginVertical: hp("2%") }}>
          Welcome, {vendor.firstName + " " + vendor.lastName}
        </H1>
        <Text
          style={{
            textAlign: "center",
            fontSize: RFValue(15, 580),
            color: "grey",
          }}
        >
          Select a Sub-category for your new service!
        </Text>
      </View>
      <FlatList
        data={subCategoryList}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <ServiceItem
            picture={itemData.item.picture}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              navigation.navigate("AddService", {
                subCategory: itemData.item,
              });
            }}
          ></ServiceItem>
        )}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
});

export default SelectSubCategory;
