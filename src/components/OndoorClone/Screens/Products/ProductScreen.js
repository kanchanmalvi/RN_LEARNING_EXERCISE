import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AddProduct from './AddProduct';
import Produclist from './Productlist';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UpdateProduct from './UpdateProduct';

const Stack = createNativeStackNavigator();

const ProductScreen = () => {
  return (
    <Stack.Navigator initialRouteName="productlist">
      <Stack.Screen
        name="productlist"
        component={Produclist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="addproduct"
        component={AddProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="updateproduct"
        component={UpdateProduct}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
