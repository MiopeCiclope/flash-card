import React from 'react';
import { View } from '@/components/Themed';
import Deck from '@/components/Deck';
import { useSelector } from 'react-redux';
import { Deck as FlashDeck } from '@/models/decks';

export default function ListScreen() {
  const deckList = useSelector((state: any) => state?.deckReducer.decks);

  return (
    <View>
      {deckList?.map((deck: FlashDeck, index: number) => <Deck key={index} id={deck.id} iconName='home' name={deck.name} />)}
    </View>
  );
}
