import React from 'react'
import { StyleSheet, Text } from 'react-native';
import { Card } from '@/models/card';

export const CardFront = (props: { card?: Card | null }) => {
  const { card } = props

  return (
    <>
      {card ? (
        <>
          <Text style={styles.title}>{card.front.word}</Text>
        </>
      ) : (
        <Text style={styles.noCardsMessage}>No cards in the deck</Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  noCardsMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
