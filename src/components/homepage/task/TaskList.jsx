import PropTypes from "prop-types";
import TaskItem from "./TaskItem";

function TaskList({ taskList, onToggleCheckTask }) {
	return (
		<ul>
			{taskList.map((task) => (
				<TaskItem taskItem={task} key={task.id} onToggleCheckTask={onToggleCheckTask} />
			))}
		</ul>
	);
}

TaskList.propTypes = {
	taskList: PropTypes.array,
	onToggleCheckTask: PropTypes.func,
};

export default TaskList;
