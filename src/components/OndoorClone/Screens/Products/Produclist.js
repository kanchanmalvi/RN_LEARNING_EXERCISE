import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import Api from '../../../../API_Servies/Api';
import httpConfig from '../../../../helpers/http/httpConfig';

const Produclist = () => {
  const [productList, setProductList] = useState([]);
  const Navigation = useNavigation();
  const settoken = useSelector(state => state?.authToken?.token?.token);

  const getdata = async () => {
    try {
      let url = 'products';
      let body = {};
      console.log('body,url', body, url);
      const res = await Api.postData(url, body, settoken, null, 'productlist');
      console.log(res, 'api response');
      const list = res?.data?.payload;
      setProductList(list);
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
        let url = 'products';
        let body = {};
        console.log('body,url', body, url);
        const res = await Api.postData(
          url,
          body,
          settoken,
          null,
          'productlist',
        );
        console.log(res, 'api response');
        const list = res?.data?.payload;
        setProductList(list);
      } catch (error) {
        console.log(error, 'error product list');
      }
    });
    return unsubscribe;
  }, [Navigation]);

  const wibeasyncData = async () => {
    try {
      AsyncStorage.removeItem('token');
      console.log('remove successfully');
      Navigation.navigate('ondoorlogin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button title="Logout" onPress={wibeasyncData} />
      <View style={{margin: 10}}>
        <Button
          color={'orange'}
          title="Add"
          onPress={() => Navigation.navigate('userlist')}
        />
      </View>

      <Text>Produclist</Text>

      <FlatList
        data={productList}
        renderItem={({item}) => {
          return (
            <View style={styles.productViewstyle}>
              <View style={styles.productstyle}>
                <TouchableOpacity onPress={() => productDetails(item?.id)}>
                  <Image
                    source={{uri: httpConfig.imgUrl + item.image}}
                    style={styles.imagestyle}
                  />
                </TouchableOpacity>

                <View style={styles.ghh}>
                  <Text style={styles.productname}>
                    {item?.name} ({item?.quantity} {item?.unit})
                  </Text>

                  <Text style={styles.categorystyle}>{item?.category}</Text>
                  <Text style={styles.pricestyle}>Rs.{item?.price}/-</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Produclist;

const styles = StyleSheet.create({
  imagestyle: {
    width: 200,
    height: 200,
  },
});
// const data = useSelector(state => state?.authToken?.token);
// console.log(typeof data, 'data`2');
