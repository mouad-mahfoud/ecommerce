import {applyMiddleware, createStore} from "redux";
import rootReducer from "./rootReducer";
import {logger} from "redux-logger/src";

export const middleware = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;