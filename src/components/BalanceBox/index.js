// Installed Library Ipmports
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Local Imports
import { truncateAddress } from "../../utils/UtilityFunctions";

const BalanceBox = () => {
	// State Management
	const { currentAccount, ens } = useSelector(
		(state) => state.providerReducer
	);
	const [balance, setBalance] = useState(
		Number(currentAccount.balance.MATIC).toFixed(3)
	);

	// TODO: if we get an ok after sending payment, we can just subtract it instead of getting from wallet

	return (
		<div className="flex flex-col items-start p-2 justify-center bg-gray-200 w-64 h-28 rounded-lg ring-1 ring-green-200">
			{ens ? (
				<span className="self-end">{ens.name}</span>
			) : (
				<span className="self-end">
					{truncateAddress(currentAccount.address)}
				</span>
			)}
			<span className="font-bold text-lg text-gray-600">Balance</span>
			<span className="font-bold text-2xl">{balance} MATIC</span>
		</div>
	);
};

export default BalanceBox;
