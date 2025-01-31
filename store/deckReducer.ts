import { Deck } from '@/models/decks';
import { ADD_DECK, DELETE_CARD, DELETE_DECK, DeckActionTypes, RESTORE, SELECT_CARD, SELECT_DECK, UNSELECT_DECK } from './deckAction';
import { Card } from '@/models/card';

type State = {
  decks: Deck[];
  selectedDeck?: Deck;
  selectedCard?: Card
};

const initialState: State = {
  decks: [],
  selectedDeck: undefined,
  selectedCard: undefined
};

export default function(state = initialState, action: DeckActionTypes): State {
  switch (action.type) {
    case ADD_DECK:
      return { ...state, decks: [...action.decks], selectedDeck: action.selectedDeck };
    case SELECT_DECK:
      return { ...state, selectedDeck: action.selectedDeck };
    case UNSELECT_DECK:
      return { ...state, selectedDeck: undefined };
    case DELETE_DECK:
      return { ...state, decks: [...action.decks] };
    case SELECT_CARD:
      return { ...state, selectedCard: action.selectedCard };
    case DELETE_CARD:
      return { ...state, decks: [...action.decks], selectedCard: undefined };
    case RESTORE:
      return { ...action.payload }
    default:
      return state;
  }
}
