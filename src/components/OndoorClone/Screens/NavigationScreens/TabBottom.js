import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {View, Text, StyleSheet} from 'react-native';
import Productlist from '../Products/Productlist';
import UsersList from '../Users/UsersList';
import Stocklist from '../Stocks/Stocklist';
import ProductScreen from '../Products/ProductScreen';
import UsersScreen from '../Users/UsersScreen';

const Tab = createBottomTabNavigator();

const TabBottom = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          borderRadius: 15,
          height: 90,
        },
      }}>
      <Tab.Screen
        name="productlist"
        component={ProductScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <FontAwesome
                  name="product-hunt"
                  size={21}
                  color={focused ? '#F2994A' : '#808080'}
                />
              </View>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="userlist"
        component={UsersScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{position: 'relative'}}>
                <FontAwesome5
                  name="users"
                  size={25}
                  color={focused ? '#22c1c3' : '#808080'}
                />
              </View>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="stocklist"
        component={Stocklist}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{position: 'relative'}}>
                <AntDesign
                  name="piechart"
                  size={25}
                  color={focused ? '#22c1c3' : '#808080'}
                />
              </View>
            );
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBottom;
