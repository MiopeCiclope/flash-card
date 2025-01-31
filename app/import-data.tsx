import { restore } from '@/store/deckAction';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

const DeckScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(restore(inputValue));
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        style={styles.input}
        placeholder="Enter content"
        value={inputValue}
        onChangeText={setInputValue}
        placeholderTextColor="lightgray"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contentContainer: {
    marginTop: 16,
  },
});

export default DeckScreen;
