import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Searchbar = () => {
  const [searchItem, setSearchItem] = useState('');
   
  return (
    <View style={styles.user_name}>
      <TextInput
        style={styles.textStyle}
        placeholder="Search Notes"
        placeholderTextColor="black"
        value={searchItem}
        onChangeText={searchdata => setSearchItem(searchdata)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  user_name: {
    backgroundColor: '#f8f8ff',
    padding: 5,
    width: '100%',
  },
  textStyle: {
    fontSize: 15,
  },
});

export default Searchbar;
