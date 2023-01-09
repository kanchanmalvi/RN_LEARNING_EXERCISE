import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, TextInput, Button} from 'react-native-paper';

const AddTheme = () => {
  return (
    <View>
      <Text variant="displayLarge">Display Large</Text>
      <TextInput
        label="Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
      />

      <Button
        color=" red"
        icon="plus"
        mode="text"
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
};

export default AddTheme;

const styles = StyleSheet.create({});
