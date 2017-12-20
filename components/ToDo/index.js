import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

class ToDo extends React.Component {
  propTypes = {};
  render() {
    const { toDo } = this.props;
    return (
      <View>
        <Text>{toDo.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default ToDo;
