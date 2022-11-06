// Installed Library Imports
import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FiCopy, FiCheckSquare, FiExternalLink } from "react-icons/fi";
import { useSelector } from "react-redux";

// Local Imports
import WalletMethods from "../../provider/WalletMethods";
import { truncateAddress, copyToClipboard } from "../../utils/UtilityFunctions";

const WalletMenu = () => {
	// State Management
	const [copied, setCopied] = useState(false);
	const { currentAccount, ens } = useSelector(
		(state) => state.providerReducer
	);

	return (
		<Menu as="div" className="relative">
			{({ open }) => (
				<>
					<Menu.Button className="h-12 w-min-fit px-2 rounded-xl hover:bg-gray-700 text-white bg-black">
						{ens ? (
							<div className="flex items-center justify-center">
								{ens.avatar ? (
									<div className="flex items-center justify-center w-9 mr-2">
										<img
											className="rounded-full"
											src={ens.avatar.url}
										/>
									</div>
								) : (
									<div className="flex items-center justify-center w-9 mr-2">
										<img
											className="rounded-full"
											src="/images/blockies.png"
										/>
									</div>
								)}
								<span>{ens.name}</span>
							</div>
						) : (
							<div className="flex items-center justify-center">
								<div className="flex items-center justify-center w-9 mr-2">
									<img
										className="rounded-full"
										src="/images/blockies.png"
									/>
								</div>
								<span>
									{truncateAddress(currentAccount.address)}
								</span>
							</div>
						)}
					</Menu.Button>
					<Transition
						show={open}
						enter="transform transition duration-150 ease-in"
						enterFrom="opacity-0 scale-90"
						enterTo="opacity-100 scale-100"
						leave="trasnform transition duration-100 ease-out"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale 90"
					>
						<Menu.Items
							className="absolute right-0 flex flex-col origin-top-right rounded-xl top-14 w-56 bg-black focus:outline-none"
							static={true}
						>
							<div className="w-[250px] h-14 flex items-center justify-center">
								<button
									className="flex items-center justify-center w-full h-full font-bold text-white"
									onClick={() =>
										copyToClipboard(
											currentAccount.address,
											setCopied
										)
									}
								>
									{truncateAddress(currentAccount.address)}
									{!copied ? (
										<FiCopy className="ml-2" size="16px" />
									) : (
										<>
											<FiCheckSquare
												className="ml-2 text-white"
												size="16px"
											/>
											<span className="ml-2 font-normal text-white">
												Copied!
											</span>
										</>
									)}
								</button>
							</div>
							<Menu.Item>
								{({ active }) => (
									<a
										className={`px-2 py-1 flex items-center justify-center text-white h-14 border-t border-t-gray-600 ${
											active ? "bg-gray-700" : ""
										}`}
										href={`https://polygonscan.com/address/${currentAccount.address}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										View on explorer
										<FiExternalLink
											className="ml-2"
											size="16px"
										/>
									</a>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button
										className={`px-2 py-1 flex items-center justify-center h-14 border-t text-white border-t-gray-600  ${
											active
												? "bg-gray-700 rounded-b-xl"
												: ""
										}`}
										onClick={() =>
											WalletMethods.disconnectWallet()
										}
									>
										Disconnect
									</button>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};

export default WalletMenu;
