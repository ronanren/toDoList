import React from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList, Dimensions } from 'react-native';

export default function App() {
    
    state = { tasks: [ {name: 'Buy water'},
            {name: 'Study sciences'}] };
    return (
      <View style={styles.container}>
          <Text style={styles.text}>To Do List</Text>
          <FlatList
          data={state.tasks}
          renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}/>
          <Button
            onPress={() => Alert.alert('Add tasks')}
            title="Add"
            color="#841584"
            />
      </View>

    );
}

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
    }
});