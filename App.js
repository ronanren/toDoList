import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Header from "./components/Header";

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

  upTask = id => {
    console.log(this.state.tasks);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        {/* List of tasks with delete button */}

        <FlatList
          data={this.state.tasks}
          renderItem={({ item }) => (
            <View>
              <View style={styles.buttonDelete}>
                <Button
                  onPress={() => this.deleteTask(item.id)}
                  title=""
                  color="#4285f4"
                />
              </View>
              <Text style={styles.item}>{item.name}</Text>
              <View style={styles.buttonUp}>
                <Button
                  onPress={() => this.upTask(item.id)}
                  title="↑"
                  color="#ccc"
                />
              </View>
            </View>
          )}
          keyExtractor={(item, id) => id.toString()}
        />

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
  item: {
    padding: 10,
    fontSize: 18,
    height: 45,
    marginTop: 5,
    paddingLeft: 60,
    width: ScreenWidth,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  textInput: {
    height: 40,
    width: ScreenWidth - 10,
    marginBottom: 20
  },
  buttonDelete: {
    zIndex: 1,
    position: "relative",
    marginBottom: -30,
    top: 10,
    left: 10,
    width: 40
  },
  buttonUp: {
    zIndex: 0,
    position: "absolute",
    left: ScreenWidth - 50,
    width: 20,
    top: 10
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
