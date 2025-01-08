import { Button, TextInput } from 'react-native';
import { View } from '@/components/Themed';
import { useState } from 'react';

export default function DeckDetail() {
  const [iconName, setIconName] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    console.log('Submitted icon:', iconName);
    console.log('Submitted icon:', name);
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text: string) => setName(text)}
        value={name}
        placeholder='Deck Name'
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text: string) => setIconName(text)}
        value={iconName}
        placeholder='Icon'
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
