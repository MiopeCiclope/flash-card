import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'expo-router';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Deck } from '@/models/decks';
import { Card } from '@/models/card';
import { selectCard } from '@/store/deckAction';

enum SwipeDirection {
  SwipeRight = 'SwipeRight',
  SwipeLeft = 'SwipeLeft',
  SwipeUp = 'SwipeUp',
  SwipeDown = 'SwipeDown',
  None = 'None',
}

const getSwipeDirection = (translationX: number, translationY: number): SwipeDirection => {
  if (Math.abs(translationX) > Math.abs(translationY)) {
    return translationX > 0 ? SwipeDirection.SwipeRight : SwipeDirection.SwipeLeft;
  } else {
    return translationY > 0 ? SwipeDirection.SwipeDown : SwipeDirection.SwipeUp;
  }
};

export default function TabOneScreen() {
  const deck = useSelector((state: any) => state?.deckReducer.selectedDeck) as Deck | null;
  const selectedCard = useSelector((state: any) => state?.deckReducer.selectedCard) as Card | null;
  const dispatch = useDispatch()

  const [displayedCards, setDisplayedCards] = useState<Set<number>>(new Set());
  const hasCard = deck && deck.cards && deck.cards.length > 0;

  useEffect(() => {
    if (hasCard && deck?.cards?.length && !selectedCard) {
      const firstCardIndex = Math.floor(Math.random() * deck.cards.length);
      dispatch(selectCard(deck.cards[firstCardIndex]));

      const initialSet = new Set<number>();
      initialSet.add(firstCardIndex);

      setDisplayedCards(initialSet);
    }
  }, [deck, selectedCard, dispatch]);

  const getRandomCard = (): Card | null => {
    if (!hasCard) return null;
    const remainingCards = deck.cards?.filter((_, index) => !displayedCards?.has(index)) ?? [];
    if (remainingCards.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    return remainingCards[randomIndex];
  };

  const handleGestureEnd = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;
    const swipeDirection = getSwipeDirection(translationX, translationY);

    switch (swipeDirection) {
      case SwipeDirection.SwipeLeft:
        const newCard = getRandomCard();
        if (newCard) {
          const newDisplayedCards = new Set(displayedCards);
          if (deck?.cards) {
            newDisplayedCards.add(deck.cards.indexOf(newCard));
          }
          setDisplayedCards(newDisplayedCards);
          dispatch(selectCard(newCard));
        } else {
          const restartSet = new Set<number>()
          setDisplayedCards(restartSet);

          if (deck?.cards) {
            dispatch(selectCard(deck?.cards[[...restartSet][0]]));
          }
        }
        break;
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onEnded={handleGestureEnd}>
        <View style={styles.container}>
          <View style={styles.card}>
            {selectedCard ? (
              <>
                <Link href="/(tabs)/two">
                  <Text style={styles.title}>{selectedCard.front.word}</Text>
                </Link>
              </>
            ) : (
              <Text style={styles.noCardsMessage}>No cards in the deck</Text>
            )}
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: '#fff8dc', // A light cream color for the notebook paper
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  cardLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  line: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 14,
  },
  rippedEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: '#fff8dc',
    borderTopWidth: 1,
    borderTopColor: '#d3d3d3',
    zIndex: 1,
    transform: [{ rotate: '-2deg' }],
  },
});
