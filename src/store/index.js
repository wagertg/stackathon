import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import flights from "./flights";
import cart from "./cart";

// 'combineReducers' combines the 'auth', 'flights', and 'cart' reducers into a single rootReducer.
const reducer = combineReducers({
  auth,
  cart,
  flights,
});

// 'createStore' creates a Redux store with the rootReducer and middleware (thunk and logger).
// Thunk middleware allows us to write async logic that interacts with the store.
// Logger middleware logs actions and states after they are dispatched.

const store = createStore(reducer, applyMiddleware(thunk, logger));

// Exports the created store as a default export.

export default store;

// Re-exports everything from 'auth', 'flights', and 'cart' modules for convenience.

export * from "./auth";
export * from "./flights";
export * from "./cart";
