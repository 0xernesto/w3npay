// Installed Library Imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Local Imports
import providerReducer from "./ProviderReducer";

const rootReducer = combineReducers({
	providerReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
