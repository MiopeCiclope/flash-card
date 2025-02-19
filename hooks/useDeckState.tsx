import { useState, useEffect, useContext } from 'react';
import { Card } from '@/models/card';
import { Deck } from '@/models/decks';
import { RouteContext } from '@/contexts/RouterProvider';

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
  const [shouldNavigateBack, setShouldNavigateBack] = useState(false)

  const { previousRoute } = useContext(RouteContext);

  useEffect(() => {
    setSelectedCard(displayingCard || emptyCard);
    setIconName(selectedDeck?.iconName || '');
    setName(selectedDeck?.name || '');
    setCardList(selectedDeck?.cards || []);
    setShouldNavigateBack(previousRoute === "/card-display")
  }, [selectedDeck, displayingCard, deckList, previousRoute]);

  return {
    selectedCard,
    setSelectedCard,
    iconName,
    setIconName,
    name,
    setName,
    cardList,
    setCardList,
    shouldNavigateBack
  };
}

export default useDeckState;
