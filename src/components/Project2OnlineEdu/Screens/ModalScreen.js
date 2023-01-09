import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {Button, icon, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const ModalScreen = ({setOpenModal, navigation}) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [confirmpasswordError, setConfirmPasswordError] = useState('');
  const [eyeIcon, setEyeIcon] = useState(true);
  const [eyeIconCpass, setEyeIconCpass] = useState(true);
  const [showIcon, setShowIcon] = useState('eye-off');
  const [showIconCpass, setShowIconCpass] = useState('eye-off');

  const submitHandler = () => {
    let passwordValidation =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!password) {
      alert('Please fill the details');
    } else {
      navigation.navigate('login');
    }
    setPassword('');
    setConfirmpassword('');
  };

  const fun1 = () => {
    setShowIcon(showIcon == 'eye-off' ? 'eye' : 'eye-off');
    setEyeIcon(!eyeIcon);
  };
  const fun2 = () => {
    setShowIconCpass(showIconCpass == 'eye-off' ? 'eye' : 'eye-off');
    setEyeIconCpass(!eyeIconCpass);
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <View>
      <Image
        source={require('../../../Assets/onlineEdu.png')}
        style={{margin: 20, width: 350, height: 100}}
      />

      <View style={styles.inputViews}>
        <Text style={styles.TextInputs}> Reset Password </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.inputView}>
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
            <Text style={{color: 'red', textAlign: 'left'}}>
              {passwordError}
            </Text>
          </View>
        </View>
        <View style={[styles.inputView, styles.flex_Direction]}>
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password"
            placeholderTextColor="black"
            secureTextEntry={eyeIconCpass}
            value={confirmpassword}
            onChangeText={Cpassword => {
              setConfirmpassword(Cpassword);
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
            {confirmpasswordError}
          </Text>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={submitHandler}>
          <Text style={styles.loginText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={closeModal}>
          <Text>close</Text>
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
  },
  loginBtn: {
    width: '100%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#77dd77',
  },
  flex_Direction: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ModalScreen;
