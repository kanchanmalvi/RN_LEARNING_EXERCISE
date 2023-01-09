import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Todo from './src/components/Project3TodDoApp/Todo';
import TodoAppPractise from './src/components/Project3TodDoApp/TodoAppPractise';
import HeaderNote from './src/components/Project1NoteTakingApp/HeaderNote';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="todopratice"
          component={TodoAppPractise}
          options={{headerShown: false}}
        />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
