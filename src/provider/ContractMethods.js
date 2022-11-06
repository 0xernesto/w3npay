// Installed Library Imports
import { ethers } from "ethers";

// Local Imports
import UsdcContract from "../contracts/UsdcContract.json";
import W3npayContract from "../contracts/W3npayContract.json";
import { store } from "../redux/store";
import { assetList } from "../data/AssetList";

class ContractMethods {
	static approve = async (setIsLoading, setIsApproved, amount) => {
		setIsLoading(true);
		const signer = store.getState().providerReducer.signer;
		const usdcContract = new ethers.Contract(
			assetList[0].address,
			UsdcContract.abi,
			signer
		);

		try {
			const txResponse = await usdcContract.approve(
				process.env.REACT_APP_W3NPAY_CONTRACT,
				parseInt(amount * 1e6)
			);
			const txReceipt = await txResponse.wait();
			if (txReceipt.status == 1) {
				console.log("Approval successful!");
				setIsApproved(true);
			} else {
			}
		} catch (error) {
			console.log("Something went wrong\n", error);
		}
		setIsLoading(false);
	};

	static pay = async (setIsLoading, amount, recipientAddress, messageId) => {
		setIsLoading(true);
		const signer = store.getState().providerReducer.signer;
		const w3npayContract = new ethers.Contract(
			process.env.REACT_APP_W3NPAY_CONTRACT,
			W3npayContract.abi,
			signer
		);

		try {
			const txResponse = await w3npayContract.transfer(
				assetList[0].address,
				parseInt(amount * 1e6),
				recipientAddress,
				messageId,
				0
			);
			const txReceipt = await txResponse.wait();
			if (txReceipt.status == 1) {
				console.log("Payment successful!");
			} else {
			}
		} catch (error) {
			console.log("Something went wrong\n", error);
		}
		setIsLoading(false);
	};

	static request = async (
		setIsLoading,
		amount,
		recipientAddress,
		senderAddress,
		messageId
	) => {
		setIsLoading(true);
		const signer = store.getState().providerReducer.signer;
		const w3npayContract = new ethers.Contract(
			process.env.REACT_APP_W3NPAY_CONTRACT,
			W3npayContract.abi,
			signer
		);

		try {
			const txResponse = await w3npayContract.addPayment(
				parseInt(amount * 1e6),
				recipientAddress,
				senderAddress,
				messageId,
				false
			);

			const txReceipt = await txResponse.wait();

			if (txReceipt.status == 1) {
				console.log("Request succesful!");
			} else {
				console.log("Something went wrong.");
			}
		} catch (error) {
			console.log("Something went wrong\n", error);
		}
		setIsLoading(false);
	};

	static payRequest = async (
		setIsLoading,
		amount,
		recipientAddress,
		messageId,
		transactionId
	) => {
		setIsLoading(true);
		const signer = store.getState().providerReducer.signer;
		const w3npayContract = new ethers.Contract(
			process.env.REACT_APP_W3NPAY_CONTRACT,
			W3npayContract.abi,
			signer
		);

		try {
			const txResponse = await w3npayContract.transfer(
				assetList[0].address,
				parseInt(amount * 1e6),
				recipientAddress,
				messageId,
				transactionId
			);
			const txReceipt = await txResponse.wait();

			if (txReceipt.status == 1) {
				console.log("Request payment succesful!");
			} else {
				console.log("Something went wrong.");
			}
		} catch (error) {
			console.log("Something went wrong\n", error);
		}
		setIsLoading(false);
	};

	static getTransactions = async () => {
		const signer = store.getState().providerReducer.signer;
		const w3npayContract = new ethers.Contract(
			process.env.REACT_APP_W3NPAY_CONTRACT,
			W3npayContract.abi,
			signer
		);
		return await w3npayContract.getTransactions();
	};
}

export default ContractMethods;
