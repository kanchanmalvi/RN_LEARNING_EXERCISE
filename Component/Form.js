import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Posts(props) {
  console.log(props.route.params);
  const [APIData, setAPIData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  let name, value;
  const testing = event => {
    (name = event.target.name), (value = event.target.value);
    setUser({...user, [name]: value});
  };

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = APIData.filter(item => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(response => {
      setAPIData(response.data);
    });
  }, []);

  const remove = () => {
    AsyncStorage.removeItem('Name');
    AsyncStorage.removeItem('Password');
    alert('user logout');
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        icon="search"
        placeholder="Search..."
        onChangeText={e => searchItems(e)}
      />

      <View style={{marginTop: 20}}>
        {searchInput.length > 1
          ? filteredResults.map((item, index) => {
              return (
                <View key={index}>
                  <Text>{item.name}</Text>
                  <Text>{item.email}</Text>
                </View>
              );
            })
          : APIData.map((item, index) => {
              return (
                <View key={index}>
                  <Text>{item.name}</Text>
                  <Text>{item.email}</Text>
                </View>
              );
            })}
      </View>

      <Button title="logout" onPress={remove} />
    </View>
  );
}
