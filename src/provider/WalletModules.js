// Installed Library Imports
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import coinbaseWalletModule from "@web3-onboard/coinbase";

// Local Imports
import { toHex } from "../utils/UtilityFunctions";

const injected = injectedModule();
const walletConnect = walletConnectModule();
const coinbase = coinbaseWalletModule();

const modules = [injected, walletConnect, coinbase];

export const onboard = Onboard({
	wallets: modules,
	chains: [
		// Ethereum Mainnet
		{
			id: toHex(1),
			token: "ETH",
			label: "Ethereum",
			rpcUrl: process.env.REACT_APP_ETHEREUM_RPC_URL,
		},
		// Polygon Mainnet
		{
			id: toHex(137),
			token: "MATIC",
			label: "Polygon",
			rpcUrl: process.env.REACT_APP_POLYGON_RPC_URL,
		},
	],
	appMetadata: {
		name: "W3npay",
		icon: "/images/w3npayLogo.svg",
		logo: "/images/w3npayLogo.svg",
		description: "Web3 Venmo.",
	},
	notify: {
		desktop: {
			enabled: false,
		},
		mobile: {
			enabled: false,
		},
	},
	accountCenter: {
		desktop: {
			enabled: false,
		},
		mobile: {
			enabled: false,
		},
	},
});
