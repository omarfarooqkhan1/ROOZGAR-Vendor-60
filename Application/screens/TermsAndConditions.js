import React from 'react';
import {
  HStack,
  IconButton,
  Icon as NBIcon,
  Text,
  Box,
  StatusBar,
  View,
  Heading,
  VStack,
  FlatList,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';
import {ScrollView, TouchableOpacity} from 'react-native';

function Header({navigation}) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop bg={Colors.primary} />
      <HStack
        bg={Colors.primary}
        p={'3%'}
        justifyContent="space-between"
        alignItems="center">
        <HStack space={'sm'} alignItems={'center'}>
          <IconButton
            onPress={() => navigation.pop()}
            icon={
              <NBIcon
                as={<Icon name="keyboard-backspace" />}
                size="sm"
                color="white"
              />
            }
          />
          <Text color="white" fontSize={20} fontWeight="bold">
            ROOZGAR Vendor
          </Text>
        </HStack>
        <IconButton
          icon={
            <NBIcon as={<Icon name="more-vert" />} size="sm" color="white" />
          }
        />
      </HStack>
    </>
  );
}

const TermsAndConditions = ({navigation}) => {
  return (
    <View height={'100%'} bg={Colors.secondary}>
      <Header navigation={navigation} />
      <Heading my={'7%'} alignSelf="center" size={'xl'}>
        Terms And Conditions
      </Heading>
      <VStack mx={'3%'} space={'sm'} alignItems="center">
        <Text>Please read and accept the following terms and conditions:</Text>
        <ScrollView
          width={'95%'}
          height={'60%'}
          bg={'#fff'}
          borderWidth={1}
          borderColor={'grey'}>
          <Text fontSize={20} p={'3%'}>
            Applicable law: By downloading this Application, you agree that the
            laws of Pakistan, without regard to principles of conflict laws,
            will govern these terms and conditions, or any dispute of any sort
            that might come between ROOZGAR and you, or its business partners
            and associates.
          </Text>
          <Text fontSize={20} p={'3%'}>
            Disputes: Any dispute related in any way to your visit to this
            Application or to products you purchase from us shall be arbitrated
            by state or federal court Pakistan and you consent to exclusive
            jurisdiction and venue of such courts.
          </Text>
          <Text fontSize={20} p={'3%'}>
            Indemnification: You agree to indemnify ROOZGAR and its affiliates
            and hold ROOZGAR harmless against legal claims and demands that may
            arise from your use or misuse of our services. We reserve the right
            to select our own legal counsel.
          </Text>
          <Text fontSize={20} p={'3%'}>
            Limitation on liability: ROOZGAR is not liable for any damages that
            may occur to you as a result of your misuse of our Application.
            ROOZGAR reserves the right to edit, modify, and change this
            Agreement at any time. We shall let our users know of these changes
            through electronic mail. This Agreement is an understanding between
            ROOZGAR and the user, and this supersedes and replaces all prior
            agreements regarding the use of this Application.
          </Text>
        </ScrollView>
        <Button
          colorScheme="green"
          alignSelf="center"
          alignContent="flex-end"
          height={'8%'}
          width={'95%'}
          onPress={() => navigation.pop()}
          endIcon={
            <NBIcon as={<Icon name="check-box" />} size="sm" color="white" />
          }>
          I AGREE
        </Button>
      </VStack>
    </View>
  );
};

export default TermsAndConditions;
