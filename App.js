import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HeaderNote from './Component/Project1NoteTakingApp/HeaderNote';
import Counter from './Component/counter/Counter';
import Async_Storage from './Component/Async_Storage';
import {Axios} from 'axios';
import AxiosApi from './Component/Project4CRUD/AxiosApi';
import FormModal from './Component/Project5UIJSONDATA/FormModal';
import Login from './Component/Project2OnlineEdu/Screens/Login';
import FetchJson from './Component/FetchJson';
import AsyncLogin from './Component/AsyncLogin';
import Form from './Component/Form';
import Infinitescroll from './Component/Infinitescroll';
import Home from './Component/Project2OnlineEdu/Screens/Home';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="asynclogin"
          component={AsyncLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="form"
          component={Form}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
