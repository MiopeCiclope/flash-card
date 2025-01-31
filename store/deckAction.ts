import { Card } from "@/models/card";
import { Deck } from "@/models/decks";

export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const DELETE_CARD = 'DELETE_CARD';
export const SELECT_DECK = 'SELECT_DECK';
export const SELECT_CARD = 'SELECT_CARD';
export const RESTORE = "RESTORE"
export const UNSELECT_DECK = "UNSELECT_DECK"

interface AddDeckAction {
  type: typeof ADD_DECK;
  decks: Deck[];
  selectedDeck?: Deck;
}

interface UnselectDeckAction {
  type: typeof UNSELECT_DECK;
}

interface RestoreAction {
  type: typeof RESTORE;
  payload: any;
}

interface DeleteDeckAction {
  type: typeof DELETE_DECK;
  decks: Deck[];
}

interface DeleteCardAction {
  type: typeof DELETE_CARD;
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

export type DeckActionTypes = AddDeckAction | SelectDeckAction | DeleteDeckAction | SelectCardAction | DeleteCardAction | RestoreAction | UnselectDeckAction

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

export const deleteCard = (deckList: Deck[], deck?: Deck, cardId?: string) => {
  const newCardList = deck?.cards?.filter(card => card.id !== cardId);
  let newDeckList: Deck[] = []

  if (deck && newCardList) {
    const newDeck: Deck = { ...deck, cards: newCardList }
    newDeckList = replaceDeck(deckList, newDeck)
  }

  return {
    type: DELETE_CARD,
    decks: newDeckList,
  };
}


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

export const selectCard = (card?: Card) => (
  {
    type: SELECT_CARD,
    selectedCard: card,
  })

export const selectDeck = (deck?: Deck) => {
  console.log(deck)
  return (
    {
      type: SELECT_DECK,
      selectedDeck: { ...deck },
    })
}

export const unselectDeck = () => {
  console.log("unselect")
  return (

    {
      type: UNSELECT_DECK,
    })
}

export const restore = (payload: any) => {
  console.log(payload)
  return (
    {
      type: RESTORE,
      payload: JSON.parse(payload)
    })
}
