import React, { useState, useEffect } from "react";
import { Container, Text, Grid, Col, View } from "native-base";
import {
  FlatList,
  Button,
  Alert,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import ServiceItem from "../../components/ServiceItem";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../constants/Colors";
import baseURL from "../../constants/baseURL";
import { useSelector, useDispatch } from "react-redux";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

const MyServices = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { servicesList, newVendor } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    fetch(`${baseURL}/getServices/${newVendor._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "LOAD_SERVICES", payload: data.services });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          "Error",
          "Looks like you aren't connected to the internet!"
        );
        setIsLoading(false);
        navigation.pop();
      });
  };

  const deleteService = async (id) => {
    setIsLoading(true);
    fetch(`${baseURL}/myServices/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vendorId: newVendor._id,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        dispatch({ type: "DELETE_SERVICE", payload: id });
        Alert.alert("Service has been deleted!");
        console.log(data);
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

  const deleteHandler = (serviceId) => {
    Alert.alert("Are you sure?", "Do you really want to delete this service?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          deleteService(serviceId);
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && servicesList.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No services found, maybe start creating some?</Text>
      </View>
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
              MY SERVICES
            </Text>
          </Col>
        </Grid>
      </LinearGradient>
      <FlatList
        data={servicesList}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <ServiceItem
            picture={itemData.item.image}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              navigation.navigate("ServiceDetails", {
                service: itemData.item,
              });
            }}
          >
            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate("EditService", {
                  service: itemData.item,
                })
              }
            />
            <Button
              color={"red"}
              title="Delete"
              onPress={deleteHandler.bind(this, itemData.item.id)}
            />
          </ServiceItem>
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

export default MyServices;
