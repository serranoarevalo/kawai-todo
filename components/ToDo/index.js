import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput
} from "react-native";

const { height, width } = Dimensions.get("window");

class ToDo extends React.Component {
  state = {
    isEditing: false
  };
  static propTypes = {};
  render() {
    const { id, text, isCompleted, uncomplete, complete } = this.props;
    const { isEditing, toDo } = this.state;
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
          {isEditing ? (
            <TextInput
              multiline={true}
              onChangeText={this._controlText}
              onEndEditing={this._endEditing}
              value={toDo}
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
            >
              {text}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._endEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
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
        )}
      </View>
    );
  }
  _startEditing = () => {
    const { text } = this.props;
    this.setState({
      isEditing: true,
      toDo: text
    });
  };
  _controlText = text => {
    this.setState({
      toDo: text
    });
  };
  _endEditing = () => {
    const { toDo } = this.state;
    const { updateToDo, id } = this.props;
    updateToDo(id, toDo);
    this.setState({
      isEditing: false
    });
  };
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
  input: {
    width: width / 1.5,
    marginVertical: 15,
    paddingBottom: 5
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
    marginHorizontal: 10
  },
  actionText: {
    fontSize: 15
  }
});

export default ToDo;
