import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";

const { height, width } = Dimensions.get("window");

class ToDo extends React.Component {
  static propTypes = {};
  render() {
    const { id, text, isCompleted } = this.props;
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.text,
            isCompleted ? styles.completedText : styles.uncompletedText
          ]}
        >
          {text}
        </Text>
        <TouchableOpacity>
          <View
            style={[
              styles.radio,
              isCompleted ? styles.radioComplete : styles.radioUncomplete
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: width - 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20,
    marginHorizontal: 20
  },
  uncompletedText: { color: "#353839" },
  completedText: { color: "#bbb", textDecorationLine: "line-through" },
  radio: {
    width: 30,
    height: 30,
    borderWidth: 3,
    borderRadius: 15,
    marginLeft: 30
  },
  radioComplete: {
    borderColor: "#bbb"
  },
  radioUncomplete: {
    borderColor: "#F23657"
  }
});

export default ToDo;
