import { useState, useEffect } from 'react';
import { Card } from '@/models/card';
import { Deck } from '@/models/decks';

function useDeckState(selectedDeck: Deck | null, displayingCard: Card | null, deckList: Deck[]) {
  const emptyCard: Card = {
    id: '',
    front: { word: '' },
    back: { translation: '', sound: '', detail: '' },
  };

  const [selectedCard, setSelectedCard] = useState<Card>(displayingCard || emptyCard);
  const [iconName, setIconName] = useState<string>(selectedDeck?.iconName || '');
  const [name, setName] = useState<string>(selectedDeck?.name || '');
  const [cardList, setCardList] = useState<Card[]>(selectedDeck?.cards || []);

  useEffect(() => {
    setSelectedCard(displayingCard || emptyCard);
    setIconName(selectedDeck?.iconName || '');
    setName(selectedDeck?.name || '');
    setCardList(selectedDeck?.cards || []);
  }, [selectedDeck, displayingCard, deckList]);

  return {
    selectedCard,
    setSelectedCard,
    iconName,
    setIconName,
    name,
    setName,
    cardList,
    setCardList,
  };
}

export default useDeckState;
