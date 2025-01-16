import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Deck as FlashDeck } from '@/models/decks';
import { deleteDeck, selectDeck } from '@/store/deckAction';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import ConfirmModal from './ConfirmModal';

const Deck = ({ deck }: { deck: FlashDeck }) => {
  const { name } = deck;
  const [modalVisible, setModalVisible] = useState(false)

  const deckList = useSelector((state: any) => state?.deckReducer.decks);
  const dispatch = useDispatch();
  const openDeck = () => dispatch(selectDeck(deck))
  const removeDeck = () => {
    dispatch(deleteDeck(deckList, deck.id))
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <Link href="/(tabs)/one" onPress={openDeck}>
        <Text style={styles.title}>{name}</Text>
        <Ionicons name="trash" size={20} onPress={() => setModalVisible(true)} />
      </Link>
      <ConfirmModal
        visible={modalVisible}
        onYes={removeDeck}
        onNo={() => setModalVisible(false)}
      />

    </View >
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginTop: 5,
  }
});

export default Deck;
