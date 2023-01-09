import {StyleSheet, View, Modal} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import React, {useState} from 'react';

const FormModal = ({modal, hide, dataForm, setDatatodo, addTodofunction}) => {
  const [addTodo, setAddtodo] = useState('');

  const submit = () => {
    if (!addTodo) {
      alert('Title should not be blank');
    } else {
      addTodofunction(addTodo);
      setAddtodo('');
    }
  };
  const onDelete = item => {
    console.log(item, 'testing');
    const newList = dataForm.filter(e => e !== item);
    setDatatodo(newList);
  };
  return (
    <Modal visible={modal} style={styles.ModalStyle}>
      <View>
        <View>
          <Text
            style={styles.addbuttonText}
            variant="displayMedium"
            onPress={() => hide(false)}>
            Add Todo Here
          </Text>
        </View>
        <TextInput
          style={{margin: 20}}
          mode="outlined"
          label="Enter your task"
          placeholder="Type todo"
          right={<TextInput.Affix text="" />}
          value={addTodo}
          onChangeText={todo => setAddtodo(todo)}
        />
        <Button style={styles.btnStyle} mode="contained" onPress={submit}>
          Submit
        </Button>

        <View>

          {dataForm.length === 0 ? (
            <Text>No todo display</Text>
          ) : (
            dataForm.map((item, index) => (
              <Text key={index}>
                {item.title}
                <Button
                  variant="displayMedium"
                  style={styles.button}
                  mode="contained"
                  onPress={() => {
                    onDelete(item);
                  }}>
                  delete
                </Button>
              </Text>
            ))
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  cardstyle: {
    backgroundColor: 'red',
    padding: 20,
    margin: 20,
  },
  addbuttonText: {
    textAlign: 'center',
    margin: 10,
  },
  btnStyle: {
    margin: 20,
    borderRadius: 5,
  },
});

export default FormModal;
