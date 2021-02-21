import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import SelectTimer from "../components/SelectTimer";
import Colors from "../constants/Colors";
import IconButton from "../components/IconButton";
import { TIMERS } from "../data/data";

const SelectScreen = (props) => {
  let selectedArray = [];
  for (let i = 0; i < TIMERS.length; i++) {
    let obj = {
      selected: false,
      id: TIMERS[i].id,
    };
    selectedArray[i] = obj;
  }

  const [selectedChanged, setSelectedChanged] = useState(false);
  const [selectedId, setSelected] = useState(0);

  const renderTimer = (itemData) => {
    let selected = selectedArray.filter(
      (select) => select.id === itemData.item.id
    );

    const chooseSelected = (id) => {
      for (let i = 0; i < selectedArray.length; i++) {
        if (selectedArray[i].id === id) {
          selectedArray[i].selected = true;
          setSelected(i);
        } else {
          selectedArray[i].selected = false;
        }
      }
      setSelectedChanged(!selectedChanged);
      console.log(selectedArray);
      console.log(selectedArray[selectedId].selected);
    };

    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => chooseSelected(itemData.item.id)}
        >
          <SelectTimer
            text={itemData.item.name}
            selected={selectedArray[selectedId].selected}
          />
        </TouchableOpacity>
        <IconButton
          color={Colors.red}
          iconName="trash"
          iconGroup={EvilIcons}
          onPress={() => console.log("Pressed")}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={TIMERS}
        renderItem={renderTimer}
        style={styles.flatlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    paddingTop: 20,
  },
  touchable: {
    flex: 1,
  },
  buttonContainer: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  flatlist: {
    width: "90%",
    height: "7%",
  },
});

export default SelectScreen;
