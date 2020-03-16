import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage
} from "react-native";
import Header from "./components/Header";
import DraggableFlatList from "react-native-draggable-flatlist";
import { Icon } from "react-native-elements";
import Switch from "expo-dark-mode-switch";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      onChangeText: "",
      isDarkMode: false
    };
  }

  async componentDidMount() {
    let tasks = JSON.parse(await AsyncStorage.getItem("tasks"));
    if (tasks == null) {
      tasks = [{ name: "Example task", id: 0 }];
    }
    let isDark = JSON.parse(await AsyncStorage.getItem("isDarkMode"));
    this.setState({ tasks: tasks, isDarkMode: !isDark });
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

  updateDarkMode = value => {
    this.setState({ isDarkMode: value });
    AsyncStorage.setItem("isDarkMode", this.state.isDarkMode.toString());
  };

  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 45,
          width: ScreenWidth,
          alignItems: "center",
          justifyContent: "center",
          borderBottomColor:
            this.state.isDarkMode === false ? "#ccc" : "#333333",
          borderBottomWidth: 1
        }}
        onLongPress={drag}
      >
        <View style={styles.buttonDelete}>
          <Icon
            name="ios-checkmark-circle-outline"
            type="ionicon"
            color="rgb(66, 133, 244)"
            underlayColor={this.state.isDarkMode === false ? "#fff" : "#202124"}
            size={35}
            onPress={() => this.deleteTask(item.id)}
          />
        </View>
        <Text
          style={[
            styles.textItem,
            { color: this.state.isDarkMode === false ? "black" : "#E4E6E9" }
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              this.state.isDarkMode === false ? "#fff" : "#202124"
          }
        ]}
      >
        <Header
          colorText={this.state.isDarkMode === false ? "#000" : "#E4E6E9"}
        />

        {/* List of tasks */}
        <View style={{ flex: 1 }}>
          <DraggableFlatList
            data={this.state.tasks}
            renderItem={this.renderItem}
            keyExtractor={(item, id) => `draggable-item-${item.id}`}
            onDragEnd={({ data }) => this.updateTask({ data })}
            extraData={this.state.isDarkMode}
          />
        </View>

        {/* TextInput to write task and button to add task */}
        <KeyboardAvoidingView behavior="padding" enabled>
          <TextInput
            style={[
              styles.textInput,
              { color: this.state.isDarkMode === false ? "#000" : "#E4E6E9" }
            ]}
            placeholder="New task"
            onChangeText={onChangeText => this.setState({ onChangeText })}
            value={this.state.onChangeText}
          />

          {/* Button to add new task */}
          <View style={styles.buttonAdd}>
            <Icon
              name="ios-add-circle-outline"
              type="ionicon"
              color="rgb(66, 133, 244)"
              underlayColor={
                this.state.isDarkMode === false ? "#fff" : "#202124"
              }
              size={55}
              onPress={this.addTask}
            />
          </View>
          <View style={styles.buttonDarkMode}>
            <Switch
              value={this.state.isDarkMode}
              onChange={value => this.updateDarkMode(value)}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    height: 20,
    width: ScreenWidth - 10
  },
  textItem: {
    fontSize: 18,
    top: -15,
    width: "100%",
    left: -ScreenWidth / 2 + 250
  },
  buttonDelete: {
    top: 12,
    left: -ScreenWidth / 2 + 20
  },
  buttonAdd: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  iconAdd: {
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
    top: 10,
    fontSize: 30
  },
  buttonAddText: {
    color: "white",
    fontFamily: "Roboto",
    fontSize: 17,
    top: 8
  },
  buttonDarkMode: {
    position: "absolute",
    left: ScreenWidth / 2 + 105,
    top: 35
  }
});
