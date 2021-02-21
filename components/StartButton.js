import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

const StartButton = (props) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  wrapper: {
    width: "80%",
    height: "20%",
    overflow: "hidden",
  },
  text: {
    fontFamily: "roboto-light",
    color: Colors.primary,
    textAlign: "center",
    fontSize: 46,
  },
});

export default StartButton;
