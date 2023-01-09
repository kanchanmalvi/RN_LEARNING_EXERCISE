import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Form from './Form';

const AsyncLogin = ({navigation}) => {
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');

  const [getNameValue, setGetNameValue] = useState('');
  const [getPassValue, setGetPassValue] = useState('');

  const handle = () => {
    AsyncStorage.setItem('Name', name);
    AsyncStorage.setItem('Password', pwd);
    navigation.navigate('form',{"name":getNameValue , "password": getPassValue });
    setName('');
    setPwd('');
  };

  const getData = () => {
    AsyncStorage.getItem('Name').then(value => setGetNameValue(value));
    AsyncStorage.getItem('Password').then(value => setGetPassValue(value));
  };

  useEffect(() => {
    getData();    
  }, []);
  
  useEffect(() => {
   
    if(getNameValue && getPassValue){
      navigation.navigate('form',{"name":getNameValue , "password": getPassValue });
    }
  }, [getNameValue,getPassValue]);

  const remove = () => {
    AsyncStorage.removeItem('Name').then(value => setGetNameValue(value));
    AsyncStorage.removeItem('Password').then(value => setGetPassValue(value));
  };

  return (
    <View>
      <Text>AsyncLogin</Text>
      <Text>Name of the user:</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={e => setName(e)}
      />
      <Text>Password of the user:</Text>
      <TextInput
        placeholder="Password"
        value={pwd}
        onChangeText={e => setPwd(e)}
      />

      <Button
        style={{margin: 10}}
        icon="plus"
        mode="contained"
        onPress={handle}>
        Done
      </Button>

      <Button
        style={{margin: 10}}
        icon="plus"
        mode="contained"
        onPress={getData}>
        get data
      </Button>

      <Button style={{margin: 10}} mode="contained" onPress={remove}>
        Remove name/Password
      </Button>

      <Text style={styles.textStyle}>{getNameValue}</Text>
      <Text style={styles.textStyle}>{getPassValue}</Text>
    </View>
  );
};

export default AsyncLogin;

const styles = StyleSheet.create({});
