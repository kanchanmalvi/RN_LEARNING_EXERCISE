import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Produclist = () => {
  const Navigation = useNavigation();

  return (
    <View>
      <Text onPress={() => Navigation.navigate('addproduct')}>Produclist</Text>
    </View>
  );
};

export default Produclist;

const styles = StyleSheet.create({});
