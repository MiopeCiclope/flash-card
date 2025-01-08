import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useState } from 'react';

const iconNames = Object.keys(Ionicons.glyphMap);

export default function ModalScreen() {
  const [selectedIcon, setSelectedIcon] = useState(null); // Selected icon state

  const handleSubmit = () => {
    console.log('Submitted icon:', selectedIcon);
    // Add code here to handle the submission of the selected icon
  };

  return (
    <View>
      <SearchableDropdown
        onItemSelect={(item) => setSelectedIcon(item.id)}
        containerStyle={{ padding: 5 }}
        textInputProps={
          {
            placeholder: "Search for an icon...",
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            },
          }
        }
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#ddd',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,
        }}
        items={iconNames.map((name) => ({ name, id: name }))} // Map icon names to dropdown items
      />
      <Button title="Submit" onPress={handleSubmit} /> // Submit button to handle the selected icon
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
