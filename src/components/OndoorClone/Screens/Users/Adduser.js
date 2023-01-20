import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import React, {useState} from 'react';
import {selectInOut} from '../../../../../Assets/constantData/unit';
import {Dropdown} from 'react-native-element-dropdown';
import Api from '../../../../API_Servies/Api';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Adduser = () => {
  const [isFocus, setIsFocus] = useState(false);
  const Navigation = useNavigation();
  const settoken = useSelector(state => state?.authToken?.token?.token);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      role_id: '',
      email: '',
      password: '',
      password_confirmation: '',
      mobile: '',
      gender: '',
      account_balance: '',
      address: '',
    },
  });

  const onSubmit = async data => {
    let param = {
      name: data.name,
      role_id: data.role_id,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      mobile: data.mobile,
      gender: data.gender?.label,
      account_balance: data.account_balance,
      address: data.address,
    };
    try {
      let url = 'user-management';
      const res = await Api.postData(url, param, settoken, null, 'adduser');
      console.log(res, 'useradd');
      if (res) {
        Navigation.navigate('userlist');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{marginBottom: 50}}>
      <View style={{backgroundColor: '#22c1c3', padding: 15}}>
        <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
          Adduser
        </Text>
      </View>

      <ScrollView style={{marginVertical: 10}}>
        <View
          style={{
            margin: 10,
          }}>
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
                  placeholder="role-id"
                  keyboardType="numeric"
                  maxLength={9}
                />
              )}
              name="role_id"
            />
          </View>
          {errors.role_id && (
            <Text style={{color: 'red'}}>This is required.</Text>
          )}
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
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Name"
                />
              )}
              name="name"
            />
            {errors.name && <Text>This is required.</Text>}
          </View>
        </View>
        {/* unit */}

        <View
          style={{
            margin: 10,
            borderColor: '#1CB5E0',
            borderWidth: 1,
            padding: 10,
          }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Dropdown
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={selectInOut}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? ' Select Gender' : ' SelectStock '}
                searchPlaceholder="Search..."
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
            name="gender"
          />
          {errors.gender && <Text>This is required.</Text>}
        </View>
        {/* email */}
        <View style={{margin: 10}}>
          <View
            style={{
              borderColor: '#1CB5E0',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter email"
                />
              )}
              name="email"
            />
            {errors.email && <Text>This is required.</Text>}
          </View>
        </View>
        <View style={{margin: 10}}>
          <View
            style={{
              borderColor: '#1CB5E0',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter password"
                />
              )}
              name="password"
            />
            {errors.password && <Text>This is required.</Text>}
          </View>
        </View>

        <View style={{margin: 10}}>
          <View
            style={{
              borderColor: '#1CB5E0',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter password_confirmation"
                />
              )}
              name="password_confirmation"
            />
            {errors.password_confirmation && <Text>This is required.</Text>}
          </View>
        </View>

        <View style={{margin: 10}}>
          <View
            style={{
              borderColor: '#1CB5E0',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  maxLength={10}
                  placeholder="Enter mobile"
                />
              )}
              name="mobile"
            />
            {errors.mobile && <Text>This is required.</Text>}
          </View>
        </View>

        <View style={{margin: 10}}>
          <View
            style={{
              borderColor: '#1CB5E0',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter account_balance"
                />
              )}
              name="account_balance"
            />
            {errors.account_balance && <Text>This is required.</Text>}
          </View>
        </View>

        <View style={{margin: 10}}>
          <View
            style={{
              borderColor: '#1CB5E0',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter address"
                />
              )}
              name="address"
            />
            {errors.address && <Text>This is required.</Text>}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{margin: 10, backgroundColor: 'orange', padding: 15}}>
          <Text style={{color: 'white', textAlign: 'center'}}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Adduser;

const styles = StyleSheet.create({});
