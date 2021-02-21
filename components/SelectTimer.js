import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const SelectTimer = (props) => {
  console.log("Props", props.selected);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.timerText}>{props.text}</Text>
      {props.selected && (
        <AntDesign name="check" size={32} color={Colors.primary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timerText: {
    fontSize: 24,
    color: "white",
    fontFamily: "roboto-light",
  },
});

export default SelectTimer;
