import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import flights from "./flights";
import cart from "./cart";

const reducer = combineReducers({
  auth,
  cart,
  flights,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./flights";
export * from "./cart";
