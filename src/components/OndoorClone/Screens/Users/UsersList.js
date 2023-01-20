import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Api from '../../../../API_Servies/Api';
import {useNavigation} from '@react-navigation/native';
import {FAB} from 'react-native-paper';
import {List} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      <View style={{padding: 15, backgroundColor: '#22c1c3'}}>
        <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
          Users List
        </Text>
      </View>
      <View>
        <FlatList
          data={userList}
          renderItem={({item}) => {
            return (
              <List.Section>
                <List.Accordion
                  title={item?.name}
                  left={props => (
                    <FontAwesome name="user-circle" size={20} color="black" />
                  )}>
                  <View>
                    <List.Item title={item?.email} />
                    <List.Item title={item?.mobile} />
                    <List.Item title={item?.gender} />
                    <List.Item title={item?.account_balance} />
                    <List.Item title={item?.address} />
                  </View>
                </List.Accordion>
              </List.Section>
            );
          }}
        />
      </View>
      <FAB
        icon="plus"
        color={'white'}
        style={styles.fab}
        onPress={() => Navigation.navigate('adduser')}
      />
    </View>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
    backgroundColor: '#22c1c3',
    color: 'white',
  },
});
