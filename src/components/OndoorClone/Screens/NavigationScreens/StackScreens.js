import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../SplashScreen';
import OndoorLogin from '../OndoorLogin';
import TabBottom from './TabBottom';

const Stack = createNativeStackNavigator();

const StackScreens = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splashscreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ondoorlogin"
          component={OndoorLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="productlist"
          component={TabBottom}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackScreens;
