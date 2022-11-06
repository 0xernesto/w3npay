// Installed Library Imports
import { useEffect, useState } from "react";
import { Client } from "@xmtp/xmtp-js";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { ImSpinner3 } from "react-icons/im";
import { useSelector } from "react-redux";

// Local Imports
import ContractMethods from "../../provider/ContractMethods";

const RequestModal = ({
	closeModal,
	isOpen,
	signer,
	senderAddress,
	recipientAddress,
}) => {
	const [message, setMessage] = useState("");
	const [amount, setAmount] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isRecipientOnNetwork, setIsRecipientOnNetwork] = useState(false);

	const checkRecipient = async (recipientAddress) => {
		const isOnNetwork = await Client.canMessage(recipientAddress, {
			env: "dev",
		});
		setIsRecipientOnNetwork(isOnNetwork);
	};

	const requestAmountWithMessage = async (
		setIsLoading,
		amount,
		recipientAddress,
		senderAddress,
		message
	) => {
		const xmtpClient = await Client.create(signer, { env: "dev" });

		if (xmtpClient) {
			const conversation = await xmtpClient.conversations.newConversation(
				recipientAddress
			);
			await conversation.send(message);
			const messages = await conversation.messages();
			const mostRecentMessageId = messages[messages.length - 1].id;
			console.log("messageId: ", mostRecentMessageId);
			await ContractMethods.request(
				setIsLoading,
				amount,
				recipientAddress,
				senderAddress,
				mostRecentMessageId
			);
		}
	};

	// Handle validity of input based on pattern defined (only positive integers or floats)
	const handleChange = (event) => {
		setAmount(event.target.validity.valid ? event.target.value : amount);
	};

	useEffect(() => {
		checkRecipient("0xE609c9f6687a44eA3a58A035E68CdFe0b63D4196");
	}, []);

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black opacity-10" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform rounded-lg shadow-md bg-white shadow-gray-900">
									<Dialog.Title
										as="h3"
										className="flex items-center justify-between text-lg font-bold"
									>
										<p>Request</p>
										<button
											className="p-1 text-black hover:text-gray-700"
											onClick={closeModal}
										>
											<AiOutlineClose size="20px" />
										</button>
									</Dialog.Title>
									<div className="flex flex-col items-center justify-center mt-2">
										<div className="flex items-center justify-center w-11/12 mb-2">
											<div className="flex items-center justify-center w-8 mr-2">
												<img src="/images/logoUSDC.svg" />
											</div>
											<input
												className="border-gray-400 p-2 focus:border-green-200 border rounded-lg outline-none appearance-none w-11/12"
												autoFocus={true}
												type="text"
												pattern="[0-9]*\.?[0-9]*"
												inputMode="decimal"
												placeholder="0.00"
												onWheel={(e) => e.target.blur()}
												autoComplete="off"
												value={amount}
												onInput={(event) =>
													handleChange(event)
												}
												disabled={
													isLoading ? true : false
												}
											/>
										</div>
										<label className="self-start font-bold ml-5">
											Message
										</label>
										<input
											type="textarea"
											value={message}
											onChange={(event) =>
												setMessage(event.target.value)
											}
											className="border-gray-400 align-top p-2 h-32 focus:border-green-200 border rounded-lg outline-none appearance-none w-11/12"
										/>
										{isRecipientOnNetwork ? (
											<button
												className="flex items-center justify-center h-12 px-2 mt-2 rounded-lg font-bold bg-black hover:bg-gray-700 text-white"
												onClick={() =>
													requestAmountWithMessage(
														setIsLoading,
														amount,
														"0xE609c9f6687a44eA3a58A035E68CdFe0b63D4196",
														senderAddress,
														message
													)
												}
											>
												{isLoading ? (
													<ImSpinner3
														className="animate-spin"
														size="22px"
													/>
												) : (
													"Request"
												)}
											</button>
										) : (
											<span className="text-red-800 mt-2">
												Recipient NOT on XMTP network.
											</span>
										)}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default RequestModal;
