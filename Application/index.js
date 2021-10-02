import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import App from "./App";

ReactNativeForegroundService.register();
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
