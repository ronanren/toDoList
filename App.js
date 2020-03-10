import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Header from "./components/Header";
import DraggableFlatList from "react-native-draggable-flatlist";
import SwipeableItem from "react-native-swipeable-item";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      onChangeText: ""
    };
  }

  async componentDidMount() {
    let tasks = JSON.parse(await AsyncStorage.getItem("tasks"));
    if (tasks == null) {
      tasks = [{ name: "Example task", id: 0 }];
    }
    this.setState({ tasks: tasks });
  }

  addTask = () => {
    if (this.state.onChangeText != "") {
      let tasks = [...this.state.tasks];
      tasks.push({
        name: this.state.onChangeText,
        id: this.state.tasks.length
      });
      this.setState({ tasks, onChangeText: "" });
      AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  deleteTask = id => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(x => {
      return x.id != id;
    });
    tasks = tasks.map(function(item, id) {
      item.id = id;
      return item;
    });
    this.setState({ tasks });
    AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  };

  updateTask = data => {
    let tasks = Object.keys(data.data)
      .map(i => data.data[i])
      .map(function(item, id) {
        item.id = id;
        return item;
      });
    this.setState({ tasks });
    AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  };

  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 45,
          width: ScreenWidth,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1
        }}
        onLongPress={drag}
      >
        {/*
        <View style={styles.buttonDelete}>
          <Button
            title="X"
            color="#ccc"
            onPress={() => this.deleteTask(item.id)}
          />
        </View>
        */}
        <Text
          style={{
            color: "black",
            fontSize: 18
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />

        {/* List of tasks */}
        <View style={{ flex: 1 }}>
          <DraggableFlatList
            data={this.state.tasks}
            renderItem={this.renderItem}
            keyExtractor={(item, id) => `draggable-item-${item.id}`}
            onDragEnd={({ data }) => this.updateTask({ data })}
          />
        </View>

        {/* TextInput to write task and button to add task */}
        <KeyboardAvoidingView behavior="padding" enabled>
          <TextInput
            style={styles.textInput}
            placeholder="New task"
            onChangeText={onChangeText => this.setState({ onChangeText })}
            value={this.state.onChangeText}
          />

          {/* Button to add new task */}
          <View style={styles.buttonAdd}>
            <TouchableOpacity
              onPress={this.addTask}
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
            >
              <Text style={styles.buttonAddText}>+ Add a new task</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

let ScreenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    height: 40,
    width: ScreenWidth - 10,
    marginBottom: 20
  },
  buttonDelete: {
    top: 12,
    left: -ScreenWidth / 2 + 20
  },
  buttonAdd: {
    padding: 5,
    height: 50,
    width: 150,
    borderRadius: 100,
    backgroundColor: "rgb(66, 133, 244)",
    marginLeft: "auto",
    marginRight: "auto"
  },
  buttonAddText: {
    color: "white",
    fontFamily: "Roboto",
    fontSize: 17,
    top: 8
  }
});
