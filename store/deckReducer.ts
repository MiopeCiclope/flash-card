import { Deck } from '@/models/decks';
import { ADD_DECK, DELETE_DECK, DeckActionTypes, SELECT_DECK } from './deckAction';

type State = {
  selectedDeck?: Deck;
  decks: Deck[];
};

const initialState: State = {
  selectedDeck: undefined,
  decks: [],
};

export default function(state = initialState, action: DeckActionTypes): State {
  switch (action.type) {
    case ADD_DECK:
      return { ...state, decks: [...action.decks], selectedDeck: action.selectedDeck };
    case SELECT_DECK:
      return { ...state, selectedDeck: action.selectedDeck };
    case DELETE_DECK:
      return { ...state, decks: [...action.decks] };

    default:
      return state;
  }
}
