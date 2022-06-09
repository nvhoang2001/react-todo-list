import PropTypes from "prop-types";
import { useState } from "react";

import DatePicker from "./DatePicker.jsx";

import priority from "../../constants/task-priority.js";
import dateFormatter from "../../utils/dateFormatter.js";

import styles from "./FormTask.module.scss";

const [, NORMAL_PRIOR] = Object.keys(priority);
const today = new Date().toISOString().slice(0, 10);
const defaultForm = {
	title: "",
	description: "",
	dueDate: today,
	priority: NORMAL_PRIOR,
};

function FormTask({ onSubmit, task, className = "" }) {
	const [form, setForm] = useState(task ? { ...task } : { ...defaultForm });
	const [errorMgs, setErrorMgs] = useState(null);

	function titleChangeHandler(e) {
		setForm({ ...form, title: e.target.value });
	}

	function descriptionChangeHandler(e) {
		setForm({ ...form, description: e.target.value });
	}

	function dueDateChangeHandler(date) {
		setForm({ ...form, dueDate: date });
	}

	function priorityChangeHandler(e) {
		setForm({ ...form, priority: e.target.value });
	}

	function submitForm(e) {
		e.preventDefault();
		let errors = [];
		if (!form.title.trim()) {
			errors.push("Please enter title");
		}

		if (errors.length) {
			setErrorMgs(errors);
			return;
		}
		setErrorMgs(null);
		onSubmit(form);

		// If add new task, clear the form after submit
		if (!task) {
			setForm({ ...defaultForm });
		}
	}

	return (
		<form className={className} onSubmit={submitForm}>
			<div className={styles.title}>
				<input
					type="text"
					className={styles.title__input}
					placeholder={task ? "Update task..." : "Add new task..."}
					value={form.title}
					onChange={titleChangeHandler}
				/>
			</div>

			<div className={styles.container}>
				<p className={styles.container__title}>Description</p>
				<textarea
					className={`${styles.container__input} ${styles.textarea}`}
					value={form.description}
					onChange={descriptionChangeHandler}></textarea>
			</div>

			<div className={`flex justify-between items-start ${styles["container--sm"]}`}>
				<div className={`${styles.container} ${styles.half}`}>
					<p className={styles.container__title}>Due date</p>
					<DatePicker
						className={styles.container__input}
						value={dateFormatter(form.dueDate)}
						onChange={dueDateChangeHandler}
						minDate={today}
					/>
				</div>

				<div className={`${styles.container} ${styles.half}`}>
					<p className={styles.container__title}>Priority</p>
					<select
						value={form.priority}
						onChange={priorityChangeHandler}
						className={`${styles.container__input} capitalize`}>
						{Object.entries(priority).map((prior) => {
							return (
								<option value={prior[0]} key={prior[0]} className="capitalize">
									{prior[1]}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			{errorMgs && (
				<ul className="error-list">
					{errorMgs.map((message, i) => (
						<li key={i}>{message}</li>
					))}
				</ul>
			)}
			<button className={styles["form__btn--submit"]}>{task ? "Update" : "Add"}</button>
		</form>
	);
}

FormTask.propTypes = {
	onSubmit: PropTypes.func,
	task: PropTypes.oneOf([PropTypes.object, undefined]),
	className: PropTypes.string,
};

export default FormTask;
