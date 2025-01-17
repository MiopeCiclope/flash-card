import { Card } from "@/models/card";
import { Deck } from "@/models/decks";

export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const SELECT_DECK = 'SELECT_DECK';
export const SELECT_CARD = 'SELECT_CARD';

interface AddDeckAction {
  type: typeof ADD_DECK;
  decks: Deck[];
  selectedDeck?: Deck;
}

interface DeleteDeckAction {
  type: typeof DELETE_DECK;
  decks: Deck[];
}

interface SelectDeckAction {
  type: typeof SELECT_DECK;
  selectedDeck?: Deck;
}

interface SelectCardAction {
  type: typeof SELECT_CARD;
  selectedCard?: Card;
}

export type DeckActionTypes = AddDeckAction | SelectDeckAction | DeleteDeckAction | SelectCardAction

const replaceDeck = (deckList: Deck[], newDeck: Deck) => deckList.map(deck =>
  deck.id === newDeck.id ? newDeck : deck
);

export const addDeck = (deckList: Deck[], newDeck: Deck) => {
  const hasExistingDeck = deckList.some(deck => deck.id === newDeck.id);

  let updatedDecks;

  if (hasExistingDeck) {
    updatedDecks = replaceDeck(deckList, newDeck)
    return {
      type: ADD_DECK,
      decks: updatedDecks,
      selectedDeck: newDeck
    };

  } else {
    updatedDecks = [...deckList, newDeck];
    return {
      type: ADD_DECK,
      decks: updatedDecks,
    };
  }
};

export const deleteDeck = (deckList: Deck[], deckId: string) => {
  const newDeckList = deckList.filter(deck => deck.id !== deckId);

  return {
    type: DELETE_DECK,
    decks: newDeckList,
  };
}

export const addCard = (deckList: Deck[], newDeck: Deck) => {
  const updatedDecks = replaceDeck(deckList, newDeck)

  return {
    type: ADD_DECK,
    decks: updatedDecks,
  };
}

export const selectCard = (card: Card | null) => (
  {
    type: SELECT_CARD,
    selectedCard: card,
  })

export const selectDeck = (deck?: Deck) => (
  {
    type: SELECT_DECK,
    selectedDeck: deck,
  })
