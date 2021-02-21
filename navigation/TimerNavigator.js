import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import Colors from "../constants/Colors";
import TimerScreen from "../screens/TimerScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SelectScreen from "../screens/SelectScreen";

const TimerNavigator = createStackNavigator(
  {
    Start: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home",
        headerShown: false,
      },
    },
    Timer: {
      screen: TimerScreen,
      navigationOptions: {
        title: "Timer",
        headerShown: false,
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        headerTintColor: Colors.primary,
      },
    },
    Select: {
      screen: SelectScreen,
      navigationOptions: {
        headerTintColor: Colors.primary,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.background,
      },
    },
  }
);

export default createAppContainer(TimerNavigator);
