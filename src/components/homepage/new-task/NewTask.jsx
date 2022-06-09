import { useContext } from "react";

import FormTask from "../../shared/FormTask";

import taskContext from "../../../store/tasks";

import styles from "./NewTask.module.scss";

function NewTaskPage() {
	const taskCtx = useContext(taskContext);
	function addNewTaskHandler(task) {
		taskCtx.addTask(task);
	}

	return (
		<div className={styles.page}>
			<header className={styles.page__header}>
				<h1>New Task</h1>
			</header>
			<main>
				<FormTask onSubmit={addNewTaskHandler} />
			</main>
		</div>
	);
}

export default NewTaskPage;
