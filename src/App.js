// Installed Library Imports
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Client } from "@xmtp/xmtp-js";

// Local Imports
import Layout from "./components/Layout";
import BalanceBox from "./components/BalanceBox";
import AddressBook from "./components/AddressBook";
import PaymentRequests from "./components/PaymentRequests";

function App() {
	// State Management
	const { isWalletConnected } = useSelector((state) => state.providerReducer);

	return (
		<div className="flex flex-col min-h-screen bg-white text-gray-800">
			<Layout>
				<div className="flex flex-col items-center justify-start w-full min-h-screen px-4">
					{isWalletConnected ? (
						<div className="flex items-center justify-start flex-col w-11/12">
							<BalanceBox />
							<AddressBook />
							<PaymentRequests />
						</div>
					) : null}
				</div>
			</Layout>
		</div>
	);
}

export default App;
