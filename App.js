import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  useNavigation,
} from '@react-navigation/native-stack';
import OndoorLogin from './src/components/OndoorClone/Screens/OndoorLogin';
import Produclist from './src/components/OndoorClone/Screens/Products/Produclist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddProduct from './src/components/OndoorClone/Screens/Products/AddProduct';
import {setSignIn} from './src/Features/authTokenSlice';
import {useDispatch} from 'react-redux';
import UsersList from './src/components/OndoorClone/Screens/Users/UsersList';
import Adduser from './src/components/OndoorClone/Screens/Users/Adduser';

const Stack = createNativeStackNavigator();

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const setToken = AsyncStorage.getItem('token');
  //   if (setToken) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="ondoorlogin"
          component={OndoorLogin}
          options={{headerShown: false}}
        />

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
    </NavigationContainer>
  );
};

export default App;
