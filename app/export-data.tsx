import { View } from '@/components/Themed';
import { store } from '@/store/store';
import React, { useEffect, useState } from 'react'
import { Button, Clipboard, TextInput } from 'react-native';

function dumpStateToJSON() {
  const state = store.getState() as any;
  return JSON.stringify(state.deckReducer, null, 2);
}

const ExportData = () => {
  const [jsonData, setJsonData] = useState('');

  useEffect(() => {
    setJsonData(dumpStateToJSON());
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(jsonData);
  };

  return (
    <View style={{ display: 'flex', padding: 16, flexDirection: 'column', height: "100%" }}>
      <TextInput
        style={{ flex: 1 }}
        value={jsonData}
        multiline={true}
        placeholderTextColor="lightgray"
      />
      <Button title="Copy to Clipboard" onPress={copyToClipboard} />
    </View>
  )
}

export default ExportData
