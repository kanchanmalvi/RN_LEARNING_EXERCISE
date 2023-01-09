import React, { useState } from "react";
import { Text, StyleSheet, View, Image, Button, Linking, FlatList, Alert } from "react-native";

const Props = ({ headingText, ImgSrc }) => {  //this is called destructuring

    const [Count, setCount] = useState(0)
    const employeeData = [
        {
            name: "kanchan Malviya",
            age: 24,
            IsEmploye: "yes",
            joiningDate: 2020
        },
        {
            name: "Sarita Jha",
            age: 30,
            IsEmploye: "No",
            joiningDate: 2012
        },
        {
            name: "Seema Gupta",
            age: 18,
            IsEmploye: "yes",
            joiningDate: 2021
        }]




    const Navigate = () => {
        Linking.openURL("https://reactnative.dev/")
    }

    const Counter_plusClick = () => {
        setCount(Count + 1);

    }
    const Counter_MinusClick = () => {
        if (Count > 0) {
            setCount(Count - 1);

        } else (Alert.alert("Value should not be in Minus"))

    }

    return (
        <View>
            <Text style={styles.container}> {headingText} </Text>

            <Image source={ImgSrc}
                style={styles.imageStyle}
            />

            <Button
                title="linking page"
                onPress={Navigate}
            />

            <Text>LIST SCROLL</Text>



            <FlatList
                horizontal
                data={employeeData}
                showsHorizontalScrollIndicator={false}
                renderItem={(elements) => {
                    return (
                        <View>
                            <View style={styles.box}>
                                <Text style={styles.textStyle}>{elements.item.name}</Text>
                                <Text style={styles.yearStyle} >{elements.item.age}</Text>
                                <Text style={styles.isemployeStyle}>{elements.item.IsEmploye}</Text>
                                <Text style={styles.dateStyle}>{elements.item.joiningDate}</Text>
                            </View>
                        </View>
                    )



                }} />

            {/* A COUNTER APP*/}

            <View>
                <Button style={styles.ButtonStyle} title="00" onPress={Counter_plusClick} />

                <Text
                    style={styles.ButtonStyle}
                    onPress={() => setCount(0)}
                >
                    Number - {Count}
                </Text>

                <Button style={styles.ButtonStyle} title="100" onPress={Counter_MinusClick} />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20

    },
    imageStyle: {
        height: 300,
        width: 400,
        marginVertical: 20,
    },

    box: {
        backgroundColor: "#00b2bf",
        color: " black",
        fontSize: 15,
        textAlign: "center",
        margin: 10,
        padding: 10
    },
    textStyle: {
        fontSize: 30,
        color: "black",
    },
    yearStyle: {
        fontSize: 20,
        color: "white",
    },

    ButtonStyle: {
        margin: "auto",
        padding: 10,
        textAlign: "center",
        color: "black",
        fontSize: 15

    }
})

export default Props;