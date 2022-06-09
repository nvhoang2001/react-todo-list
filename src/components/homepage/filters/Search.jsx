import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

import styles from "./Search.module.scss";

function NameSearch({ className = "" }) {
	const [queries, setQueries] = useSearchParams();

	function onSearchHandler(searchWord) {
		queries.set("search", searchWord);
		setQueries(queries);
	}

	return (
		<div className={className}>
			<input
				type="text"
				className={styles.search}
				onChange={(e) => onSearchHandler(e.target.value)}
				placeholder="Seach..."
			/>
		</div>
	);
}

NameSearch.propTypes = {
	className: PropTypes.string,
};

export default NameSearch;
