// Installed Library Imports
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Local Imports
import SendModal from "../SendModal";
import ContractMethods from "../../provider/ContractMethods";
import { truncateAddress } from "../../utils/UtilityFunctions";

const PaymentRequests = () => {
	// State Management
	const [transactions, setTransactions] = useState(null);
	const [messages, setMessages] = useState(null);
	const [tableData, setTableData] = useState(null);
	const [isSendModalOpen, setIsSendModalOpen] = useState(false);
	const { signer } = useSelector((state) => state.providerReducer);

	const closeSendModal = () => {
		setIsSendModalOpen(false);
	};

	const openSendModal = () => {
		setIsSendModalOpen(true);
	};

	const getTableData = async () => {
		const myMessages = [
			{ message: "Pay me, please.", messageId: "122sf31f" },
			{ message: "You owe me.", messageId: "12f0931f" },
		];
		setMessages(myMessages);
		const transactionsList = await ContractMethods.getTransactions();
		setTransactions(transactionsList);

		let objectsList = [];
		for (let i = 0; i < transactionsList.length; i++) {
			if (!transactionsList[i].paid) {
				// Only transactions that aren't paid yet
				for (let j = 0; j < myMessages.length; j++) {
					objectsList.push({
						from: transactionsList[i].from,
						amount: transactionsList[i].amount,
						message: myMessages[j].message,
						id: transactionsList[i].id,
					});
				}
			}
		}
		setTableData(objectsList);
	};

	useEffect(() => {
		getTableData();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center w-full overflow-hidden max-w-2xl p-2 mt-5 bg-gray-200 ring-1 ring-green-200 rounded-lg h-fit">
			<h2 className="mt-3 text-lg font-bold mb-7">Payment Requests</h2>
			<table className="block w-full h-full mb-3 overflow-x-auto table-auto">
				<thead className="border-b border-zinc-500">
					<tr className="px-8 py-4 text-center">
						<th>Requestor</th>
						<th>Amount</th>
						<th>Message</th>
						<th>Pay</th>
					</tr>
				</thead>
				<tbody>
					{tableData &&
						tableData.map((request) => (
							<tr
								className="border-b border-gray-300"
								key={request.message}
							>
								<td className="py-4 pl-4 pr-9 whitespace-nowrap">
									<span>{truncateAddress(request.from)}</span>
								</td>
								<td className="py-4 px-8 whitespace-nowrap">
									<span>
										{parseInt(request.amount) * 1e-6} USDC
									</span>
								</td>
								<td className="py-4 px-10 whitespace-nowrap">
									<span>{request.message}</span>
								</td>
								<td className="py-4 px-8 whitespace-nowrap">
									<button
										className="w-20 h-10 mx-1 p-2 font-bold bg-black rounded-lg hover:bg-gray-700 text-white"
										onClick={() => openSendModal()}
									>
										Pay
									</button>
									<SendModal
										closeModal={closeSendModal}
										isOpen={isSendModalOpen}
										signer={signer}
										isPayRequest={true}
										requestAmount={
											parseInt(request.amount) * 1e-6
										}
										recipientAddress={request.from}
										messageId=""
										transactionId={request.id.toString()}
									/>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default PaymentRequests;
