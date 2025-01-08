import { ADD_DECK, DeckActionTypes, Deck, SELECT_DECK } from './deckAction';

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
      return { ...state, decks: [...action.decks] };
    case SELECT_DECK:
      return { ...state, selectedDeck: action.selectedDeck };
    default:
      return state;
  }
}
