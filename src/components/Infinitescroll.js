import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import InfiniteScroll from 'react-native-infinite-scrolling';
import axios from 'axios';

const Infinitescroll = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    loadMore();
  }, []);

  const renderData = ({item}) => {
    return (
      <View>
        <Text> {item.title} </Text>
        <Text> {item.id} </Text>
      </View>
    );
  };

  const loadMore = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        let updatedData = data.concat(response.data);
        setData(updatedData);
      })
      .catch(error => console.log('error =', error));
  };
  return (
    <InfiniteScroll renderData={renderData} data={data} loadMore={loadMore} />
  );
};

export default Infinitescroll;
