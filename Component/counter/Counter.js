import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, getCounterValue} from '../../src/StoreSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Counter = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  const incrementValue = async () => {
    dispatch(increment());
    try {
      await AsyncStorage.setItem('incValue', JSON.stringify(increment()));
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const decrementValue = async () => {
    dispatch(decrement());
    try {
      await AsyncStorage.setItem('decValue', JSON.stringify(decrement()));
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const getCounter = () => {
    dispatch(getCounterValue());
  };

  return (
    <View>
      <Text>Counter</Text>

      <Button title="Increment value" onPress={incrementValue}>
        Increment
      </Button>

      <View>
        <Text>{count}</Text>
      </View>
      <Button title="Decrement value" onPress={decrementValue}>
        Decrement
      </Button>

      <Button style={styles.getValueBtn} title="Get value" onPress={getCounter}>
        Get Value
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  getValueBtn: {
    marginTop: 10,
  },
});

export default Counter;
