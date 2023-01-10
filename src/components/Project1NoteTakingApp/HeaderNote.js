import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Searchbar from './Searchbar';

const HeaderNote = () => {
  const [username, setUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [addNote, setAddNote] = useState('');
  const [addNoteItems, setAddNoteitems] = useState([]);
  const [toggleIcon, setToggleIcon] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

  const submit = () => {
    if (!addNote) {
      alert('Please add a note.');
    } else if (addNote && !toggleIcon) {
      setAddNoteitems(
        addNoteItems.map((item, i) => {
          if (i == isEdit) {
            return {...i, name: addNote};
          }
          return i;
        }),
      );
      setToggleIcon(true);
      setAddNote('');
      setIsEdit(null);
    } else {
      const allItemData = {id: new Date().getTime().toString(), name: addNote};
      setAddNoteitems([...addNoteItems, allItemData]);
      setAddNote('');
    }
  };
  const editItem = id => {
    const editnewItem = addNoteItems.find((item, i) => {
      return i == id;
    });
    setToggleIcon(false);
    setAddNote(editnewItem.name);
    setIsEdit(id);
  };
  const deleteItem = id => {
    const newList = addNoteItems.filter((item, i) => i !== id);
    setAddNoteitems(newList);
  };

  const getValueFunction = () => {
    const result = AsyncStorage.getItem('any_key_here_for_username');
    console.log(result, 'username');
  };

  useEffect(() => {
    getValueFunction();
  }, []);

  const userDeatails = () => {
    if (username) {
      AsyncStorage.setItem(
        'any_key_here_for_username',
        JSON.stringify(username),
      );
      setModalVisible(true);
      setUsername('');
      console.log(username, '62');
    } else if (!username) {
      alert('Please enter Username.');
    } else {
      null;
    }
  };

  useEffect(() => {
    userDeatails();
  });

  return (
    <View style={styles.Heading}>
      <Text style={styles.Heading}>Note Taking App</Text>

      <Image
        source={require('../../../Assets/images/notetaking.png')}
        style={{margin: 20, width: 350, height: 250}}
      />

      <View style={styles.user_name}>
        <TextInput
          style={styles.textStyle}
          placeholder="Enter your name"
          placeholderTextColor="black"
          value={username}
          onChangeText={nameUser => setUsername(nameUser)}
        />
      </View>

      <View style={styles.container}>
        {username.trim().length > 4 ? (
          <Text onPress={userDeatails} style={styles.AddNote}>
            Press To Continue...
          </Text>
        ) : null}
      </View>

      <View style={{backgroundColor: 'red', width: '100%'}}>
        <Modal
          style={{backgroundColor: 'black'}}
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <Pressable
            style={styles.modal_background}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{fontSize: 20}}> Add Here Your Notes</Text>
            <Text style={{fontSize: 20, color: 'black'}}> Close</Text>
            <TextInput
              style={styles.textStyle}
              placeholder="Enter a note..."
              placeholderTextColor="black"
              value={addNote}
              onChangeText={note => setAddNote(note)}
            />

            <View>
              {toggleIcon ? (
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    style={styles.plusIcon}
                    onPress={submit}
                    name="plus"
                    size={30}
                    color="red"
                  />
                </View>
              ) : (
                <TouchableOpacity onPress={submit}>
                  <View style={styles.editIcon}>
                    <Icon
                      style={styles.plusEditIcon}
                      name="edit"
                      size={30}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <Searchbar />

            <FlatList
              data={addNoteItems}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.taskList}>
                    <Text style={styles.boxText}>{item.name}</Text>

                    <TouchableOpacity onPress={() => editItem(index)}>
                      <View style={styles.editIcon}>
                        <Icon
                          style={styles.iconEdit}
                          name="edit"
                          size={30}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteItem(index)}>
                      <View style={styles.trashIcon}>
                        <Icon
                          style={styles.iconDel}
                          name="trash"
                          size={30}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </Pressable>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Heading: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'JosefinSans-SemiBold',
    marginTop: 30,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AddNote: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#3333cc',
    padding: 15,
    fontFamily: 'JosefinSans-SemiBold',
  },
  modal_background: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#f0eafc',
    borderWidth: 5,
    padding: 10,
    margin: 10,
  },
  textStyle: {
    borderColor: '#3333cc',
    borderWidth: 2,
    color: 'grey',
    width: '90%',
    margin: 20,
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 20,
    borderRadius: 5,
  },
  plusIcon: {
    color: 'white',
    backgroundColor: '#3333cc',
    padding: 10,
    borderRadius: 5,
    marginLeft: 270,
    marginBottom: 10,
  },

  boxText: {
    color: 'black',
    fontSize: 20,
    padding: 10,
    width: 500,
  },
  taskList: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconEdit: {
    backgroundColor: '#7a8fd3',
    padding: 10,
    margin: 10,
  },
  iconDel: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  plusEditIcon: {
    color: 'white',
    backgroundColor: '#3333cc',
    padding: 10,
    borderRadius: 5,
    marginLeft: 270,
    marginBottom: 10,
  },
});

export default HeaderNote;

// Color Code - "#6600ff"
