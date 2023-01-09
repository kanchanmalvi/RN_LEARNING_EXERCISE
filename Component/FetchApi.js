import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';

const FetchApi = () => {

    const [apiData, setApiData] = useState()
    console.log(apiData, "checking status")
    const [loading, setLoading] = useState(true)

    const apitest = async () => {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );
            const myData = await response.json();
            setApiData(myData);
            setLoading(false)

            // console.log(myData, "myData.........")
        }
        catch (error) {
            console.log(error, "testing error")
        }

    }

    useEffect(() => {
        apitest();

    }, [])

    return (
        <View>
            {
                loading ? (
                    <View>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <View>
                        <Text>FetchApi</Text>

                        <FlatList
                            data={apiData}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{
                                        backgroundColor: "grey",
                                        margin: 10,
                                        height: 200,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 10,

                                    }}>

                                        <Text style={styles.textBox}> # {item.id}</Text>
                                        <Text style={styles.textBox}>{item.title}</Text>

                                    </View>
                                )
                            }}
                        />

                    </View>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({

    textBox: {
        color: "black",
        fontSize: 20
    }
})

export default FetchApi;


