import "@unocss/reset/tailwind.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "virtual:uno.css";

// biome-ignore lint/style/noNonNullAssertion: This is a React app, so we can safely assume that the root element exists.
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
