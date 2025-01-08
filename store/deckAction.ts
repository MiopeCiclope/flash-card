import { Deck } from "@/models/decks";

export const ADD_DECK = 'ADD_DECK';
export const SELECT_DECK = 'SELECT_DECK';

interface AddDeckAction {
  type: typeof ADD_DECK;
  decks: Deck[];
}

interface SelectDeckAction {
  type: typeof SELECT_DECK;
  selectedDeck?: Deck;
}

export type DeckActionTypes = AddDeckAction | SelectDeckAction

const replaceDeck = (deckList: Deck[], newDeck: Deck) => deckList.map(deck =>
  deck.id === newDeck.id ? newDeck : deck
);

export const addDeck = (deckList: Deck[], newDeck: Deck) => {
  const hasExistingDeck = deckList.some(deck => deck.id === newDeck.id);

  let updatedDecks;

  if (hasExistingDeck) {
    updatedDecks = replaceDeck(deckList, newDeck)
  } else {
    updatedDecks = [...deckList, newDeck];
  }

  return {
    type: ADD_DECK,
    decks: updatedDecks,
  };
};

export const addCard = (deckList: Deck[], newDeck: Deck) => {
  const updatedDecks = replaceDeck(deckList, newDeck)

  return {
    type: ADD_DECK,
    decks: updatedDecks,
  };
}

export const selectDeck = (deck?: Deck) => (
  {
    type: SELECT_DECK,
    selectedDeck: deck,
  })
