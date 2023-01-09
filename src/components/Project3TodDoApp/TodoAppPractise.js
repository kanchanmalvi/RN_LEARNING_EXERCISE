import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

const TodoAppPractise = () => {
  const [typeTask, setTypeTask] = useState('');
  const [listTask, setListTask] = useState([]);
  const [toggleIcon, setToggleIcon] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    storeData(listTask);
  }, [listTask]);

  //onsubmit
  const submit = () => {
    if (!typeTask) {
      console.log('Please fill the input box.');
    } else if (typeTask && !toggleIcon) {
      setListTask(
        listTask.map((item, i) => {
          if (i == isEdit) {
            return {...i, name: typeTask};
          }
          return i;
        }),
      );
      setToggleIcon(true);
      setTypeTask('');
      setIsEdit(null);
    } else {
      const allItemData = {id: new Date().getTime().toString(), name: typeTask};
      setListTask([...listTask, allItemData]);
      setTypeTask('');
    }
  };

  //async storage
  const storeData = async listTask => {
    try {
      const jsonValue = JSON.stringify(listTask);
      await AsyncStorage.setItem('listTask', jsonValue);
    } catch (e) {
      console.log(e, 'error');
    }
  };
  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('listTask');
      if (listTask != null) {
        setListTask(JSON.parse(data));
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };

  //delete

  const deleteTask = id => {
    console.log(id, 'id');
    const newList = listTask.filter((item, i) => i !== id);
    setListTask(newList);
  };

  //Update
  const updateTask = id => {
    console.log(id, 'edit id');
    const updatetask = listTask.find((item, i) => {
      return i == id;
    });
    setTypeTask(updatetask?.name);
    setIsEdit(id);
    setToggleIcon(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#0575E6" />
      <View style={styles.container_two}>
        <Text>Add Task</Text>
      </View>
      <View style={styles.container_two}>
        <TextInput
          placeholder="Enter your task"
          placeholderTextColor={'green'}
          value={typeTask}
          onChangeText={e => setTypeTask(e)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        {toggleIcon ? (
          <Button mode="contained" onPress={submit}>
            Add
          </Button>
        ) : (
          <Button mode="contained" onPress={submit}>
            Update
          </Button>
        )}
      </View>
      <View style={styles.textStyle}>
        <Text style={styles.textStyle}>See Your All Task Below...</Text>
        {/* List */}
        <FlatList
          data={listTask}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            return (
              <View style={styles.description}>
                <Text>{item.name}</Text>

                <View>
                  <TouchableOpacity onPress={() => deleteTask(index)}>
                    <Icon name="delete" size={25} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => updateTask(index)}>
                    <Icon
                      name="edit"
                      size={25}
                      color="blue"
                      style={{marginTop: 5}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonsContainer: {
    padding: 10,
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 15,
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
  },
});

export default TodoAppPractise;
