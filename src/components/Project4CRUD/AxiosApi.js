import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  VirtualizedList,
  Image,
} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import PostForm from './../../Component/Project4CRUD/PostForm';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchData from './SearchData';

//GET METHOD

const AxiosApi = () => {
  const [apiData, setApiData] = useState([]); //api data
  const [loading, setLoading] = useState(true); // loader

  //method for api call
  const apitest = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const myData = response.data;
      console.log(myData, '21');
      setApiData(myData);
      setLoading(false);
    } catch (error) {
      console.log(error, 'testing error');
    }
  };
  useEffect(() => {
    apitest();
  }, []);

  const editUsername = () => {
    alert('edit data');
  };
  const deleteUsername = id => {
    const deleteUser = apiData.filter((item, i) => i !== id);
    setApiData(deleteUser);
  };

  let reg = /kanchan/;
  console.log(reg, '47');
  console.log(reg.source, '47');

  return (
    <ScrollView>
      <PostForm apiData={apiData} setApiData={setApiData} />

      {loading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <View>
            <SearchData />
          </View>
          <Text style={{color: 'red', fontSize: 20, textAlign: 'center'}}>
            Api Data
          </Text>

          <SafeAreaView>
            <FlatList
              data={apiData}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      backgroundColor: '#37a56d',
                      margin: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 10,
                    }}>
                    <Image
                      source={{uri: item.image}}
                      style={{margin: 20, width: 200, height: 200}}
                    />
                    <Text style={styles.textBox}>{item.category}</Text>
                    <Text style={styles.textBox}>{item.title}</Text>

                    <TouchableOpacity onPress={() => editUsername(index)}>
                      <View style={styles.editIcon}>
                        <Icon
                          style={styles.iconEdit}
                          name="edit"
                          size={30}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>

                    <View style={styles.editIcon}>
                      <Icon
                        onPress={() => deleteUsername(index)}
                        style={styles.iconEdit}
                        name="trash"
                        size={30}
                        color="red"
                      />
                    </View>
                  </View>
                );
              }}
            />
          </SafeAreaView>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  textBox: {
    fontSize: 18,
    fontFamily: 'JosefinSans-Italic',
  },
});
export default AxiosApi;
