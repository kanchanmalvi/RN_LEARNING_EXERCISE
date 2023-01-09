import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import jsonData from '../db.json';
import {TextInput} from 'react-native-paper';
console.log(jsonData, 'data');

const FetchJson = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  return (
    <View>
      <Text>FetchJson</Text>

      <View style={styles.inputStyle}>
        <TextInput
          placeholder=" enter name"
          value={name}
          onChangeText={value => setName(value)}
        />
      </View>
      <View style={styles.inputStyle}>
        <TextInput
          placeholder=" enter title"
          value={title}
          onChangeText={value => setTitle(value)}
        />
      </View>

      <View style={styles.inputStyle}>
        {jsonData.post.map((data, index) => {
          return (
            <View key={index}>
              <Text>{data.name}</Text>
              <Text>{data.title}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {margin: 10},
});
export default FetchJson;
