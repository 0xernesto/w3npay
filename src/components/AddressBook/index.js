// Installed Library Imports
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Local Imports
import SendModal from "../SendModal";
import RequestModal from "../RequestModal";
import { truncateAddress } from "../../utils/UtilityFunctions";

const AddressBook = () => {
	// State Management
	const [addressBook, setAddressBook] = useState(null);
	const [isSendModalOpen, setIsSendModalOpen] = useState(false);
	const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
	const { currentAccount, signer } = useSelector(
		(state) => state.providerReducer
	);

	const closeSendModal = () => {
		setIsSendModalOpen(false);
	};

	const openSendModal = () => {
		setIsSendModalOpen(true);
	};

	const closeRequestModal = () => {
		setIsRequestModalOpen(false);
	};

	const openRequestModal = () => {
		setIsRequestModalOpen(true);
	};

	const getTransactionData = async () => {
		// Add the API key to an header object. DO NOT SHARE API KEY
		const header = new Headers({
			"x-dune-api-key": process.env.REACT_APP_DUNE_API_KEY,
		});

		// Add parameters we would pass to the query
		var params = {
			query_parameters: {
				wallet_address: currentAccount.address,
			},
		};

		// Request Body
		var body = JSON.stringify(params);

		//  Call the Dune API: Execute Query ID
		const response = await fetch(
			"https://api.dune.com/api/v1/query/1532273/execute",
			{
				method: "POST",
				headers: header,
				body: body, // This is where we pass the parameters
			}
		);

		const response_object = await response.json();

		//  Call the Dune API: Execute results
		const execution_id = `https://api.dune.com/api/v1/execution/${response_object.execution_id}/results`;

		const query_results = await fetch(execution_id, {
			method: "GET",
			headers: header,
		});

		const execution_object = await query_results.json();
		setAddressBook(execution_object.result.rows);
	};

	useEffect(() => {
		getTransactionData();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center w-full overflow-hidden max-w-2xl p-2 mt-5 bg-gray-200 ring-1 ring-green-200 rounded-lg h-fit">
			<h2 className="mt-3 text-lg font-bold mb-7">Address Book</h2>
			<table className="block w-full h-full mb-3 overflow-x-auto table-auto">
				<thead className="border-b border-zinc-500">
					<tr className="px-12 py-4 text-center">
						<th>Address</th>
						<th>Interactions</th>
						<th>Total Value</th>
						<th>Send/Request</th>
					</tr>
				</thead>
				<tbody>
					{addressBook &&
						addressBook.map((contact) => (
							<tr
								className="border-b border-gray-300"
								key={contact.walletid}
							>
								<td className="py-4 pl-4 pr-7 whitespace-nowrap">
									<span>
										{truncateAddress(
											contact.walletid.replace("\\", "0")
										)}
									</span>
								</td>
								<td className="py-4 px-14 whitespace-nowrap">
									<span>{contact.transactions}</span>
								</td>
								<td className="py-4 px-14 whitespace-nowrap">
									<span>
										{contact.totaltraded.toFixed(3)}
									</span>
								</td>
								<td className="pr-4 pl-7 py-4 whitespace-nowrap">
									<div className="flex items-center justify-center">
										<button
											className="w-20 h-10 mx-1 p-2 font-bold bg-black rounded-lg hover:bg-gray-700 text-white"
											onClick={() => openSendModal()}
										>
											Pay
										</button>
										<button
											className="w-20 h-10 mx-1 p-2 font-bold bg-black rounded-lg hover:bg-gray-700 text-white"
											onClick={() => openRequestModal()}
										>
											Request
										</button>
										<SendModal
											closeModal={closeSendModal}
											isOpen={isSendModalOpen}
											signer={signer}
											recipientAddress={contact.walletid.replace(
												"\\",
												"0"
											)}
										/>
										<RequestModal
											closeModal={closeRequestModal}
											isOpen={isRequestModalOpen}
											signer={signer}
											senderAddress={
												currentAccount.address
											}
											recipientAddress={contact.walletid.replace(
												"\\",
												"0"
											)}
										/>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default AddressBook;
