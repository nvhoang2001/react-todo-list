import { Outlet } from "react-router-dom";
import styles from "./default.module.scss";
import NewTask from "../components/homepage/new-task/NewTask";

function DefaultLayout() {
	return (
		<div className={styles["layout-default"]}>
			<div
				className={`${styles["layout-default__container"]} ${styles["layout-default__container--left"]}`}>
				<div className={styles["layout-default__side-bar"]}>
					<NewTask />
				</div>
			</div>

			<div
				className={`${styles["layout-default__container"]} ${styles["layout-default__container--right"]}`}>
				<div className={styles["layout-default__content"]}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default DefaultLayout;
