import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import NoteContext from './NoteContext';

const NoteState = props => {
  const [state, setState] = useState(notes);

  const notes = [
    {
      title: 'Endlish',
      description:
        'The 1960s with the release of Letraset sheets  containing Lorem Ipsum passages',
    },
    {
      title: 'Hindi',
      description:
        'publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      title: 'Maths',
      description: 'publishing software like Aldus PageMaker including Ipsum',
    },
    {
      title: 'Science',
      description:
        'containi publishing software like Aldus PageMaker  versions of Lorem Ipsum',
    },
    {
      title: 'Endlish',
      description:
        'The 1960s with the release of Letraset sheets  containing Lorem Ipsum passages',
    },
    {
      title: 'Hindi',
      description:
        'publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      title: 'Maths',
      description: 'publishing software like Aldus PageMaker including Ipsum',
    },
    {
      title: 'Science',
      description:
        'containi publishing software like Aldus PageMaker  versions of Lorem Ipsum',
    },
  ];
  return (
    <NoteContext.Provider value={state}>{props.children}</NoteContext.Provider>
  );
};
const styles = StyleSheet.create({});

export default NoteState;
