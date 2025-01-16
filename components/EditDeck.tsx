import Ionicons from '@expo/vector-icons/build/Ionicons'
import { Link } from 'expo-router'
import React from 'react'

const EditDeck = () => {
  return (
    <Link href="/deck-detail" style={{ marginRight: 10, fontSize: 18 }}>
      <Ionicons name="pencil" size={20} />
    </Link>
  )
}

export default EditDeck
