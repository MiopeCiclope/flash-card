import React, { useEffect } from 'react';
import { View } from '@/components/Themed';
import Deck from '@/components/Deck';
import { useDispatch, useSelector } from 'react-redux';
import { Deck as FlashDeck } from '@/models/decks';
import { useIsFocused } from '@react-navigation/native';
import { selectCard } from '@/store/deckAction';

export default function ListScreen() {
  const deckList = useSelector((state: any) => state?.deckReducer.decks);
  const isFocused = useIsFocused();
  const dispatch = useDispatch()

  useEffect(() => {
    if (isFocused) {
      dispatch(selectCard());
    }
  }, []);

  return (
    <View>
      {deckList?.map((deck: FlashDeck, index: number) => <Deck key={index} deck={deck} />)}
    </View>
  );
}
