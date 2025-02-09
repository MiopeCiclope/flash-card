import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Deck } from '@/models/decks';
import { Card } from '@/models/card';
import { selectCard } from '@/store/deckAction';
import { CardFront } from '@/components/CardFront';
import { CardBack } from '@/components/CardBack';
import { useIsFocused } from '@react-navigation/native';

enum SwipeDirection {
  SwipeRight = 'SwipeRight',
  SwipeLeft = 'SwipeLeft',
  SwipeUp = 'SwipeUp',
  SwipeDown = 'SwipeDown',
  None = 'None',
}

const getSwipeDirection = (
  translationX: number,
  translationY: number,
  threshold: number = 10
): SwipeDirection => {
  if (Math.abs(translationX) > Math.abs(translationY)) {
    if (Math.abs(translationX) > threshold) {
      const direction = translationX > 0 ? SwipeDirection.SwipeRight : SwipeDirection.SwipeLeft;
      return direction;
    }
  } else {
    if (Math.abs(translationY) > threshold) {
      const direction = translationY > 0 ? SwipeDirection.SwipeDown : SwipeDirection.SwipeUp;
      return direction;
    }
  }
  return SwipeDirection.None;
};
export default function CardDisplay() {
  const [isFront, setIsFront] = useState(true)
  const deck = useSelector((state: any) => state?.deckReducer.selectedDeck) as Deck | null;
  const selectedCard = useSelector((state: any) => state?.deckReducer.selectedCard) as Card | null;
  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const [current, setCurrent] = useState<number>(0)

  const [displayedCards, setDisplayedCards] = useState<Set<number>>(new Set());
  const hasCard = deck && deck.cards && deck.cards.length > 0;

  useEffect(() => {
    if (isFocused && hasCard && deck?.cards?.length && !selectedCard && displayedCards.size === 0) {
      console.log("fudeu")
      const firstCardIndex = Math.floor(Math.random() * deck.cards.length);
      dispatch(selectCard(deck.cards[firstCardIndex]));

      const initialSet = new Set<number>();
      initialSet.add(firstCardIndex);

      setDisplayedCards(initialSet);
      setCurrent(0)
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
    setIsFront(true)
    console.log("display", displayedCards.size)
    console.log("previous", current)

    switch (swipeDirection) {
      case SwipeDirection.SwipeLeft:
        const newCard = getRandomCard();

        // current is the last in displayedCards and there is no card left
        if (newCard === null && current === (displayedCards.size - 1)) {
          // current = 0
          // get a new random card
          console.log("case 3: restart")
          const restartSet = new Set<number>()
          setDisplayedCards(restartSet);

          if (deck?.cards) {
            dispatch(selectCard(deck?.cards[[...restartSet][0]]));
          }

          // there is more cards and it is the last one
        } else if (newCard !== null && current === (displayedCards.size - 1)) {
          // current + 1
          // get a new random card

          console.log("case 1")
          setCurrent(current + 1)
          const newDisplayedCards = new Set(displayedCards);
          if (deck?.cards) {
            newDisplayedCards.add(deck.cards.indexOf(newCard));
          }
          setDisplayedCards(newDisplayedCards);
          dispatch(selectCard(newCard));

          // current is not the last displayed
        } else {
          // current + 1
          // get next card from displyed
          console.log("case 2")
          const next = current + 1
          setCurrent(next)
          const cardDeckIndex = Array.from(displayedCards)[next]

          if (deck?.cards) {
            const cardToDisplay = deck.cards[cardDeckIndex]
            dispatch(selectCard(cardToDisplay));
          }
        }
        break;
      case SwipeDirection.SwipeRight:
        if (current === 0) {
          setIsFront(true)
          setCurrent(-1)
          dispatch(selectCard());
        } else if (current > 0) {
          console.log("voltando")
          const cardDeckIndex = Array.from(displayedCards)[current - 1]

          setCurrent(current - 1)
          if (deck?.cards) {
            dispatch(selectCard(deck.cards[cardDeckIndex]));
          }
        }
        break;
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onEnded={handleGestureEnd}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setIsFront(!isFront)} style={styles.card}>
            {isFront ? (<CardFront card={selectedCard} />) : (<CardBack card={selectedCard} />)}
          </TouchableOpacity>
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
});
