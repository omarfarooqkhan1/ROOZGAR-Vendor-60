import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import SelectCategory from "./screens/SelectCategory";
import Loading from "./screens/Loading";
import OTP from "./screens/OTP";
import SplashScreen from "./screens/SplashScreen";
import TrackClientLocation from "./screens/TrackClientLocation";
import ProfilePicture from "./screens/ProfilePicture";
import TabNavigation from "./screens/TabNavigation";
import CNICFront from "./screens/CNICFront";
import CNICBack from "./screens/CNICBack";
import Receipt from "./screens/Receipt";
import WelcomeVendor from "./screens/WelcomeVendor";
import SetPassword from "./screens/SetPassword";
import SelectSubCategory from "./screens/SelectSubCategory";
import AddService from "./screens/Services/AddService";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducers/reducer";
import messaging from "@react-native-firebase/messaging";

const store = createStore(reducer);
const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          fetch(`${baseURL}/respondToOrder`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clientToken: remoteMessage.data.clientToken,
            }),
          })
            .then((res) => res.json())
            .then((data) => {});
        }
      });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="SetPassword" component={SetPassword} />
          <Stack.Screen name="SelectCategory" component={SelectCategory} />
          <Stack.Screen name="ProfilePicture" component={ProfilePicture} />
          <Stack.Screen name="CNICFront" component={CNICFront} />
          <Stack.Screen name="CNICBack" component={CNICBack} />
          <Stack.Screen name="Receipt" component={Receipt} />
          <Stack.Screen
            name="SelectSubCategory"
            component={SelectSubCategory}
          />
          <Stack.Screen name="AddService" component={AddService} />
          <Stack.Screen name="WelcomeVendor" component={WelcomeVendor} />
          <Stack.Screen
            name="TrackClientLocation"
            component={TrackClientLocation}
          />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
