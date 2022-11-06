// Installed Library Imports
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";

// Local Imports
import WalletMethods from "../../provider/WalletMethods";

const ConnectWalletButton = () => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<button
			className="flex items-center justify-center h-12 w-36 rounded-xl bg-black shadow-md shadow-gray-700 hover:bg-gray-700 text-white"
			onClick={() => WalletMethods.connectWallet(setIsLoading)}
		>
			{isLoading ? (
				<ImSpinner3 className="animate-spin" size="22px" />
			) : (
				"Connect Wallet"
			)}
		</button>
	);
};

export default ConnectWalletButton;
