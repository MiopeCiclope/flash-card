import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Link } from 'expo-router';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Deck } from '@/models/decks';
import { Card } from '@/models/card';

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
  const hasCard = deck && deck.cards && deck.cards.length > 0;

  const getInitialSet = () => {
    const initialSet = new Set<number>();
    if (hasCard && deck?.cards?.length) {
      const firstCardIndex = Math.floor(Math.random() * deck.cards.length);
      initialSet.add(firstCardIndex);
      return initialSet;
    }
    return initialSet;

  }
  const [displayedCards, setDisplayedCards] = useState<Set<number>>(getInitialSet());

  const getRandomCard = (): Card | null => {
    if (!hasCard) return null;
    const remainingCards = deck.cards?.filter((_, index) => !displayedCards.has(index)) ?? [];
    if (remainingCards.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    return remainingCards[randomIndex];
  };

  const [displayedCard, setDisplayedCard] = useState<Card | null>(() => {
    if (hasCard && deck?.cards?.length) {
      const firstCardIndex = [...displayedCards][0];
      return deck.cards[firstCardIndex];
    }
    return getRandomCard();
  });

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
          setDisplayedCard(newCard);
        } else {
          const restartSet = getInitialSet()
          setDisplayedCards(restartSet);

          if (deck?.cards) {
            setDisplayedCard(deck?.cards[[...restartSet][0]]);
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
            {displayedCard ? (
              <>
                <Link href="/(tabs)/two">
                  <Text style={styles.title}>{displayedCard.front.word}</Text>
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
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
  },
  noCardsMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
