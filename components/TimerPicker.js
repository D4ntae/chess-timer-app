import React, { useState } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";

const TimerPicker = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View>
      <Modal transparent={true} visible={modalVisible}>
        <View>
          <Text>Testing...</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TimerPicker;
