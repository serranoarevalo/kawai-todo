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
    const { id, text, isCompleted, uncomplete, complete } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity
            onPressOut={() => (isCompleted ? uncomplete(id) : complete(id))}
          >
            <View
              style={[
                styles.radio,
                isCompleted ? styles.radioComplete : styles.radioUncomplete
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              isCompleted ? styles.completedText : styles.uncompletedText
            ]}
          >
            {text}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>✏️</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>❌</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    marginVertical: 20
  },
  uncompletedText: { color: "#353839" },
  completedText: { color: "#bbb", textDecorationLine: "line-through" },
  radio: {
    width: 30,
    height: 30,
    borderWidth: 3,
    borderRadius: 15,
    marginRight: 30
  },
  radioComplete: {
    borderColor: "#bbb"
  },
  radioUncomplete: {
    borderColor: "#F23657"
  },
  column: {
    width: width / 2,
    flexDirection: "row",
    alignItems: "center"
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginHorizontal: 5
  },
  actionText: {
    fontSize: 15
  }
});

export default ToDo;
