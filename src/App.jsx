import { useRoutes } from "react-router-dom";

import router from "./routes/router.jsx";

import "./fontawesome.js";
import "./App.css";

function App() {
	const routes = useRoutes(router);

	return <div className="App">{routes}</div>;
}

export default App;
