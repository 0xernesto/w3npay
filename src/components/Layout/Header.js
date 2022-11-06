// Installed Library Imports
import { useSelector } from "react-redux";

// Local Imports
import ConnectWalletButton from "../ConnectWalletButton";
import WalletMenu from "../WalletMenu";
import NetworkButton from "../NetworkButton";

const Header = () => {
	// State Management
	const { isWalletConnected } = useSelector((state) => state.providerReducer);

	return (
		<div className="top-0 z-50 flex items-center justify-between p-4 mb-5 bg-transparent">
			<div className="flex items-center justify-center w-12">
				<img src="/images/w3npayLogo.svg" />
			</div>
			<div>
				{isWalletConnected ? (
					<div className="flex items-center justify-center">
						<NetworkButton />
						<WalletMenu />
					</div>
				) : (
					<ConnectWalletButton />
				)}
			</div>
		</div>
	);
};

export default Header;
