import DefaultLayout from "../layouts/default";
import Homepage from "../pages/index.jsx";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
	{
		element: <DefaultLayout />,
		path: "/",
		children: [
			{
				name: "Homepage",
				element: <Homepage />,
				index: true,
			},
		],
	},
];
