import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import NoteContext from './NoteContext';

const AddNotes = () => {
  const a = useContext(NoteContext);
  const [addTitle, setAddTitle] = useState('');
  const [addDesc, setAddDesc] = useState('');

  const submit = () => {
    setAddTitle('');
    setAddDesc('');
  };

  return (
    <View>
      <Text
        style={{
          color: 'green',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 10,
        }}>
        PostForm
      </Text>

      <View>
        <TextInput
          style={{
            bordercolor: 'grey',
            fontSize: 20,
            textAlign: 'left',
            marginTop: 10,
            borderWidth: 2,
          }}
          value={addTitle}
          onChangeText={event => setAddTitle(event)}
          placeholder="Enter your name"
        />
        <TextInput
          style={{
            bordercolor: 'grey',
            fontSize: 20,
            textAlign: 'left',
            marginTop: 10,
            borderWidth: 2,
          }}
          value={addDesc}
          onChangeText={event => setAddDesc(event)}
          placeholder="Enter your name"
        />
      </View>
      <View>
        <TouchableOpacity
          style={{fontSize: 20, textAlign: 'left', marginTop: 10}}>
          <Text
            style={{
              backgroundColor: 'green',
              color: 'white',
              fontSize: 20,
              textAlign: 'left',
              margin: 10,
              padding: 10,
            }}
            onPress={submit}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNotes;

const styles = StyleSheet.create({});
