import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App/App";
import Form from "./Form/Form";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Form />} />
				<Route path="rooms/:room" element={<App />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
