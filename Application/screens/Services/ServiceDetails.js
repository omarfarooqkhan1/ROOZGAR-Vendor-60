import React from "react";
import { Container, Text, Grid, Col } from "native-base";
import { Image, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ServiceDetails = ({ navigation, route }) => {
  const { service } = route.params;
  console.log(service);
  return (
    <Container>
      <StatusBar backgroundColor={Colors.statusbar} />
      <LinearGradient
        colors={["#00c13e", "#00c193"]}
        style={{ height: hp("7%") }}
      >
        <Grid>
          <Col style={{ width: "12%", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Icon
                name="arrow-left"
                size={25}
                color="#fff"
                style={{
                  marginTop: hp("2%"),
                }}
              />
            </TouchableOpacity>
          </Col>
          <Col style={{ width: "78%", alignItems: "center" }}>
            <Text
              style={{
                marginTop: hp("2%"),
                fontSize: RFValue(15, 580),
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              SERVICE DETAILS
            </Text>
          </Col>
        </Grid>
      </LinearGradient>
      <Image style={styles.image} source={{ uri: service.image }} />
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.price}>Rs. {service.price}/-</Text>
      <Text style={styles.description}>{service.description}</Text>
      <Text style={styles.price}>
        Sub-category: {service.subCategory.title}
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 25,
    color: Colors.primary,
    textAlign: "center",
    marginVertical: 7,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 3,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default ServiceDetails;
