import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

//POST METHOD

const PostForm = ({apiData, setApiData}) => {
  const [addname, setAddName] = useState(''); //text we typed

  //POST METHOD
  const data = {addname};
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  };
  const apitestPost = async () => {
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        requestOptions,
      );
      const myData = response.data;
      // console.log(myData, "26")
    } catch (error) {
      console.log(error, 'testing error');
    }
  };
  useEffect(() => {
    apitestPost();
  }, []);

  const submit = () => {
    if (!addname) {
      alert('form cant be blank');
    } else {
      apitestPost();
      setAddName('');
      let id = apiData[apiData.length - 1].id + 1;
      console.log(apiData, '12');

      const mytodo = {
        id: id,
        username: addname,
      };
      setApiData([...apiData, mytodo]);
      console.log(mytodo, 'check');
      alert('form submit');
    }
  };
  return (
    <View>
      <Text
        style={{
          color: 'green',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 10,
        }}>
        PostForm
      </Text>

      <View>
        <TextInput
          style={{
            bordercolor: 'grey',
            fontSize: 20,
            textAlign: 'left',
            marginTop: 10,
            borderWidth: 2,
          }}
          value={addname}
          onChangeText={event => setAddName(event)}
          placeholder="Enter your name"
        />
      </View>
      <View>
        <TouchableOpacity
          style={{fontSize: 20, textAlign: 'left', marginTop: 10}}>
          <Text
            style={{
              color: 'grey',
              fontSize: 20,
              textAlign: 'left',
              marginTop: 10,
            }}
            onPress={submit}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PostForm;
