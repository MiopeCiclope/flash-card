import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Deck as FlashDeck } from '@/models/decks';
import { selectDeck } from '@/store/deckAction';
import { useDispatch } from 'react-redux';

const Deck = (deck: FlashDeck) => {
  const { iconName, name } = deck;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Link href="/(tabs)/one" onPress={() => dispatch(selectDeck(deck))}>
        <Ionicons name={iconName} size={30} color='#000' />
        <Text style={styles.title}>{name}</Text>
      </Link>
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
