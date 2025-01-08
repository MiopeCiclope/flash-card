import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import deckReducer from "./deckReducer";

const rootReducer = combineReducers({
  deckReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

export const store = createStore(persistedReducer); // Your regular store
export const persistor = persistStore(store); // Your persistent store
