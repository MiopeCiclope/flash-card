import { Deck } from "@/models/decks";

export const ADD_DECK = 'ADD_DECK';

interface AddDeckAction {
  type: typeof ADD_DECK;
  deck: Deck;
}

export type DeckActionTypes = AddDeckAction;
