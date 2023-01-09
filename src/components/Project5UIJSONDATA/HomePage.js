import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar, Button, Portal, Provider } from 'react-native-paper';
import FormModal from './FormModal';

const HomePage = () => {
    
    const addTodofunction = (addTodo) => {
        console.log(addTodo, "10")
        let id = data[data.length - 1].id + 1;
        console.log(addTodo, "12")

        const mytodo = {
            id: id,
            title: addTodo
        }
        setData([...data, mytodo])
        console.log(mytodo, "check")

    }
    const [data, setData] = useState([
        {
            id: 1,
            title: "Go to Market"
        },
        {
            id: 2,
            title: "Go to Shopping"
        },
        {
            id: 3,
            title: "Go to Mall"
        },

    ])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const showModal = () => {
        setIsOpenModal(true)
    }
    return (
        <View >
            <Appbar.Header style={{ backgroundColor: "#CCCCFF", fontFamily: "JosefinSans-SemiBold" }}>
                <Appbar.BackAction />
                <Appbar.Content title="Todo List" />
                <Appbar.Action icon="calendar" />
                <Appbar.Action icon="magnify" />
            </Appbar.Header>

            <View style={styles.container}>
                <Button variant="displayMedium" style={styles.button} icon="plus" mode="contained" onPress={showModal}>
                    Add
                </Button>
            </View>
            <Provider style={styles.modalStyle}>
                <Portal>
                    <FormModal modal={isOpenModal} hide={setIsOpenModal} dataForm={data} setDatatodo={setData} addTodofunction={addTodofunction} />
                </Portal>
            </Provider>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        margin: 20,
    },
    modalStyle: {
        margin: 50,

    },

})
export default HomePage

