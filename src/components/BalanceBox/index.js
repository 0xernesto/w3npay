// Installed Library Ipmports
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Local Imports
import { truncateAddress } from "../../utils/UtilityFunctions";
import ContractMethods from "../../provider/ContractMethods";

const BalanceBox = ({ usdc }) => {
	// State Management
	const { currentAccount, ens } = useSelector(
		(state) => state.providerReducer
	);
	const [maticBalance, setMaticBalance] = useState(0);
	const [usdcBalance, setUsdcBalance] = useState(0);

	const getMaticBalance = async () => {
		setMaticBalance(Number(currentAccount.balance.MATIC).toFixed(3));
	};

	const getUsdcBalance = async () => {
		setUsdcBalance(
			(parseInt(await ContractMethods.getUsdcBalance()) * 1e-6).toFixed(3)
		);
	};

	useEffect(() => {
		getMaticBalance();
		getUsdcBalance();
	}, []);

	// TODO: if we get an ok after sending payment, we can just subtract it instead of getting from wallet

	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col items-start p-2 justify-center bg-gray-200 w-64 h-28 rounded-lg ring-1 ring-green-200 mr-2">
				{ens ? (
					<span className="self-end">{ens.name}</span>
				) : (
					<span className="self-end">
						{truncateAddress(currentAccount.address)}
					</span>
				)}
				<span className="font-bold text-lg text-gray-600">Balance</span>
				<span className="font-bold text-2xl">{maticBalance} MATIC</span>
			</div>
			<div className="flex flex-col items-start p-2 justify-center bg-gray-200 w-64 h-28 rounded-lg ring-1 ring-green-200 ml-2">
				{ens ? (
					<span className="self-end">{ens.name}</span>
				) : (
					<span className="self-end">
						{truncateAddress(currentAccount.address)}
					</span>
				)}
				<span className="font-bold text-lg text-gray-600">Balance</span>
				<span className="font-bold text-2xl">{usdcBalance} USDC</span>
			</div>
		</div>
	);
};

export default BalanceBox;
