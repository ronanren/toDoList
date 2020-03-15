import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

class Header extends Component {
  render() {
    return <Text style={styles.text}>My tasks</Text>;
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 34,
    marginTop: 35,
    marginBottom: 15,
    marginRight: 160,
    fontFamily: "Roboto"
  }
});

export default Header;
