export const toHex = (num) => {
	const val = Number(num);
	return "0x" + val.toString(16);
};

export const copyToClipboard = (text, setCopied) => {
	navigator.clipboard.writeText(text).then(
		() => {
			setCopied(true);
			// Change back to default state after 2 seconds.
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		},
		(err) => {
			console.log("Failed to Copy", err.mesage);
		}
	);
};

export const truncateAddress = (address) => {
	if (!address) return "No Account";
	const match = address.match(
		/^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{5})$/
	);
	if (!match) return address;
	return `${match[1]}…${match[2]}`;
};
