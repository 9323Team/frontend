import { createStore, applyMiddleware,combineReducers  } from "redux";
import thunk from "redux-thunk";
import user from '../state/user/user-reducer'
import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(
    combineReducers({user}),
  composeWithDevTools(applyMiddleware(thunk))
);