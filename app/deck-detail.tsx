import { Button, FlatList, TextInput, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDeck, deleteCard, selectCard } from '@/store/deckAction';
import { Deck } from '@/models/decks';
import { router } from 'expo-router';
import { Card } from '@/models/card';
import ConfirmModal from '@/components/ConfirmModal';
import Ionicons from '@expo/vector-icons/build/Ionicons';

function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export default function DeckDetail() {
  const [deleteCardId, setDeleteCardId] = useState<string | null>(null);
  const selectedDeck = useSelector((state: any) => state?.deckReducer.selectedDeck);
  const displayingCard = useSelector((state: any) => state?.deckReducer.selectedCard);
  const deckList = useSelector((state: any) => state?.deckReducer.decks);
  const dispatch = useDispatch();

  const emptyCard: Card = {
    id: '',
    front: { word: '' },
    back: { translation: '', sound: '', detail: '' },
  }

  const [selectedCard, setSelectedCard] = useState(displayingCard || emptyCard)
  const [iconName, setIconName] = useState(selectedDeck?.iconName || "");
  const [name, setName] = useState(selectedDeck?.name || "");
  const [cardList, setCardList] = useState<Card[]>(selectedDeck?.cards || []);

  const handleSave = () => {
    if (selectedCard.front.word && selectedCard.back.translation && selectedCard.back.sound) {
      setCardList((prevState) => {
        const existingIndex = prevState.findIndex((c) => c.id === selectedCard.id);
        if (existingIndex !== -1) {
          const updatedList = [...prevState];
          updatedList[existingIndex] = selectedCard;

          if (selectedCard.id === displayingCard.id) {
            dispatch(selectCard(selectedCard))
          }

          return updatedList;
        } else {
          return [...prevState, { ...selectedCard, id: generateRandomId() }];
        }
      });

      setSelectedCard(emptyCard)
    }
  };

  const handleSubmit = () => {
    dispatch(addDeck(deckList, { id: !selectedDeck ? generateRandomId() : selectedDeck.id, name: name, iconName: iconName, cards: cardList } as Deck));
    router.back();
  };

  const removeCard = (deckList: Deck[], deck: Deck, cardId: string | null) => {
    if (!cardId) return

    dispatch(deleteCard(deckList, deck, cardId));
    setDeleteCardId(null)
  }

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

      <TextInput style={styles.inputStyle} value={selectedCard?.front.word || ''} onChangeText={
        (text: string) => setSelectedCard({
          ...selectedCard,
          front: { ...selectedCard.front, word: text },
        })
      } placeholder='word' />

      <TextInput style={styles.inputStyle} value={selectedCard?.back.translation || ''} onChangeText={
        (text: string) => setSelectedCard({
          ...selectedCard,
          back: { ...selectedCard.back, translation: text },
        })
      } placeholder='translation' />

      <TextInput style={styles.inputStyle} value={selectedCard?.back.sound || ''} onChangeText={
        (text: string) => setSelectedCard({
          ...selectedCard,
          back: { ...selectedCard.back, sound: text },
        })
      } placeholder='sound' />

      <TextInput style={styles.inputStyle} value={selectedCard?.back.detail || ''} onChangeText={
        (text: string) => setSelectedCard({
          ...selectedCard,
          back: { ...selectedCard.back, detail: text },
        })
      } placeholder='details' />

      <Button title="Save" onPress={handleSave} />

      <FlatList
        data={cardList}
        renderItem={({ item }: any) =>
        (
          <View>
            <Text>{item.front.word}</Text>
            <Ionicons name="trash" size={20} onPress={() => setDeleteCardId(item.id)} />
          </View>
        )}
      />

      <ConfirmModal
        visible={!!deleteCardId}
        onYes={() => { removeCard(deckList, selectedDeck, deleteCardId) }}
        onNo={() => setDeleteCardId(null)}
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
