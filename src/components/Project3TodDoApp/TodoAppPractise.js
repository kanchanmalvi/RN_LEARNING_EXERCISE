import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
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
          console.log(item, 'iiiiiiiiiiiiiiii');
          if (item == isEdit) {
            return {...item, name: typeTask};
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
      <StatusBar animated={true} backgroundColor="black" />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../../Assets/images/todo.png')}
          style={{width: 180, height: 180}}
        />
      </View>
      <View style={styles.container_View_style}>
        <Text style={styles.container_two_text}>Add Task</Text>
      </View>
      <View style={styles.container_View_style}>
        <TextInput
          placeholder="Enter your task"
          placeholderTextColor={'white'}
          value={typeTask}
          onChangeText={e => setTypeTask(e)}
          style={styles.container_textput_style}
        />
      </View>
      <View style={styles.buttonsContainer}>
        {toggleIcon ? (
          <TouchableOpacity onPress={submit} style={styles.btnstyle}>
            <Text style={styles.btntextstyle}>Add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={submit} style={styles.btnstyle}>
            <Text style={styles.btntextstyle}>Update</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.flateStyle}>
        <Text style={styles.textStyle}>See Your All Task Below...</Text>
        {/* List */}
        {listTask.length === 0 ? (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <Text style={{color: 'white'}}>No Todos Found</Text>
          </View>
        ) : (
          <FlatList
            data={listTask}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => {
              return (
                <View style={styles.description}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      width: 250,
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        color: '#0f3443',
                        fontSize: 15,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={styles.description_icon}>
                    <TouchableOpacity onPress={() => deleteTask(index)}>
                      <Icon
                        name="delete"
                        size={25}
                        color="red"
                        style={{margin: 5}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => updateTask(index)}>
                      <Icon
                        name="edit"
                        size={25}
                        color="#20e3b2"
                        style={{margin: 5}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    borderTopColor: 'white',
    borderWidth: 1,
  },
  buttonsContainer: {
    padding: 10,
  },
  flateStyle: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 15,
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    padding: 10,
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  description_icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container_View_style: {
    margin: 10,
  },
  container_two_text: {
    textAlign: 'center',
    color: 'orange',
    fontSize: 20,
  },
  container_textput_style: {
    borderWidth: 1,
    borderColor: 'orange',
    padding: 14,
    color: 'white',
    fontSize: 16,
    borderRadius: 3,
  },
  btnstyle: {
    backgroundColor: 'orange',
    padding: 14,
    borderRadius: 5,
  },
  btntextstyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});

export default TodoAppPractise;
