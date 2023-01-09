import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  value: 0,
};

export const StoreSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    getCounterValue: state => {
      AsyncStorage.getItem('incValue').then(result => {
        state.value = result;
      });
    },
    decrement: state => {
      if (state.value > 0) {
        state.value -= 1;
      } else {
        alert('Value should not be in Minus');
      }
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {increment, decrement, incrementByAmount, getCounterValue} =
  StoreSlice.actions;

export default StoreSlice.reducer;
