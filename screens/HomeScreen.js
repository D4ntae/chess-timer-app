import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import StartButton from "../components/StartButton";

const HomeScreen = (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topScreen}>
        <View style={styles.topText}>
          <View style={styles.chessContainer}>
            <View style={styles.chessTextContainer}>
              <Text style={styles.chessText}>Chess</Text>
            </View>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>10:00</Text>
            </View>
          </View>
          <View style={styles.clockerContainer}>
            <Text style={styles.clockerText}>Clocker</Text>
          </View>
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.divider}></View>
        </View>
        <View style={styles.bottomText}>
          <View style={styles.clockerContainerBot}>
            <Text style={styles.clockerTextBot}>Clocker</Text>
          </View>
          <View style={styles.chessContainerBot}>
            <View style={styles.chessTextContainerBot}>
              <Text style={styles.chessTextBot}>Chess</Text>
            </View>
            <View style={styles.numberContainerBot}>
              <Text style={styles.numberTextBot}>10:00</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomScreen}>
        <StartButton
          text={"Start"}
          onPress={() => {
            props.navigation.navigate("Timer");
          }}
        />
        <StartButton
          text={"Select timer"}
          onPress={() => {
            props.navigation.navigate("Select");
          }}
        />
        <StartButton
          text={"New Timer"}
          onPress={() => {
            props.navigation.navigate("Settings");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topScreen: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  bottomScreen: {
    flex: 1,
    margin: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  topText: {
    flex: 49.5,
    width: "85%",
    marginBottom: 20,
    alignItems: "center",
  },
  bottomText: {
    flex: 49.5,
    transform: [{ rotateY: "180deg" }],
    marginRight: 10,
  },
  dividerContainer: {
    flex: 1,
    width: "90%",
    height: 4,
  },
  divider: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.primary,
  },
  chessContainer: {
    flex: 40,
    flexDirection: "row",
    width: "95%",
  },
  clockerContainer: {
    flex: 60,
  },
  chessText: {
    color: Colors.primary,
    fontSize: 70,
    textAlign: "right",
    fontFamily: "roboto-light",
  },
  clockerText: {
    color: Colors.primary,
    fontSize: 95,
    fontFamily: "roboto-light",
  },
  numberText: {
    color: "white",
    fontSize: 48,
    fontFamily: "digital-7",
    textAlign: "center",
    marginTop: 35,
    marginLeft: 10,
  },
  numberContainer: {
    flex: 35,
  },
  chessTextContainer: {
    flex: 65,
  },
  chessContainerBot: {
    flex: 40,
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
  },
  clockerContainerBot: {
    flex: 60,
    justifyContent: "center",
  },
  chessTextBot: {
    color: Colors.primary,
    fontSize: 70,
    textAlign: "right",
    fontFamily: "roboto-light",
  },
  clockerTextBot: {
    color: Colors.primary,
    fontSize: 95,
    fontFamily: "roboto-light",
  },
  numberTextBot: {
    color: "white",
    fontSize: 48,
    fontFamily: "digital-7",
    textAlign: "left",
    marginTop: 35,
    marginLeft: 15,
    marginBottom: 20,
  },
  numberContainerBot: {
    flex: 35,
  },
  chessTextContainerBot: {
    flex: 45,
  },
});

export default HomeScreen;
