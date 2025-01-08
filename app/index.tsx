import React from 'react';
import { View } from '@/components/Themed';
import Deck from '@/components/Deck';
import { useDispatch, useSelector } from 'react-redux';
import { addDeck } from '@/store/deckAction';
import { Deck as FlashDeck } from '@/models/decks';
import { Button } from 'react-native';

export default function ListScreen() {
  const dispatch = useDispatch();
  const deckList = useSelector((state: any) => state?.deckReducer.decks);

  const add = () => {
    const newDeck: FlashDeck = { id: "2", name: "test", iconName: "test" }; // replace with actual data
    dispatch(addDeck(deckList, newDeck))
  }

  return (
    <View>
      {deckList?.map((deck: FlashDeck, index: number) => <Deck key={index} id={deck.id} iconName='home' name={deck.name} />)}
      <Button title="Add Item" onPress={add} />
    </View>
  );
}
