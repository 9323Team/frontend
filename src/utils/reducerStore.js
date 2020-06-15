import { createStore, applyMiddleware,combineReducers  } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(
    combineReducers({}),
  composeWithDevTools(applyMiddleware(thunk))
);