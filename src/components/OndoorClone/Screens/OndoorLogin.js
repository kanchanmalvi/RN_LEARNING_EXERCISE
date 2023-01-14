import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import Api from '../../../API_Servies/Api';
import {useNavigation, CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setSignIn} from '../../../Features/authTokenSlice';

const OndoorLogin = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onsubmit = async data => {
    try {
      let url = 'user-login';
      let body = {
        email: data.email,
        password: data.password,
      };
      const res = await Api.postData(url, body, null, 'login');
      console.log(res, 'api response');
      await updateRedux(res.data.payload);
      try {
        await AsyncStorage.setItem('token', JSON.stringify(res.data.payload));
        console.log('success Token');
      } catch (error) {
        console.log(error, 'token error');
      }
      Navigation.dispatch(
        CommonActions.navigate({
          name: 'productlist',
          params: {},
          index: 0,
        }),
      );
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const asyncData = async () => {
    try {
      let getValue = await AsyncStorage.getItem('token');
      console.log(getValue, 'success GetMsg');
      if (getValue != null) {
        updateRedux((getValue));
        Navigation.dispatch(
          CommonActions.navigate({
            name: 'productlist',
            params: {},
            index: 0,
          }),
        );
      } else {
        return false;
      }
    } catch (error) {
      console.log(error, 'token error');
      return false;
    }
  };
  useEffect(() => {
    asyncData();
  }, []);

  const updateRedux = data => {
    data  = JSON.parse(data)
    dispatch(setSignIn(data));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../../../Assets/images/onlogin.png')}
          style={{height: 300, width: 300}}
        />
        <Text style={{fontSize: 25, color: 'black', textAlign: 'center'}}>
          Ondoor Clone
        </Text>
      </View>
      <View style={{margin: 10}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#1CB5E0',
            paddingHorizontal: 10,
          }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter Email"
              />
            )}
            name="email"
          />
        </View>

        {errors.email && <Text style={{color: 'red'}}>This is required.</Text>}
      </View>

      <View style={{margin: 10}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#1CB5E0',
            paddingHorizontal: 10,
          }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter Password"
              />
            )}
            name="password"
          />
        </View>

        {errors.password && (
          <Text style={{color: 'red'}}>This is required.</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onsubmit)}
        style={{margin: 10, backgroundColor: '#22c1c3', padding: 15}}>
        <Text style={{color: 'white', textAlign: 'center'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OndoorLogin;

const styles = StyleSheet.create({});
