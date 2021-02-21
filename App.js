import React, { useState } from "react";
import { AppLoading } from "expo";

import * as Font from "expo-font";
import TimerNavigator from "./navigation/TimerNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    "digital-7": require("./assets/fonts/digital-7.ttf"),
    "roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
    roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
      />
    );
  }

  return <TimerNavigator />;
}
