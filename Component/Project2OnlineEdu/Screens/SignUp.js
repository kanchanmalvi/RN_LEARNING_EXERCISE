import {set} from 'immer/dist/internal';
import React, {useState} from 'react';
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

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [eyeIcon, setEyeIcon] = useState(true);
  const [eyeIconCpass, setEyeIconCpass] = useState(true);
  const [showIcon, setShowIcon] = useState('eye-off');
  const [showIconCpass, setShowIconCpass] = useState('eye-off');
  // error msg
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const submit = () => {
    let passwordValidation =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    let emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!username && !email && !password && !confirmPassword) {
      Alert.alert('please fill details');
    } else if (!username) {
      setUsernameError("Username can't be blank");
    } else if (!username.length > 10) {
      setUsernameError('Username should be 10 character');
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
    } else if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password Can't be blank");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Confirm password is not matched');
    } else {
      Alert.alert('Login Successfully');
      navigation.navigate('home');
    }
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const fun1 = () => {
    setShowIcon(showIcon == 'eye-off' ? 'eye' : 'eye-off');
    setEyeIcon(!eyeIcon);
  };
  const fun2 = () => {
    setShowIconCpass(showIconCpass == 'eye-off' ? 'eye' : 'eye-off');
    setEyeIconCpass(!eyeIconCpass);
  };

  return (
    <View>
      <Image
        source={require('../../../Assets/onlineEdu.png')}
        style={{margin: 20, width: 350, height: 100}}
      />

      <View style={styles.container}>
        {/* Username*/}
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Username"
            placeholderTextColor="black"
            value={username}
            onChangeText={username => {
              setUsername(username);
              setUsernameError('');
            }}
          />
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{color: 'red', textAlign: 'left'}}>{usernameError}</Text>
        </View>

        {/* Email*/}
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

        {/* Password*/}
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

        {/* Confirm Password */}

        <View style={[styles.inputView, styles.flex_Direction]}>
          <TextInput
            style={styles.TextInput}
            placeholder="Retype Password"
            placeholderTextColor="black"
            secureTextEntry={eyeIconCpass}
            value={confirmPassword}
            onChangeText={Cpassword => {
              setConfirmPassword(Cpassword);
              setConfirmPasswordError('');
            }}
          />
          <TouchableOpacity icon="eye">
            <IconButton
              onPress={fun2}
              style={styles.iconeye}
              icon={showIconCpass}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{color: 'red', textAlign: 'left'}}>
            {confirmPasswordError}
          </Text>
        </View>

        {/* submit form */}
        <TouchableOpacity style={styles.loginBtn} onPress={submit}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Already account */}
        <TouchableOpacity>
          <Text
            style={styles.create_button}
            onPress={() => navigation.navigate('login')}>
            Already have an account, login
          </Text>
        </TouchableOpacity>
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

export default SignUp;
