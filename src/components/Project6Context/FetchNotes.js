import React, {useContext, useEffect} from 'react';
import NoteContext from './NoteContext';
import {StyleSheet, View, FlatList, ScrollView} from 'react-native';
import {Avatar, Button, Text, Card, Title, Paragraph} from 'react-native-paper';
import AddNotes from './AddNotes';

const FetchNotes = () => {
  const a = useContext(NoteContext);

  return (
    <View>
      <View>
        <AddNotes />
      </View>

      <FlatList
        data={a}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          return (
            <View>
              <Card>
                <ScrollView>
                  <Card.Content>
                    <Title>{item.title}</Title>
                    <Paragraph>{item.description}</Paragraph>
                  </Card.Content>

                  <Card.Actions>
                    <Button style={{color: 'black'}}>Edit</Button>
                    <Button style={{color: 'white', backgroundColor: 'red'}}>
                      Delete
                    </Button>
                  </Card.Actions>
                </ScrollView>
              </Card>
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default FetchNotes;
