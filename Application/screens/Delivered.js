import React from 'react';
import {HStack, Icon, Text, View, Circle} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';

const AcceptOrder = ({navigation}) => {
  const [switchState, setSwitchState] = React.useState(true);
  const [switchBorderColor, setSwitchBorderColor] = React.useState('blue');

  const changeStatus = state => {
    setSwitchState(state);
    if (state) {
      setSwitchBorderColor('blue');
    } else {
      setSwitchBorderColor('black');
    }
  };

  return (
    <>
      <View
        style={{
          width: '100%',
          paddingVertical: hp(1.4),
          backgroundColor: '#FFB901',
          borderBottomRightRadius: wp(10),
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            width: '20%',
            paddingLeft: wp(1.8),
            justifyContent: 'center',
          }}
          onPress={() => setMenuModal(true)}>
          <Icon size="md" as={<MaterialIcons name="menu" />} />
        </TouchableOpacity>
        <View
          style={{
            width: '60%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text fontSize={RFValue(14, 580)} fontWeight="500">
            Online
          </Text>
        </View>
        <View
          style={{
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            borderWidth={2}
            width={12}
            borderRadius={25}
            borderColor={switchBorderColor}>
            <ToggleSwitch
              isOn={switchState}
              size="small"
              thumbOffStyle={{backgroundColor: '#000'}}
              thumbOnStyle={{backgroundColor: 'blue'}}
              trackOffStyle={{backgroundColor: '#FFB901'}}
              trackOnStyle={{backgroundColor: '#FFB901'}}
              onToggle={changeStatus}
            />
          </View>
        </View>
      </View>

      <MapView
        style={styles.mapStyle}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}></MapView>

      <Circle
        size={50}
        alignSelf="flex-end"
        bg="lightgrey"
        bottom={hp('60%')}
        mr={2}
        opacity={0.8}>
        <Icon as={<MaterialIcons name="my-location" />} size={6} />
      </Circle>
      {/*Accept rect view*/}
      <View
        style={{
          width: '80%',
          height: '40%',
          bottom: '65%',
          backgroundColor: '#fff',
          alignSelf: 'center',
          marginTop: hp(5),
          borderRadius: 10,
        }}>
        {/*Imag row start*/}
        <View
          style={{
            width: '100%',
            paddingVertical: hp(1.2),
            backgroundColor: '#F7F7F7',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '20%',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/image/kiraan.png')}
              style={{
                borderRadius: 200 / 2,
                height: hp('7%'),
                width: wp('10%'),
              }}
            />
          </View>
          <View style={{width: '50%', justifyContent: 'center'}}>
            <Text
              style={{
                color: '#333132',
                fontSize: RFValue(13, 580),
                fontWeight: 'bold',
              }}>
              Esther Berry
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '5%',
              }}>
              <Text
                style={{
                  color: '#333132',
                  fontSize: RFValue(9, 580),

                  height: hp('3'),
                  width: wp(18),
                  backgroundColor: '#FFB901',
                  borderRadius: 10,
                  marginRight: wp(1),
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                OnlinePay
              </Text>
              <Text
                style={{
                  color: '#333132',
                  fontSize: RFValue(9, 580),

                  height: hp('3'),
                  width: wp(18),
                  backgroundColor: '#FFB901',
                  borderRadius: 10,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                Discount
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              paddingRight: wp(1.5),
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                color: '#333132',
                fontSize: RFValue(12, 580),
                fontWeight: 'bold',
              }}>
              £25.00
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: RFValue(10.5, 580),
                fontWeight: 'bold',
              }}>
              2.2 Km
            </Text>
          </View>
        </View>
        {/*Image row end*/}

        {/*Grocery list rect start*/}
        <View
          style={{
            width: '92%',
            marginTop: hp(1),
            paddingVertical: hp(1.4),
            backgroundColor: '#fff',
            alignItems: 'flex-start',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
          }}>
          <Ionicons name="caret-down-sharp" size={wp(4.5)} color="lightgrey" />
          <Text
            style={{
              color: '#333132',
              fontSize: RFValue(12.5, 580),
              marginTop: hp(0.2),
            }}>
            Grocery List
          </Text>
        </View>
        {/*Grocery list rect end*/}

        {/*Drop off rect start*/}
        <View
          style={{
            width: '100%',
            paddingVertical: hp(1.4),
            marginTop: hp(1),
            backgroundColor: '#fff',
            alignItems: 'flex-start',
            paddingLeft: wp(3),
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
          }}>
          <Text
            style={{
              color: 'lightgrey',
              fontSize: RFValue(11, 580),
            }}>
            DROP OFF
          </Text>
          <Text
            style={{
              color: '#333132',
              marginTop: hp(0.8),
              fontSize: RFValue(12, 580),
            }}>
            105 Wilian St,Birgingham,UK
          </Text>
        </View>
        {/*Drop off rect start*/}

        {/* ignore rect start*/}
        <View
          style={{
            width: '100%',
            paddingVertical: hp(1.4),
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomColor: 'lightgrey',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '25%',
              alignItems: 'flex-start',
              paddingLeft: wp(2),
            }}>
            <Ionicons name="menu" size={wp(6.8)} color="lightgrey" />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Receipt')}
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'lightgrey',
                fontSize: RFValue(12, 580),
              }}>
              Invoice
            </Text>
            <MaterialCommunityIcons
              name="attachment"
              size={wp(5)}
              color="lightgrey"
            />
          </TouchableOpacity>
          <View
            style={{
              width: '45%',
              alignItems: 'flex-end',
              paddingRight: wp(1.5),
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFB901',
                borderRadius: 6,
                paddingVertical: hp(1.5),
              }}>
              <Text
                style={{
                  fontSize: RFValue(12, 580),
                }}>
                Delivered
              </Text>
            </TouchableOpacity>
          </View>
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
    height: hp('100%'),
  },
  linearGradient: {
    width: '100%',
    height: hp('8%'),
    paddingTop: '1%',
    paddingBottom: '3%',
    backgroundColor: '#1D75D3',
  },
  searchBtn: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 4,
    flexDirection: 'row',
  },
  textArea: {
    width: '90%',
    height: hp(5.5),
    paddingLeft: wp(2),
    fontSize: RFValue(11, 580),
    justifyContent: 'flex-start',
    borderColor: 'lightgrey',
    color: '#000',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
});
