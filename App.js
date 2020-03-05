import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [{name: "tache 1", index: 0}, {name: "tache 2", index: 1}],
      onChangeText: "",

    };
  }

  addTask = () => {
    let tasks = [...this.state.tasks];

    // Add item to it
    tasks.push({ name: this.state.onChangeText, index: this.state.tasks.length + 1});

    // Set state
    this.setState({tasks, onChangeText: ""});
  }

  deleteTask = (index) => {
    let tasks = [...this.state.tasks];
    console.log(index);
    // Add item to it
    tasks = tasks.filter(x => {return x.index != index;});

    // Set state
    this.setState({tasks});
  }


  render() {

    return (
      <View style={styles.container}>
          <Text style={styles.text}>To Do List</Text>
          <FlatList
          data={this.state.tasks}
          renderItem={({item}) => 
          <View>
          <View style={styles.buttonDelete}>
            <Button onPress={() => this.deleteTask(item.index)} title="X"/>
          </View>
            <Text style={styles.item}>{item.name}</Text>
            
            </View> }
          keyExtractor={(item, index) => index.toString()}/>
          <KeyboardAvoidingView behavior="padding" enabled>
          <TextInput
          style={styles.textInput}
          placeholder="New task"
          onChangeText={onChangeText => this.setState({onChangeText})}
          value={this.state.onChangeText}
          />
          <Button
            onPress={this.addTask}
            title="Add task"
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
      paddingLeft: 60,
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
      zIndex: 1,
      position: 'relative',
      marginBottom: -30,
      top: 10,
      left: 10,
      width: 40,
    },
});