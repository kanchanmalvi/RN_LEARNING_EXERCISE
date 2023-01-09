import {StyleSheet, View, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';

const SearchData = () => {
  const [search, setSearch] = useState('');

  const filteredContacts = search.length === 0 ? contacts : 
  search.filter(contact => contact.full_name.
              toLowerCase().includes(search.toLowerCase()))
  return (
    <View style={styles.searchBackground}>
      <TextInput
        style={{
          fontSize: 20,
          textAlign: 'left',
          margin: 10,
          color:"green"
         
        }}
        value={search}
        onChangeText={event => setSearch(event)}
        
        placeholder="Search name"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchBackground: {
    backgroundColor: '#f8f8ff',
    margin: 10,
  },
});
export default SearchData;
