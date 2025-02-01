import { Button, TextInput } from 'react-native';
import { View } from '@/components/Themed';
import React, { useState } from 'react';

export default function ModalScreen() {
  const [iconName, setIconName] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text: string) => setName(text)}
        value={name}
        placeholder='Deck Name'
        placeholderTextColor="lightgray"
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text: string) => setIconName(text)}
        value={iconName}
        placeholder='Icon'
        placeholderTextColor="lightgray"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
