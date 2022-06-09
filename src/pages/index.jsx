import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import NameFilter from "../components/homepage/filters/Search";
import TaskList from "../components/homepage/task/TaskList";
import taskContext from "../store/tasks";

import styles from "./index.module.scss";

function Homepage() {
	const taskCtx = useContext(taskContext);
	const tasks = taskCtx.getTasks();
	const [taskList, setTaskList] = useState([]);
	const [queries] = useSearchParams();

	const searchTask = queries.get("search");

	let hasCheckedTask = false;
	for (const task of taskList) {
		if (task.isChecked) {
			hasCheckedTask = true;
			break;
		}
	}

	function toggleCheckTask(task) {
		const taskIndex = taskList.findIndex((taskItem) => taskItem.id === task.id);
		const newTaskList = [...taskList];
		newTaskList[taskIndex].isChecked = !newTaskList[taskIndex].isChecked;
		setTaskList(newTaskList);
	}

	function removeTasks() {
		const checkedTasks = [];
		taskList.forEach((task) => {
			if (task.isChecked) {
				checkedTasks.push(task);
			}
		});

		taskCtx.removeTasks(checkedTasks);
	}

	useEffect(() => {
		const taskList = tasks
			.map((task) => ({ ...task, isChecked: false }))
			.filter((task) => (searchTask ? task.title.includes(searchTask) : true));

		// Sort task by due date (ASC order)
		taskList.sort((prevTask, nextTask) => {
			const prevTaskDueDate = new Date(prevTask.dueDate).getTime();
			const nextTaskDueDate = new Date(nextTask.dueDate).getTime();
			return prevTaskDueDate - nextTaskDueDate;
		});

		setTaskList(taskList);
	}, [tasks, searchTask]);

	return (
		<div className={styles.homepage}>
			<header className={styles.homepage__header}>
				<h1>To Do List</h1>
			</header>
			<main>
				<NameFilter className="mb-4" />
				<TaskList taskList={taskList} onToggleCheckTask={toggleCheckTask} />
			</main>
			{hasCheckedTask && (
				<footer className={styles.footer}>
					<p>Bulk Action:</p>
					<div>
						<button className={styles["footer__btn--done"]}>Done</button>
						<button className={styles["footer__btn--remove"]} onClick={removeTasks}>
							Remove
						</button>
					</div>
				</footer>
			)}
		</div>
	);
}

export default Homepage;
