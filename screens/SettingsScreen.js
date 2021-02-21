import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Colors from "../constants/Colors";

const SettingsScreen = (props) => {
  const [showTimeControl, setShowTimeControl] = useState(false);
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.topSettings}>
        <Text style={styles.titleText}>New Timer</Text>
        <View style={styles.timerForm}>
          <View style={styles.topForm}>
            <View style={styles.hours}>
              <TextInput style={styles.inputStyle} placeholder="Hours..." />
            </View>
            <View style={styles.minutes}>
              <TextInput style={styles.inputStyle} placeholder="Minutes..." />
            </View>
            <View style={styles.seconds}>
              <TextInput style={styles.inputStyle} placeholder="Seconds..." />
            </View>
          </View>
          <View style={styles.botForm}>
            <View style={styles.increment}>
              <TextInput style={styles.inputStyle} placeholder="Increment..." />
            </View>
          </View>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={() => setShowTimeControl(!showTimeControl)}
          >
            <View style={styles.timeControllContainer}>
              <Text style={styles.timeControllButton}>
                {showTimeControl ? "Remove time control" : "Add time control"}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {showTimeControl && (
          <View style={styles.timeControl}>
            <View style={styles.seconds}>
              <TextInput style={styles.inputStyle} placeholder="At move..." />
            </View>
            <View style={styles.increment}>
              <TextInput style={styles.inputStyle} placeholder="Increment..." />
            </View>
          </View>
        )}
      </View>
      <View style={styles.bottomSettings}></View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 15,
  },
  titleText: {
    fontSize: 45,
    textAlign: "center",
    color: Colors.primary,
    margin: 20,
  },
  timerForm: {
    flex: 1,
  },
  topForm: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bottomSettings: {
    height: "100%",
    width: "100%",
  },
  botForm: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
  },
  topSettings: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 15,
    paddingBottom: 30,
  },
  minutes: {
    width: "27%",
  },
  seconds: {
    width: "27%",
  },
  hours: {
    width: "27%",
  },
  increment: {
    width: "27%",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 8,
  },
  timeControllButton: {
    color: Colors.primary,
    fontSize: 20,
  },
  timeControllContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  timeControl: {
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
});

export default SettingsScreen;
