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
    <View style={styles.splashScreenstyle}>
      <Text style={styles.splashText}>Ondoor-Clone</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splashScreenstyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 19,
    color: '#667db6',
  },
});
