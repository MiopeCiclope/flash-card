import { FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDeck, deleteCard, selectCard } from '@/store/deckAction';
import { Deck } from '@/models/decks';
import { useRouter } from 'expo-router';
import { Card } from '@/models/card';
import ConfirmModal from '@/components/ConfirmModal';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import useDeckState from '@/hooks/useDeckState';

function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15);
}

const emptyCard: Card = {
  id: '',
  front: { word: '' },
  back: { translation: '', sound: '', detail: '' },
};

export default function DeckDetail() {
  const router = useRouter()
  const [deleteCardId, setDeleteCardId] = useState<string | null>(null);
  const selectedDeck = useSelector((state: any) => state?.deckReducer.selectedDeck);
  const displayingCard = useSelector((state: any) => state?.deckReducer.selectedCard);
  const deckList = useSelector((state: any) => state?.deckReducer.decks);
  const dispatch = useDispatch();

  const {
    selectedCard,
    setSelectedCard,
    iconName,
    setIconName,
    name,
    setName,
    cardList,
    setCardList,
  } = useDeckState(selectedDeck, displayingCard, deckList)

  const handleSave = () => {
    if (selectedCard.front.word && selectedCard.back.translation && selectedCard.back.sound) {
      setCardList((prevState) => {
        const existingIndex = prevState.findIndex((c) => c.id === selectedCard.id);
        if (existingIndex !== -1) {
          const updatedList = [...prevState];
          updatedList[existingIndex] = selectedCard;

          if (selectedCard.id === displayingCard.id) {
            dispatch(selectCard(selectedCard));
          }

          return updatedList;
        } else {
          return [...prevState, { ...selectedCard, id: generateRandomId() }];
        }
      });

      setSelectedCard(emptyCard);
    }
  };

  const handleSubmit = () => {
    dispatch(
      addDeck(deckList, {
        id: !selectedDeck ? generateRandomId() : selectedDeck.id,
        name: name,
        iconName: iconName,
        cards: cardList,
      } as Deck)
    );
    router.back();
  };

  const removeCard = (deckList: Deck[], deck: Deck, cardId: string | null) => {
    if (!cardId) return;

    dispatch(deleteCard(deckList, deck, cardId));
    setDeleteCardId(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        onChangeText={(text: string) => setName(text)}
        value={name}
        placeholder="Deck Name"
        placeholderTextColor="lightgray"
      />

      <TextInput
        style={styles.inputStyle}
        onChangeText={(text: string) => setIconName(text)}
        value={iconName}
        placeholder="Icon"
        placeholderTextColor="lightgray"
      />

      <TextInput
        style={styles.inputStyle}
        value={selectedCard?.front.word || ''}
        onChangeText={(text: string) =>
          setSelectedCard({
            ...selectedCard,
            front: { ...selectedCard.front, word: text },
          })
        }
        placeholder="Word"
        placeholderTextColor="lightgray"
      />

      <TextInput
        style={styles.inputStyle}
        value={selectedCard?.back.translation || ''}
        onChangeText={(text: string) =>
          setSelectedCard({
            ...selectedCard,
            back: { ...selectedCard.back, translation: text },
          })
        }
        placeholder="Translation"
        placeholderTextColor="lightgray"
      />

      <TextInput
        style={styles.inputStyle}
        value={selectedCard?.back.sound || ''}
        onChangeText={(text: string) =>
          setSelectedCard({
            ...selectedCard,
            back: { ...selectedCard.back, sound: text },
          })
        }
        placeholder="Sound"
        placeholderTextColor="lightgray"
      />

      <TextInput
        style={styles.inputStyle}
        value={selectedCard?.back.detail || ''}
        onChangeText={(text: string) =>
          setSelectedCard({
            ...selectedCard,
            back: { ...selectedCard.back, detail: text },
          })
        }
        placeholder="Details"
        placeholderTextColor="lightgray"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <FlatList
        data={cardList}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.front.word}</Text>
            <TouchableOpacity onPress={() => setDeleteCardId(item.id)}>
              <Ionicons name="trash" size={20} color="#d9534f" />
            </TouchableOpacity>
          </View>
        )}
      />

      <ConfirmModal
        visible={!!deleteCardId}
        onYes={() => {
          removeCard(deckList, selectedDeck, deleteCardId);
        }}
        onNo={() => setDeleteCardId(null)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  inputStyle: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
});
