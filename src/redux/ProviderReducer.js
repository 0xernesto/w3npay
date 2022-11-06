// Local Imports
import { UPDATE_CONNECTION_STATUS } from "./ProviderActions";
import { UPDATE_PROVIDER } from "./ProviderActions";
import { UPDATE_SIGNER } from "./ProviderActions";
import { UPDATE_LIBRARY } from "./ProviderActions";
import { UPDATE_CURRENT_ACCOUNT } from "./ProviderActions";
import { UPDATE_CURRENT_CHAIN_ID } from "./ProviderActions";
import { UPDATE_ENS } from "./ProviderActions";

// Declare initial state
const initialState = {
	isWalletConnected: false,
	provider: null,
	signer: null,
	library: null,
	currentAccount: null,
	currentChainId: null,
	ens: null,
};

// Reducer
function providerReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_CONNECTION_STATUS:
			return { ...state, isWalletConnected: action.payload };
		case UPDATE_PROVIDER:
			return { ...state, provider: action.payload };
		case UPDATE_SIGNER:
			return { ...state, signer: action.payload };
		case UPDATE_LIBRARY:
			return { ...state, library: action.payload };
		case UPDATE_CURRENT_ACCOUNT:
			return { ...state, currentAccount: action.payload };
		case UPDATE_CURRENT_CHAIN_ID:
			return { ...state, currentChainId: action.payload };
		case UPDATE_ENS:
			return { ...state, ens: action.payload };
		default:
			return state;
	}
}

export default providerReducer;
