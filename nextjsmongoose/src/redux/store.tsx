// src/redux/store.ts
import { createStore, combineReducers, Store, applyMiddleware } from "redux";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import counterReducer, { CounterState } from "./reducers/counter";
import { composeWithDevTools } from 'redux-devtools-extension';

// Root reducer
const rootReducer = combineReducers({
  counter: counterReducer,
});

// Define the root state type
export interface RootState {
  counter: CounterState;
}

// Create the Redux store
const makeStore: MakeStore<Store<RootState>> = (context: Context) =>
  createStore(rootReducer, composeWithDevTools());

// Export the wrapper
export const wrapper =
  createWrapper < Store < RootState >> (makeStore, { debug: false });
