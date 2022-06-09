import { useRoutes } from "react-router-dom";

import router from "./routes/router";
import { TaskContextProvider } from "./store/tasks";

import "./fontawesome.js";
import "./App.css";

function App() {
	const routes = useRoutes(router);

	return (
		<div className="App">
			<TaskContextProvider>{routes}</TaskContextProvider>
		</div>
	);
}

export default App;
