import { selectDeck } from '@/store/deckAction';
import Ionicons from '@expo/vector-icons/build/Ionicons'
import { Href, Link } from 'expo-router'
import React from 'react'

type Action = "add" | "edit"

interface IHeaderButtonProps {
  icon: string;
  action: Action;
  navRef?: Href;
}

const HeaderButton = ({ icon, action, navRef }: IHeaderButtonProps) => {
  const
  //"/deck-detail"
  //() => dispatch(selectDeck())
  //"add"
  return (
    <Link href={navRef || "/"} style={{ marginRight: 10, fontSize: 18 }} onPress={onClick}>
      <Ionicons name={icon as any} size={20} />
    </Link>
  )
}

export default HeaderButton
