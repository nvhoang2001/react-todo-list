import React, { useEffect, useState } from "react";
import randomGenerateString from "../utils/randomGenerateString";

const storageKey = "tasks";

function saveTaskList(tasks) {
	localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function getTaskList() {
	const tasks = JSON.parse(localStorage.getItem(storageKey));
	return tasks;
}

const context = React.createContext({
	tasks: [],

	addTask(task) {},

	getTask(id) {},

	getTasks() {},

	updateTask(task) {},

	removeTask(id) {},

	removeTasks(tasks) {},
});

export function TaskContextProvider({ children }) {
	const [taskList, setTaskList] = useState(getTaskList() || []);

	function addTask(task) {
		task.id = randomGenerateString(30);
		setTaskList([...taskList, task]);
	}

	function getTask(id) {
		return taskList.find((task) => task.id === id);
	}

	function getTasks() {
		return taskList;
	}

	function updateTask(task) {
		const taskIndex = taskList.findIndex((taskItem) => taskItem.id === task.id);
		const newTaskList = [...taskList];
		newTaskList[taskIndex] = task;
		setTaskList(newTaskList);
	}

	function removeTask(id) {
		console.log(id);
		setTaskList(taskList.filter((task) => task.id !== id));
	}

	function removeTasks(tasks) {
		console.log(tasks);
		const removeTaskIds = {};
		tasks.forEach((task) => {
			removeTaskIds[task.id] = true;
		});

		setTaskList(taskList.filter((task) => !(task.id in removeTaskIds)));
	}

	const providerValue = {
		tasks: taskList,
		addTask,
		getTask,
		getTasks,
		removeTask,
		removeTasks,
		updateTask,
	};

	useEffect(() => {
		saveTaskList(taskList);
	}, [taskList]);

	return <context.Provider value={providerValue}>{children}</context.Provider>;
}

export default context;
