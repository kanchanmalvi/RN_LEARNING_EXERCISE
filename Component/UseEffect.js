import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput, } from 'react-native-paper';
import React, { useEffect, useState } from 'react'


const UseEffect = () => {

    const [count, setcount] = useState(0)

    const pressMe = () => {
        setcount(count + 1)
    }

    useEffect(() => {
        alert("useeffcet call")
    }, [count])

    return (
        <View>
            <Text>UseEffect</Text>
            <Button icon="camera" mode="contained" onPress={pressMe}>
                {count}
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({})

export default UseEffect

