import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Deck as FlashDeck } from '@/models/decks';

const Deck = ({ iconName, name }: FlashDeck) => (
  <View style={styles.container}>
    <Link href="/(tabs)/one">
      <Ionicons name={iconName} size={30} color='#000' />
      <Text style={styles.title}>{name}</Text>
    </Link>
  </View>
);

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
