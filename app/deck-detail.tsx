import { Button, FlatList, TextInput, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDeck } from '@/store/deckAction';
import { Deck } from '@/models/decks';
import { router } from 'expo-router';
import { Card } from '@/models/card';

function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15);
}


export default function DeckDetail() {
  const selectedDeck = useSelector((state: any) => state?.deckReducer.selectedDeck);
  const deckList = useSelector((state: any) => state?.deckReducer.decks);
  const dispatch = useDispatch();

  const [iconName, setIconName] = useState(selectedDeck?.iconName || "");
  const [name, setName] = useState(selectedDeck?.name || "");
  const [cardList, setCardList] = useState<Card[]>(selectedDeck?.cards || []);

  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [sound, setSound] = useState("")
  const [details, setDetails] = useState("")

  const handleSubmit = () => {
    dispatch(addDeck(deckList, { id: !selectedDeck ? generateRandomId() : selectedDeck.id, name: name, iconName: iconName, cards: cardList } as Deck))
    router.back()
  };

  const handleSave = () => {
    if (word && translation && sound) {
      setCardList(prevState => [...prevState, { front: { word }, back: { translation, sound, details } } as any as Card])
      setWord("")
      setTranslation("")
      setSound("")
      setDetails("")
    }
  };

  return (
    <View>
      <TextInput
        style={styles.inputStyle}
        onChangeText={(text: string) => setName(text)}
        value={name}
        placeholder='Deck Name'
      />

      <TextInput
        style={styles.inputStyle}
        onChangeText={(text: string) => setIconName(text)}
        value={iconName}
        placeholder='Icon'
      />

      <TextInput style={styles.inputStyle} value={word} onChangeText={setWord} placeholder='word' />
      <TextInput style={styles.inputStyle} value={translation} onChangeText={setTranslation} placeholder='translation' />
      <TextInput style={styles.inputStyle} value={sound} onChangeText={setSound} placeholder='sound' />
      <TextInput style={styles.inputStyle} value={details} onChangeText={setDetails} placeholder='details' />

      <Button title="Save" onPress={handleSave} />

      <FlatList
        data={cardList}
        renderItem={({ item }: any) =>
        (
          <View>
            <Text>{item.front.word}</Text>
          </View>
        )}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );

}

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
