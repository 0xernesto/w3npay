import { FaGithub } from "react-icons/fa";

const Footer = () => {
	return (
		<div className="flex flex-col items-center justify-center p-1 mt-5">
			<div className="flex items-center justify-center p-1 mt-2 mb-4 text-black hover:text-gray-700 font-bold">
				<a
					className="flex items-center justify-center px-5 py-3"
					href="https://github.com/RamirezErnesto/w3npay"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGithub className="mr-2" size="25px" />
					Github
				</a>
			</div>
		</div>
	);
};

export default Footer;
