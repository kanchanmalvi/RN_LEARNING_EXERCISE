import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {IconButton} from 'react-native-paper';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eyeIcon, setEyeIcon] = useState(true);
  const [showIcon, setShowIcon] = useState('eye-off');
  // error msg
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  //async storage
  const [getValue, setGetValue] = useState('');

  const submit = () => {
    let passwordValidation =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    let emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!email && !password) {
      Alert.alert('please fill details');
    } else if (!email) {
      setEmailError("email can't be blank");
    } else if (!emailValidation.test(email)) {
      setEmailError('Please enter valid email');
    } else if (!password) {
      setPasswordError("password can't be blank");
    } else if (!passwordValidation.test(password)) {
      setPasswordError(
        'Password should be minimum eight characters, at least one uppercase letter, one lowercase letter,one number and one special character',
      );
    } else if (email && password) {
      AsyncStorage.setItem('any_key _here_for_email', email);
      AsyncStorage.setItem('any_key_here_for_password', password);
      setEmail('');
      setPassword('');
      Alert.alert('Login Successfully');
      navigation.navigate('home');
    } else {
    }
    setEmail('');
    setPassword('');
  };

  const fun1 = () => {
    setShowIcon(showIcon == 'eye-off' ? 'eye' : 'eye-off');
    setEyeIcon(!eyeIcon);
  };

  const getValueFunction = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('any_key_here_for_email').then(
      value =>
        // AsyncStorage returns a promise
        // Adding a callback to get the value
        setGetValue(value),

      // Setting the value in Text
    );
  };

  useEffect(() => {
    getValueFunction();
  }, []);
  return (
    <View>
      <Image
        source={require('../../../Assets/onlineEdu.png')}
        style={{margin: 20, width: 350, height: 100}}
      />

      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={email => {
              setEmail(email);
              setEmailError('');
            }}
          />
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{color: 'red', textAlign: 'left'}}>{emailError}</Text>
        </View>

        <View style={[styles.inputView, styles.flex_Direction]}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={eyeIcon}
            value={password}
            onChangeText={password => {
              setPassword(password);
              setPasswordError('');
            }}
          />
          <TouchableOpacity icon="eye">
            <IconButton
              onPress={fun1}
              style={styles.iconeye}
              icon={showIcon}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{color: 'red', textAlign: 'left'}}>{passwordError}</Text>
        </View>

        <TouchableOpacity>
          <Text
            style={styles.forgot_button}
            onPress={() => navigation.navigate('forgotpass')}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={submit}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text
            style={styles.create_button}
            onPress={() => navigation.navigate('signup')}>
            New User, Create Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={getValueFunction} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>GET VALUE</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{getValue}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    margin: 10,
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: '#ffe5b4',
    borderRadius: 5,
    width: '100%',
    height: 50,
    marginBottom: 10,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontSize: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  create_button: {
    color: 'green',
    fontSize: 20,
    marginTop: 10,
  },
  loginBtn: {
    width: '100%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#77dd77',
  },
  flex_Direction: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Login;

//onChangeText={(password) => {setPassword(password);setPasswordError('')}}
