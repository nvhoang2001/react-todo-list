import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";

import FormTask from "../../shared/FormTask";

import taskContext from "../../../store/tasks";

import styles from "./TaskItem.module.scss";

function TaskItem({ taskItem, onToggleCheckTask }) {
	const [showDetail, setShowDetail] = useState(false);
	const taskCtx = useContext(taskContext);
	function toggleShowDetail() {
		setShowDetail((isShowed) => !isShowed);
	}

	function updateTaskHandler(task) {
		delete task.isChecked;
		taskCtx.updateTask(task);
		setShowDetail(false);
	}

	function removeTask() {
		taskCtx.removeTask(taskItem.id);
	}

	return (
		<li className={styles["task-item"]}>
			<div
				className={styles["task-item__top"]}
				style={{
					borderBottom: showDetail ? "1px solid black" : "",
				}}>
				<div className={styles["task-item__name-container"]}>
					<div
						className={styles["task-item__checkbox"]}
						onClick={() => onToggleCheckTask(taskItem)}>
						<FontAwesomeIcon
							icon="fa-solid fa-check"
							className={styles["tick"]}
							style={{
								display: taskItem.isChecked ? "" : "none",
							}}
						/>
					</div>
					<p className={styles["task-item__name"]}>{taskItem.title}</p>
				</div>
				<div>
					<button className={styles["task-item__btn--detail"]} onClick={toggleShowDetail}>
						Detail
					</button>
					<button className={styles["task-item__btn--remove"]} onClick={removeTask}>
						Remove
					</button>
				</div>
			</div>
			{showDetail && (
				<FormTask
					className={styles["task-item__bottom"]}
					task={taskItem}
					onSubmit={updateTaskHandler}
				/>
			)}
		</li>
	);
}

TaskItem.propTypes = {
	taskItem: PropTypes.object,
	onToggleCheckTask: PropTypes.func,
};

export default TaskItem;
