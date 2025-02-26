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
    <>
      <TextInput value={jsonData} />
      <Button title="Copy to Clipboard" onPress={copyToClipboard} />
    </>
  )
}

export default ExportData
