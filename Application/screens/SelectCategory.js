import React, { useState, useEffect } from "react";
import { Header, Body, Title, Container, H1 } from "native-base";
import {
  FlatList,
  Alert,
  StyleSheet,
  ActivityIndicator,
  View,
  StatusBar,
  Text,
} from "react-native";
import CategoryItem from "../components/CategoryItem";
import Colors from "../constants/Colors";
import baseURL from "../constants/baseURL";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector, useDispatch } from "react-redux";

const SelectCategory = ({ navigation }) => {
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.newVendor);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    fetch(`${baseURL}/getCategories/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategoryList(data.categories);
        setIsLoading(false);
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
      <Header style={{ backgroundColor: Colors.primary }}>
        <Body>
          <Title style={{ alignSelf: "center" }}>ROOZGAR</Title>
        </Body>
      </Header>
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
          Select a Category in which you want to offer services!
        </Text>
      </View>
      <FlatList
        data={categoryList}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <CategoryItem
            picture={itemData.item.picture}
            title={itemData.item.title}
            onSelect={() => {
              vendor.category = itemData.item._id;
              dispatch({ type: "ADD_NEW_VENDOR", payload: vendor });
              navigation.navigate("ProfilePicture");
            }}
          ></CategoryItem>
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

export default SelectCategory;
