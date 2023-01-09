import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Menu = () => {
    const navigation = useNavigation()

    return (
        <ScrollView>

            <TouchableOpacity
                onPress={() => navigation.navigate("About")}
            >
                <Image
                    source={require("../../../Assets/aboutUs.png")}
                    style={{ margin: 20, width: 350, height: 250, }}
                />

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Course")}
            >
                <Image
                    source={require("../../../Assets/Books.jpg")}
                    style={{ margin: 20, width: 350, height: 300, }}
                />

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("ContactUs")}
            >
                <Image
                    source={require("../../../Assets/contactUs.png")}
                    style={{ margin: 20, width: 350, height: 300, }}
                />

            </TouchableOpacity>

        </ScrollView>


    )
}


const styles = StyleSheet.create({})

export default Menu

