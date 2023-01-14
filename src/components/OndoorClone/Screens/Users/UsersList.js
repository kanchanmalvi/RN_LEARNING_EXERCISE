import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Api from '../../../../API_Servies/Api';
import {useNavigation} from '@react-navigation/native';

const UsersList = () => {
  const [userList, setUserList] = useState();
  const settoken = useSelector(state => state?.authToken?.token?.token);

  const Navigation = useNavigation();

  const getdata = async () => {
    try {
      let url = 'user-managements';
      let body = {};
      console.log('body,url', body, url);
      const res = await Api.postData(url, body, settoken, null, 'userlist');
      console.log(res, 'api response');
      const list = res?.data?.payload;
      setUserList(list);
    } catch (error) {
      console.log(error, 'error product list');
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', async () => {
      try {
        let url = 'user-managements';
        let body = {};
        console.log('body,url', body, url);
        const res = await Api.postData(url, body, settoken, null, 'userlist');
        console.log(res, 'api response');
        const list = res?.data?.payload;
        setUserList(list);
      } catch (error) {
        console.log(error, 'error product list');
      }
    });
    return unsubscribe;
  }, [Navigation]);

  return (
    <View>
      <Button title="adduser" onPress={() => Navigation.navigate('adduser')} />
      <Text>UsersList</Text>
      <View>
        <FlatList
          data={userList}
          renderItem={({item}) => {
            return (
              <View style={{margin: 10}}>
                <Text>{item?.account_balance}</Text>
                <Text>{item?.address}</Text>
                <Text>{item?.email}</Text>
                <Text>{item?.name}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default UsersList;

const styles = StyleSheet.create({});
