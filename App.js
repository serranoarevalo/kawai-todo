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
  Keyboard,
  AsyncStorage,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newToDo: "",
      loadedToDos: false
    };
  }
  componentDidMount() {
    this._loadTodos();
  }
  render() {
    const { newToDo, loadedToDos } = this.state;
    console.log(this.state);
    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Text style={styles.title}>Kawai To Do</Text>
          <View style={styles.card}>
            <TextInput
              value={newToDo}
              style={newToDo}
              onChangeText={this._controllNewToDo}
              placeholderTextColor={"#999"}
              placeholder={"New To Do"}
              onSubmitEditing={this._addToDo}
              returnKeyType={"done"}
              style={styles.newToDo}
              blurOnSubmit={true}
            />
            <KeyboardAvoidingView>
              <ScrollView />
            </KeyboardAvoidingView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  _controllNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
  _dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  _addToDo = async () => {
    const { newToDo, toDos } = this.state;
    let newState;
    this._dismissKeyboard();
    this.setState(prevState => {
      const newToDoObject = {
        id: uuidv1(),
        isCompleted: false,
        text: newToDo
      };
      newState = {
        ...prevState,
        toDos: [...prevState.toDos, newToDoObject],
        newToDo: ""
      };
      const saveState = AsyncStorage.setItem(
        "toDos",
        JSON.stringify(newState.toDos)
      );
      return { ...newState };
    });
  };
  _loadTodos = async () => {
    try {
      const toDos = (await AsyncStorage.getItem("toDos")) || [];
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        loadedToDos: true,
        toDos: parsedToDos
      });
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  },
  title: {
    marginTop: 50,
    marginBottom: 30,
    fontSize: 30,
    color: "white",
    fontWeight: "200"
  },
  card: {
    flex: 1,
    width: width - 25,
    backgroundColor: "white",
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
  newToDo: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 20
  }
});

export default App;
