import { selectDeck } from '@/store/deckAction';
import Ionicons from '@expo/vector-icons/build/Ionicons'
import { Link } from 'expo-router'
import React from 'react'
import { useDispatch } from 'react-redux';

const AddDeck = () => {
  const dispatch = useDispatch();

  return (
    <Link href="/deck-detail" style={{ marginRight: 10, fontSize: 18 }} onPress={() => dispatch(selectDeck())}>
      <Ionicons name="add" size={20} />
    </Link>
  )
}

export default AddDeck
