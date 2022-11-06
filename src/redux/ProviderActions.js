export const UPDATE_CONNECTION_STATUS = "UPDATE_CONNECTION_STATUS";
export const UPDATE_PROVIDER = "UPDATE_PROVIDER";
export const UPDATE_SIGNER = "UPDATE_SIGNER";
export const UPDATE_LIBRARY = "UPDATE_LIBRARY";
export const UPDATE_CURRENT_ACCOUNT = "UPDATE_CURRENT_ACCOUNT";
export const UPDATE_CURRENT_CHAIN_ID = "UPDATE_CURRENT_CHAIN_ID";
export const UPDATE_ENS = "UPDATE_ENS";

export const updateConnectionStatus = (isWalletConnected) => (dispatch) => {
	dispatch({
		type: UPDATE_CONNECTION_STATUS,
		payload: isWalletConnected,
	});
};

export const updateProvider = (provider) => (dispatch) => {
	dispatch({
		type: UPDATE_PROVIDER,
		payload: provider,
	});
};

export const updateSigner = (signer) => (dispatch) => {
	dispatch({
		type: UPDATE_SIGNER,
		payload: signer,
	});
};

export const updateLibrary = (library) => (dispatch) => {
	dispatch({
		type: UPDATE_LIBRARY,
		payload: library,
	});
};

export const updateCurrentAccount = (currentAccount) => (dispatch) => {
	dispatch({
		type: UPDATE_CURRENT_ACCOUNT,
		payload: currentAccount,
	});
};

export const updateCurrentChainId = (currentChainId) => (dispatch) => {
	dispatch({
		type: UPDATE_CURRENT_CHAIN_ID,
		payload: currentChainId,
	});
};

export const updateEns = (ens) => (dispatch) => {
	dispatch({
		type: UPDATE_ENS,
		payload: ens,
	});
};
