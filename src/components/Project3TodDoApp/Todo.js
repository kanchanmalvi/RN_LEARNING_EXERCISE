import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Todo = () => {
  const [text, setText] = useState(''); //user type a text in input
  const [addItems, setAdditems] = useState([]);
  const [toggleIcon, setToggleIcon] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

  const submit = () => {
    if (!text) {
      alert('please enter data');
    } else if (text && !toggleIcon) {
      setAdditems(
        addItems.map((item, i) => {
          if (i == isEdit) {
            return {...i, name: text};
          }
          return i;
        }),
      );
      setToggleIcon(true);
      setText('');
      setIsEdit(null);
    } else {
      const allItemData = {id: new Date().getTime().toString(), name: text};
      setAdditems([...addItems, allItemData]);
      setText('');
    }
  };
  const deleteItem = id => {
    const newList = addItems.filter((item, i) => i !== id);
    setAdditems(newList);
  };
  const editItem = id => {
    const editnewItem = addItems.find((item, i) => {
      return i == id;
    });
    setToggleIcon(false);
    setText(editnewItem.name);
    setIsEdit(id);
  };
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.heading}>Todo List</Text>
      </View>
      <View style={styles.container2}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Text"
          placeholderTextColor="black"
          value={text}
          onChangeText={todo => setText(todo)}
        />
        {toggleIcon ? (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon onPress={submit} name="plus" size={30} color="white" />
          </View>
        ) : (
          <TouchableOpacity onPress={submit}>
            <View style={styles.editIcon}>
              <Icon name="edit" size={30} color="red" />
            </View>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.shownTask}>Your Todo List</Text>
      <View>
        <FlatList
          data={addItems}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            return (
              <View style={styles.taskList}>
                <Text style={styles.shownTaskList}>{item.name}</Text>

                <TouchableOpacity onPress={() => editItem(index)}>
                  <View style={styles.editIcon}>
                    <Icon name="edit" size={30} color="red" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteItem(index)}>
                  <View style={styles.trashIcon}>
                    <Icon name="trash" size={30} color="red" />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'green',
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
    margin: 10,
    fontWeight: 'bold',
  },
  container2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#D3F19F',
    padding: 20,
  },

  TextInput: {
    height: 50,
    padding: 10,
    fontSize: 20,
  },

  shownTask: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    margin: 20,
  },
  taskList: {
    backgroundColor: '',
    margin: 10,
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
  shownTaskList: {
    fontSize: 20,
    color: 'black',
  },
  shownTaskListDelete: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: 100,
  },
});

export default Todo;
