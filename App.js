import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Dimensions, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [{name: "tache 1", index: 0}, {name: "tache 2", index: 1}],
      onChangeText: "",

    };
  }

  addTask = () => {
    if (this.state.onChangeText != ""){
      let tasks = [...this.state.tasks];
      tasks.push({ name: this.state.onChangeText, index: this.state.tasks.length + 1});
      this.setState({tasks, onChangeText: ""});
    }
  }

  deleteTask = (index) => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(x => {return x.index != index;});
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
          <View style={styles.buttonAdd} >
            <TouchableOpacity onPress={this.addTask} >
                <Text style={styles.buttonAddText}>+</Text>
            </TouchableOpacity>
          </View>
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
    buttonAdd: {
      padding: 5,
      height: 50,
      width: 50,
      borderRadius: 100,  
      backgroundColor:'rgba(53, 59, 72,1.0)',
      
    },
    buttonAddText: {
      color: "white",
      fontSize: 50,
      bottom: 15,
      left: 5,
    },

});