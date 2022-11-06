// Installed Library Imports
import { useSelector } from "react-redux";
import { AiOutlineWarning } from "react-icons/ai";
import WalletMethods from "../../provider/WalletMethods";
import { toHex } from "../../utils/UtilityFunctions";

const NetworkButton = () => {
	// State Management
	const { currentChainId } = useSelector((state) => state.providerReducer);

	return (
		<>
			{currentChainId === 137 ? (
				<div className="flex items-center justify-center w-12 p-1 mr-2">
					<img src="/images/logoPolygon.svg" />
				</div>
			) : (
				<button
					className="flex items-center justify-center w-min-fit p-1 font-bold hover:text-red-700 text-red-800"
					onClick={() => WalletMethods.switchNetwork(toHex(137))}
				>
					<AiOutlineWarning size="25px" />
					<span className="mx-2 w-20">Change Network</span>
				</button>
			)}
		</>
	);
};

export default NetworkButton;
