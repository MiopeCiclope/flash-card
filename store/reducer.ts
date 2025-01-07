import { ADD_DECK, DeckActionTypes, Deck } from './action';

type State = {
  decks: Deck[];
};

const initialState: State = {
  decks: [],
};

export default function(state = initialState, action: DeckActionTypes): State {
  switch (action.type) {
    case ADD_DECK:
      return { ...state, decks: [...state.decks, action.deck] };
    default:
      return state;
  }
}
