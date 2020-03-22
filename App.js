import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  TouchableWithoutFeedback
} from "react-native";
import Header from "./components/Header";
import DraggableFlatList from "react-native-draggable-flatlist";
import { Icon } from "react-native-elements";
import Switch from "expo-dark-mode-switch";
import * as Animatable from "react-native-animatable";

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

  /* Each task to render in a draggable list */
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
        {/* Button to delete task */}
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
        {/* Text of task */}
        <Text
          style={[
            styles.textItem,
            {
              color: this.state.isDarkMode === false ? "black" : "#E4E6E9"
            }
          ]}
        >
          {item.name}
        </Text>
        <View style={styles.buttonDetails}>
          <Icon
            name="ios-menu"
            type="ionicon"
            color="rgb(66, 133, 244)"
            underlayColor={this.state.isDarkMode === false ? "#fff" : "#202124"}
            size={35}
          />
        </View>
      </TouchableOpacity>
    );
  };

  /* Animation of button to add tasks */
  handleViewRef = ref => (this.view = ref);
  animation = () => {
    this.view.animate({
      from: {
        opacity: 1,
        scale: 1
      },
      0.5: {
        opacity: 0.4,
        scale: 0.9
      },
      to: {
        opacity: 1,
        scale: 1
      }
    });
    this.addTask();
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
        {/* Title at the top of the application */}
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

        <KeyboardAvoidingView behavior="padding">
          {/* TextInput to write task */}
          <TextInput
            style={[
              styles.textInput,
              {
                color: this.state.isDarkMode === false ? "#000" : "#E4E6E9"
              }
            ]}
            placeholder="New task"
            placeholderTextColor={
              this.state.isDarkMode === false ? "#999" : "#E4E6E9"
            }
            onChangeText={onChangeText => this.setState({ onChangeText })}
            value={this.state.onChangeText}
          />
          {/* Button to add new task */}
          <View style={styles.buttonAdd}>
            <TouchableWithoutFeedback onPress={this.animation}>
              <Animatable.View ref={this.handleViewRef}>
                <Icon
                  name="ios-add-circle-outline"
                  type="ionicon"
                  color="rgb(66, 133, 244)"
                  underlayColor={
                    this.state.isDarkMode === false ? "#fff" : "#202124"
                  }
                  size={55}
                />
              </Animatable.View>
            </TouchableWithoutFeedback>
          </View>
          {/* Button to change to dark/light mode */}
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
    left: -ScreenWidth / 2 + 25
  },
  buttonDetails: {
    position: "absolute",
    top: 5,
    left: ScreenWidth - 40
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
    fontSize: 17,
    top: 8
  },
  buttonDarkMode: {
    position: "absolute",
    left: ScreenWidth / 2 + 105,
    top: 35
  }
});
