import React, { Component } from 'react';
 import { Text, View, StyleSheet } from 'react-native';

class Header extends Component {
  render() {
    return (
    	<Text style={styles.text}>To Do List</Text>
    );
  }
}
const styles = StyleSheet.create({
    text: {
      fontSize: 25,
      marginTop: 15, 
      marginBottom: 20,
      fontFamily: "Roboto",
    },
});

export default Header;