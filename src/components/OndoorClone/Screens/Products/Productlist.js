import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import Api from '../../../../API_Servies/Api';
import httpConfig from '../../../../helpers/http/httpConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

const Productlist = () => {
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

  //delete
  const productDelete = async id => {
    try {
      let url = 'http://192.168.1.15:8000/api/product/' + id;
      let headersObj = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + settoken,
        },
      };
      const res = await axios.delete(url, headersObj);
      console.log(res, 'delete api response');
    } catch (error) {
      console.log(error, 'error product delete');
    }
    getdata();
  };

  //edit product

  const productEdit = item => {
    Navigation.navigate('updateproduct', item);
  };

  return (
    <View>
      {/* <Button title="Logout" onPress={wibeasyncData} />*/}

      {/* <View style={{margin: 10}}>
        <Button
          color={'orange'}
          title="Add"
          onPress={() => Navigation.navigate('stocklist')}
        />
      </View> */}

      <View style={{backgroundColor: '#F2994A', flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => Navigation.toggleDrawer()}>
          <Icon
            name="bars"
            style={{
              fontSize: 30,
              color: 'white',
              padding: 10,
            }}
          />
        </TouchableOpacity>
        <View style={{display: 'flex', justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
            Product List
          </Text>
        </View>
      </View>
      <View style={styles.productViewstyle}>
        <FlatList
          data={productList}
          renderItem={({item}) => {
            return (
              <View style={styles.productstyle}>
                <TouchableOpacity>
                  <Image
                    source={{uri: httpConfig.imgUrl + item.image}}
                    style={styles.imagestyle}
                  />
                </TouchableOpacity>

                <View style={styles.textstyle}>
                  <View style={styles.nameView}>
                    <Text style={styles.productname}>
                      {item?.name} ({item?.quantity} {item?.unit})
                    </Text>
                    <View
                      style={{
                        marginHorizontal: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 50,
                      }}>
                      <TouchableOpacity>
                        <Text>
                          <AntDesign
                            name="delete"
                            size={20}
                            color="#BD3F32"
                            onPress={() => productDelete(item.id)}
                          />
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text>
                          <AntDesign
                            name="edit"
                            size={20}
                            color="#5B86E5"
                            onPress={() => productEdit(item)}
                          />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.categorystyle}>{item?.category}</Text>
                  <Text style={styles.pricestyle}>Rs.{item?.price}/-</Text>
                  <Text style={styles.desc}>{item?.product_description}.</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <FAB
        icon="plus"
        color={'white'}
        style={styles.fab}
        onPress={() => Navigation.navigate('addproduct')}
      />
    </View>
  );
};

export default Productlist;

const styles = StyleSheet.create({
  imagestyle: {
    width: 90,
    height: 90,
    borderRadius: 5,
  },
  productstyle: {
    flexDirection: 'row',
    padding: 5,
    margin: 5,
    // borderWidth: 0.8,
    // borderColor: 'black',
    // borderRadius:5
  },
  textstyle: {
    marginHorizontal: 10,
  },
  productname: {
    color: '#C6426E',
    fontSize: 17,
  },
  categorystyle: {
    color: 'green',
    fontSize: 16,
  },
  pricestyle: {
    color: 'blue',
    fontSize: 15,
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  desc: {
    fontSize: 15,
    color: 'gray',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
    backgroundColor: '#F2994A',
    color: 'white',
  },
});
// const data = useSelector(state => state?.authToken?.token);
// console.log(typeof data, 'data`2');

// let url = 'http://192.168.1.15:8000/api/product/' + id;
// let headersObj = {
//   headers: {
//     Accept: '*/*',
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + settoken,
// const res = await axios.delete(url, headersObj);
//   },

// let url = `product/${id}`;
// console.log(url, 'checking url');
// const res = await Api.deleteData(url, settoken, null, 'deleteproduct');
// console.log(res, 'api response');
