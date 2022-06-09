import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useRef, useState } from "react";

import styles from "./DatePicker.module.scss";

function DatePicker({ className = "", value = "", onChange, placeholder = "Choose a day" }) {
	const currentDate = new Date().toISOString().slice(0, 10);
	const dateInputRef = useRef();

	const [date, setDate] = useState("");

	function showDatePicker() {
		dateInputRef.current.showPicker();
	}

	function pickDateHandler(e) {
		setDate(e.target.value);
		onChange(e.target.value);
	}

	return (
		<div className={styles.container}>
			<input
				type="text"
				value={value}
				className={`${className}`}
				onFocus={showDatePicker}
				onClick={showDatePicker}
				placeholder={placeholder}
				readOnly
			/>
			<input
				type="date"
				className={styles.input__date}
				ref={dateInputRef}
				value={date}
				onChange={pickDateHandler}
				min={currentDate}
			/>
			<FontAwesomeIcon icon="fa-regular fa-calendar" className={styles.input__icon} />
		</div>
	);
}

DatePicker.propTypes = {
	onChange: PropTypes.func,
	className: PropTypes.string,
	value: PropTypes.string,
};

export default DatePicker;
