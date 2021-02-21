import React, { useState, useRef, useEffect, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";

import Colors from "../constants/Colors";
import IconButton from "../components/IconButton";
import TimerDisplay from "../components/TimerDisplay";

const timersReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_WHITE":
      return {
        ...state,
        whiteMinutes: action.whiteMinutes,
        whiteSeconds: action.whiteSeconds,
      };

    case "UPDATE_BLACK":
      return {
        ...state,
        blackMinutes: action.blackMinutes,
        blackSeconds: action.blackSeconds,
      };
  }
};

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

let data = {
  timerSeconds: 5,
  increment: 5,
};

const TimerScreen = (props) => {
  const timerSeconds = data.timerSeconds;
  const increment = data.increment;

  const initialTimerWhite = moment.duration().add({
    hours: Math.floor(timerSeconds / 3600),
    minutes: Math.floor(
      (timerSeconds - Math.floor(timerSeconds / 3600) * 3600) / 60
    ),
    seconds:
      timerSeconds -
      (Math.floor(timerSeconds / 3600) * 3600 +
        Math.floor(
          (timerSeconds - Math.floor(timerSeconds / 3600) * 3600) / 60
        ) *
          60),
  });

  const initialTimerBlack = moment.duration().add({
    hours: Math.floor(timerSeconds / 3600),
    minutes: Math.floor(
      (timerSeconds - Math.floor(timerSeconds / 3600) * 3600) / 60
    ),
    seconds:
      timerSeconds -
      (Math.floor(timerSeconds / 3600) * 3600 +
        Math.floor(
          (timerSeconds - Math.floor(timerSeconds / 3600) * 3600) / 60
        ) *
          60),
  });

  const [whiteTimer, setWhiteTimer] = useState(initialTimerWhite);
  const [blackTimer, setBlackTimer] = useState(initialTimerBlack);

  const [isWhiteRunning, setIsWhiteRunning] = useState(false);
  const [isBlackRunning, setIsBlackRunning] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [lastPlayed, setLastPlayed] = useState("black");

  const [whiteDisabled, setWhiteDisabled] = useState(false);
  const [blackDisabled, setBlackDisabled] = useState(false);

  const [isWhiteLoser, setIsWhiteLoser] = useState(false);
  const [isBlackLoser, setIsBlackLoser] = useState(false);

  const [timers, dispatchTimers] = useReducer(timersReducer, {
    whiteMinutes: initialTimerWhite.minutes(),
    whiteSeconds: initialTimerWhite.seconds(),
    blackMinutes: initialTimerBlack.minutes(),
    blackSeconds: initialTimerBlack.seconds(),
  });

  const applyIncrement = (color) => {
    if (isPlaying) {
      if (color === "white") {
        let newTimerWhite = whiteTimer.add(increment, "s");
        setWhiteTimer(newTimerWhite);
        dispatchTimers({
          type: "UPDATE_WHITE",
          whiteMinutes: whiteTimer.minutes(),
          whiteSeconds: whiteTimer.seconds(),
        });
      }
      if (color === "black") {
        let newTimerBlack = blackTimer.add(increment, "s");
        setBlackTimer(newTimerBlack);
        dispatchTimers({
          type: "UPDATE_BLACK",
          blackMinutes: blackTimer.minutes(),
          blackSeconds: blackTimer.seconds(),
        });
      }
    }
  };

  useInterval(
    () => {
      if (whiteTimer <= 0 || blackTimer <= 0) {
        setIsPlaying(false);
        setIsWhiteRunning(false);
        setIsBlackRunning(false);
        setWhiteDisabled(true);
        setBlackDisabled(true);
        if (whiteTimer <= 0) {
          setIsWhiteLoser(true);
        } else if (blackTimer <= 0) {
          setIsBlackLoser(true);
        }
      } else {
        if (isWhiteRunning) {
          let newTimer = whiteTimer.subtract(1, "s");
          setWhiteTimer(newTimer);
          dispatchTimers({
            type: "UPDATE_WHITE",
            whiteMinutes: whiteTimer.minutes(),
            whiteSeconds: whiteTimer.seconds(),
          });
        } else if (isBlackRunning) {
          let newTimer = blackTimer.subtract(1, "s");
          setBlackTimer(newTimer);
          dispatchTimers({
            type: "UPDATE_BLACK",
            blackMinutes: blackTimer.minutes(),
            blackSeconds: blackTimer.seconds(),
          });
        }
      }
    },
    isPlaying ? 1000 : null
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={whiteDisabled}
        style={
          isWhiteRunning
            ? { ...styles.topTimerContainer, ...styles.selected }
            : { ...styles.topTimerContainer }
        }
        onPress={() => {
          setIsWhiteRunning(isPlaying ? false : true);
          setIsBlackRunning(isPlaying ? true : false);
          setIsPlaying(true);
          applyIncrement("white");
          setLastPlayed("white");
          setWhiteDisabled(isPlaying ? true : false);
          setBlackDisabled(isPlaying ? false : true);
        }}
      >
        <TimerDisplay
          minutes={timers.whiteMinutes}
          seconds={timers.whiteSeconds}
          reversed={true}
          isLoser={isWhiteLoser}
        />
        <TimerDisplay
          minutes={timers.blackMinutes}
          seconds={timers.blackSeconds}
          small={true}
          reversed={true}
        />
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <IconButton
          onPress={() => {
            props.navigation.navigate("Start");
          }}
          iconName={"ios-home"}
          iconGroup={Ionicons}
        />
        <IconButton
          onPress={() => {
            setIsBlackRunning(false);
            setIsWhiteRunning(false);
            setIsPlaying(false);
            setWhiteTimer(initialTimerWhite);
            setBlackTimer(initialTimerBlack);
            dispatchTimers({
              type: "UPDATE_WHITE",
              whiteMinutes: initialTimerWhite.minutes(),
              whiteSeconds: initialTimerWhite.seconds(),
            });
            dispatchTimers({
              type: "UPDATE_BLACK",
              blackMinutes: initialTimerBlack.minutes(),
              blackSeconds: initialTimerBlack.seconds(),
            });
            setWhiteDisabled(false);
            setBlackDisabled(false);
            setIsWhiteLoser(false);
            setIsBlackLoser(false);
          }}
          iconName={"restart"}
          iconGroup={MaterialCommunityIcons}
        />
        <IconButton
          onPress={() => {
            if (isPlaying) {
              setIsBlackRunning(false);
              setIsWhiteRunning(false);
              setIsPlaying(false);
            } else {
              setIsPlaying(true);
              if (lastPlayed === "white") {
                setIsWhiteRunning(true);
              } else if (lastPlayed === "black") {
                setIsBlackRunning(true);
              }
            }
          }}
          iconName={isPlaying ? "ios-pause" : "ios-play"}
          iconGroup={Ionicons}
        />
        <IconButton
          onPress={() => {
            props.navigation.navigate("Start");
          }}
          iconName={Platform.OS === "android" ? "md-settings" : "ios-settings"}
          iconGroup={Ionicons}
        />
      </View>
      <TouchableOpacity
        disabled={blackDisabled}
        style={
          isBlackRunning
            ? { ...styles.bottomTimerContainer, ...styles.selected }
            : { ...styles.bottomTimerContainer }
        }
        onPress={() => {
          setIsWhiteRunning(isPlaying ? true : false);
          setIsBlackRunning(isPlaying ? false : true);
          setIsPlaying(true);
          applyIncrement("black");
          setLastPlayed("black");
          setWhiteDisabled(isPlaying ? false : true);
          setBlackDisabled(isPlaying ? true : false);
        }}
      >
        <TimerDisplay
          minutes={timers.blackMinutes}
          seconds={timers.blackSeconds}
          isLoser={isBlackLoser}
        />
        <TimerDisplay
          minutes={timers.whiteMinutes}
          seconds={timers.whiteSeconds}
          small={true}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topTimerContainer: {
    flex: 45,
    margin: 20,
    borderRadius: 30,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flex: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 20,
  },
  bottomTimerContainer: {
    flex: 45,
    margin: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 1,
  },
});

export default TimerScreen;
