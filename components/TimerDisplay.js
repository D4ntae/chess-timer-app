import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const TimerDisplay = (props) => {
  const [counter, setCounter] = useState(0);
  const [color, setColor] = useState("#e31010");

  useEffect(() => {
    if (!props.isLoser) {
      setColor("#e31010");
      setCounter(0);
    }
  }, [props.isLoser]);

  useInterval(
    () => {
      if (color === "#e31010") {
        setColor(Colors.background);
        setCounter(counter + 1);
      } else {
        setColor("#e31010");
        setCounter(counter + 1);
      }
    },
    props.isLoser ? (counter < 14 ? 400 : null) : null
  );
  return (
    <View style={props.reversed ? { transform: [{ rotateZ: "180deg" }] } : {}}>
      <Text
        style={
          props.small
            ? styles.timerTextSmall
            : props.isLoser
            ? { ...styles.timerText, color: color }
            : styles.timerText
        }
      >
        {props.minutes} : {props.seconds >= 10 ? null : "0"}
        {props.seconds}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontFamily: "digital-7",
    color: "white",
    fontSize: 120,
  },
  timerTextSmall: {
    fontFamily: "digital-7",
    color: "#27570b",
    fontSize: 50,
    marginVertical: 15,
  },
});

export default TimerDisplay;
