import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

const { height, width } = Dimensions.get("window");

class App extends React.Component {
  state = {
    newTodo: ""
  };
  render() {
    const { newTodo } = this.state;
    return (
      <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={styles.card}>
            <TextInput
              value={newTodo}
              style={newTodo}
              onChangeText={this._controllNewTodo}
              placeholderTextColor={"#999"}
              placeholder={"New To Do"}
              onEndEditing={this._addToDo}
              returnKeyType={"done"}
              style={styles.newTodo}
              blurOnSubmit={true}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  _controllNewTodo = text => {
    this.setState({
      newTodo: text
    });
  };
  _dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  _addToDo = () => {
    this._dismissKeyboard();
    this.setState({
      newTodo: ""
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  },
  card: {
    flex: 1,
    width: width - 50,
    backgroundColor: "white",
    marginTop: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOffset: {
          height: -1,
          width: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: 5
      },
      android: {
        elevation: 3
      }
    })
  },
  newTodo: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 20
  }
});

export default App;
