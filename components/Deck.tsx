import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Deck as FlashDeck } from '@/models/decks';
import { deleteDeck, selectCard, selectDeck } from '@/store/deckAction';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import ConfirmModal from './ConfirmModal';

const Deck = ({ deck }: { deck: FlashDeck }) => {
  const { name } = deck;
  const [modalVisible, setModalVisible] = useState(false);

  const deckList = useSelector((state: any) => state?.deckReducer.decks);
  const dispatch = useDispatch();
  const router = useRouter();

  const openDeck = () => {
    router.push('/card-display');
    dispatch(selectDeck(deck));
  }
  const cleanCard = () => dispatch(selectCard());

  const removeDeck = () => {
    dispatch(deleteDeck(deckList, deck.id));
    setModalVisible(false);
  };

  const editDeck = () => {
    cleanCard();
    openDeck();
    router.push('/deck-detail');
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={openDeck} style={styles.link}>
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={editDeck} style={styles.actionButton}>
          <Ionicons name="pencil" size={20} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.actionButton}>
          <Ionicons name="trash" size={20} color="#d9534f" />
        </TouchableOpacity>
      </View>
      <ConfirmModal
        visible={modalVisible}
        onYes={removeDeck}
        onNo={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Adds a shadow on Android
  },
  link: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
});

export default Deck;
