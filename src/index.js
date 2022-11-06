// Library Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// Local Imports
import App from "./App";
import "./index.css";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);
