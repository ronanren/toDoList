import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [{name: "tache 1"}, {name: "tache 2"}],
      onChangeText: "New task",

    };
  }
  addTask = () => {
    let tasks = [...this.state.tasks];

    // Add item to it
    tasks.push({ name: this.state.onChangeText});

    // Set state
    this.setState({ tasks });
  }

  deleteTask = () => {
    let tasks = [...this.state.tasks];

    // Add item to it
    tasks.push({ name: this.state.onChangeText});

    // Set state
    this.setState({ tasks });
  }


  render() {

    return (
      <View style={styles.container}>
          <Text style={styles.text}>To Do List</Text>
          <FlatList
          data={this.state.tasks}
          renderItem={({item}) => 
          <View>
            <Button style={styles.buttonDelete} onPress={this.deleteTask} title="X" color="#841584"/>
            <Text style={styles.item}>{item.name}</Text>
            
            </View> }
          keyExtractor={(item, index) => index.toString()}/>
          <KeyboardAvoidingView behavior="padding" enabled>
          <TextInput
          style={styles.textInput}
          onChangeText={onChangeText => this.setState({onChangeText})}
          value={this.state.onChangeText}
          />
          <Button
            onPress={this.addTask}
            title="Add"
            color="#841584"
            />
          </KeyboardAvoidingView>
          
          
      </View>

    );
} }

let ScreenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 45,
      marginTop: 5,
      width: ScreenWidth,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    },
    text: {
      fontSize: 25,
      marginTop: 15, 
      marginBottom: 20
    },
    textInput: {
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1,
      width: ScreenWidth,
      marginBottom: 20,
    },
    buttonDelete: {

    },
});