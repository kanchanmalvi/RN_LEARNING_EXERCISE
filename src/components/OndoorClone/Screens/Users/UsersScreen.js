import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import UsersList from './UsersList';
import Adduser from './Adduser';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const UsersScreen = () => {
  return (
    <Stack.Navigator initialRouteName="userlist">
      <Stack.Screen
        name="userlist"
        component={UsersList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="adduser"
        component={Adduser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({});
