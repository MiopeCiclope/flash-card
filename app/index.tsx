import React, { useEffect } from 'react';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import Deck from '@/components/Deck';
import { useDispatch, useSelector } from 'react-redux';
import { addDeck } from '@/store/action';
import { Deck as FlashDeck } from '@/models/decks';
import { Button } from 'react-native';

export default function ListScreen() {
  const dispatch = useDispatch();
  const myData = useSelector((state: any) => state?.deckReducer);
  console.log(myData)

  const add = () => {
    const newDeck: FlashDeck = { id: "2", name: "test", iconName: "test" }; // replace with actual data
    dispatch(addDeck(newDeck))
  }

  return (
    <View>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>List</Text>
      <Link href="/(tabs)/one">
        navigate to tabs
      </Link>

      <Deck iconName='home' title='Home' />
      <Deck iconName='search' title='Search' />
      <Deck iconName='settings' title='Settings' />
      <Button title="Add Item" onPress={add} />
    </View>
  );
}
