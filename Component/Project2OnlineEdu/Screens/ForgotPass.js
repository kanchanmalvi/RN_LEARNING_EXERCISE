import React, {useState} from 'react';
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
import {Button, icon, IconButton} from 'react-native-paper';
import ModalScreen from './ModalScreen';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  //Modal For Reset Password
  const [openModal, setOpenModal] = useState(false);

  const submit = () => {
    let emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!email) {
      setEmailError("email can't be blank");
    } else if (!emailValidation.test(email)) {
      setEmailError('Please enter valid email');
    } else {
      setOpenModal(true);
    }
    setEmail('');
  };

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
            placeholder="Enter your email here..."
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

        <TouchableOpacity style={styles.loginBtn} onPress={submit}>
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/*  Modal View  */}

      <Modal name="close" visible={openModal} animationType="fade">
        <ModalScreen setOpenModal={setOpenModal} />
      </Modal>
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
    backgroundColor: '#77dd77',
  },
  flex_Direction: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ForgotPass;
