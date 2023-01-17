import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../Features/loginTokenSlice';

const CopyLoginonPractice = () => {
  const token = useSelector(state => state?.copytoken);
  console.log(token, 'toenn access');

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
    console.log(data, 'datafill');
    try {
      dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        }),
      );
    } catch (error) {
      console.log(error, 'error');
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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

export default CopyLoginonPractice;

const styles = StyleSheet.create({});
