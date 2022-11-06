// Installed Library Imports
import { ethers } from "ethers";

// Local Imports
import { onboard } from "./WalletModules";
import { store } from "../redux/store";
import {
	updateConnectionStatus,
	updateProvider,
	updateLibrary,
	updateSigner,
	updateCurrentAccount,
	updateCurrentChainId,
	updateEns,
} from "../redux/ProviderActions";

class WalletMethods {
	static connectWallet = async (setIsLoading) => {
		setIsLoading(true);
		try {
			const wallets = await onboard.connectWallet();
			if (wallets[0]) {
				// Get provider and wallet info
				const provider = wallets[0].provider;
				const library = new ethers.providers.Web3Provider(
					provider,
					"any"
				);
				const signer = library.getSigner();
				const account = wallets[0].accounts[0];
				const chainId = wallets[0].chains[0].id;

				let ethereumProvider = new ethers.providers.JsonRpcProvider(
					process.env.REACT_APP_ETHEREUM_RPC_URL
				);

				try {
					const name = await ethereumProvider.lookupAddress(
						account.address
					);
					let ens = null;

					if (name) {
						const resolver = await ethereumProvider.getResolver(
							name
						);

						if (resolver) {
							const [contentHash, avatar] = await Promise.all([
								resolver.getContentHash(),
								resolver.getAvatar(),
							]);

							const getText = resolver.getText.bind(resolver);

							ens = {
								name,
								avatar,
								contentHash,
								getText,
							};
						}
					}
					store.dispatch(updateEns(ens));
				} catch (error) {
					console.error(error);
				}
				// Update global state variables
				store.dispatch(updateConnectionStatus(true));
				store.dispatch(updateProvider(provider));
				store.dispatch(updateLibrary(library));
				store.dispatch(updateSigner(signer));
				store.dispatch(updateCurrentAccount(account));
				store.dispatch(updateCurrentChainId(parseInt(chainId)));
			}
		} catch (error) {
			console.log("\nError connecting wallet:\n", error);
		}
		setIsLoading(false);
	};

	static disconnectWallet = async () => {
		const [primaryWallet] = onboard.state.get().wallets;
		if (primaryWallet) {
			// Disconnect wallet
			await onboard.disconnectWallet({ label: primaryWallet.label });

			// Update global state variables
			store.dispatch(updateConnectionStatus(false));
			store.dispatch(updateProvider(null));
			store.dispatch(updateLibrary(null));
			store.dispatch(updateSigner(null));
			store.dispatch(updateCurrentAccount(null));
			store.dispatch(updateCurrentChainId(null));
		}
	};

	static switchNetwork = async (hexChainId) => {
		const success = await onboard.setChain({ chainId: hexChainId });
		if (success) {
			store.dispatch(updateCurrentChainId(parseInt(hexChainId)));
		}
	};

	static getState = async () => {
		return onboard.state.get();
	};
}

export default WalletMethods;
