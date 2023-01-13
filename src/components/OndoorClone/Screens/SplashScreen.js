import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';


const SplashScreen = () => {
  const Navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      Navigation.navigate('ondoorlogin');
    }, 2000);
  });
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
