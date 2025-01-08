import { ADD_DECK, DeckActionTypes, Deck, ADD_CARD } from './deckAction';

type State = {
  decks: Deck[];
};

const initialState: State = {
  decks: [],
};

export default function(state = initialState, action: DeckActionTypes): State {
  switch (action.type) {
    case ADD_DECK:
      return { ...state, decks: [...action.decks] };
    default:
      return state;
  }
}
