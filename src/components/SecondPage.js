import React from 'react';
import {
  FlatList,
  Text,
  ScrollView,
  Image,
  Alert,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SecondPage = () => {
  const flatListData = [
    {
      name1: 'test 1',
    },
    {
      name1: 'test 2',
    },
    {
      name1: 'test 3',
    },
  ];

  const testing = <Text>This Is a Second component</Text>; //simple Jsx

  const ruleTesters = (F, S, T) => {
    return `This is jxs rules ${F} ${S} ${T}`;
  };

  const name = ' page 3';

  const onPressLearnMore = () => {
    Alert.alert('This is a button');
  };
  return (
    <ScrollView>
      <Text style={{textAlign: 'right', fontSize: 20, color: 'green'}}>
        {testing}
      </Text>
      <Text style={{textAlign: 'right', fontSize: 20, color: 'skyblue'}}>
        Hi, {ruleTesters('first', 'second', 'third')}
      </Text>

      <Text style={{fontSize: 40, color: 'blue', fontWeight: 'bold'}}>
        This is Page 1
      </Text>
      <Text style={{fontSize: 30, color: 'black'}}>This is Page 2</Text>
      <Text style={{fontSize: 20, color: 'red'}}>This is {name}</Text>

      <FlatList
        inverted
        horizontal
        data={flatListData}
        renderItem={elements => {
          console.warn(elements.item.name1);
          return <Text>{elements.item.name1}</Text>;
        }}
      />

      <Text>lhdsjyfgjsef yshgfhserdyfgds yhxgdsdyhfgyug</Text>
      <Text>lhdsjyfgjsef yshgfhserdyfgds yhxgdsdyhfgyug</Text>
      <Text>lhdsjyfgjsef yshgfhserdyfgds yhxgdsdyhfgyug</Text>

      <Text>lhdsjyfgjsef yshgfhserdyfgds yhxgdsdyhfgyug</Text>
      <Text>lhdsjyfgjsef yshgfhserdyfgds yhxgdsdyhfgyug</Text>
      <Text>lhdsjyfgjsef yshgfhserdyfgds yhxgdsdyhfgyug</Text>
      <Image
        source={require('../Assets/images1.jpg')}
        style={{width: 400, height: 400}}
      />

      <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <TouchableOpacity onPress={onPressLearnMore}>
        <Text style={{color: 'red', marginVertical: 20, fontSize: 20}}>
          Click Here
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>React Native</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'yellow',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: 'yellow',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default SecondPage;

export const Form = () => {
  const heading = 'Welcome to react native'; //Simple Jsx
  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          textAlign: 'center',
          alignItems: 'center',
        }}>
        {heading}
      </Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="You can type in me"
      />

      <View style={Styles.containers}>
        <Text style={Styles.red}>just red</Text>
        <Text style={Styles.bigBlue}>just bigBlue</Text>
        <Text style={[Styles.bigBlue, Styles.red]}>bigBlue, then red</Text>
        <Text style={[Styles.red, Styles.bigBlue]}>red, then bigBlue</Text>
      </View>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  containers: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
