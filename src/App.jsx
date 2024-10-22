import { useState } from "react";
import ProjectsSitebar from "./components/ProjectsSitebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
	const [projectsState, setProjectState] = useState({
		selectedProjectID: undefined,
		projects: [],
		tasks: [],
	});

	function handleAddTask(text) {
		setProjectState((prevState) => {
			const taskID = Math.floor(Math.random() * 100);
			const newTask = {
				text: text,
				projectID: prevState.selectedProjectID,
				id: taskID,
			};
			return {
				...prevState,
				// selectedProjectID: undefined,
				tasks: [newTask, ...prevState.tasks],
			};
		});
	}

	function handleDeleteTask(id) {
		setProjectState((prevState) => {
			return {
				...prevState,
				tasks: prevState.tasks.filter((task) => task.id != id),
			};
		});
	}

	function handleSelectProject(id) {
		setProjectState((prevState) => {
			return {
				...prevState,
				selectedProjectID: id,
			};
		});
	}

	function handleStartAddProject() {
		setProjectState((prevState) => {
			return {
				...prevState,
				selectedProjectID: null, //sygnal ze dodajemy teraz nowy projekt
			};
		});
	}

	function handleCancelAddProject() {
		setProjectState((prevState) => {
			return {
				...prevState,
				selectedProjectID: undefined,
			};
		});
	}

	function handleAddProject(projectData) {
		setProjectState((prevState) => {
			const projectID = Math.floor(Math.random() * 100);
			const newProject = {
				...projectData,
				id: projectID,
			};
			return {
				...prevState,
				selectedProjectID: undefined,
				projects: [...prevState.projects, newProject],
			};
		});
	}

	function handleDeleteProject() {
		setProjectState((prevState) => {
			return {
				...prevState,
				selectedProjectID: undefined,
				projects: prevState.projects.filter(
					(project) => project.id !== prevState.selectedProjectID
				),
			};
		});
	}

	const selectedProject = projectsState.projects.find(
		(project) => project.id === projectsState.selectedProjectID
	);

	let content = (
		<SelectedProject
			project={selectedProject}
			onDelete={handleDeleteProject}
			onAddTask={handleAddTask}
			onDeleteTask={handleDeleteTask}
			tasks={projectsState.tasks}
		/>
	);

	if (projectsState.selectedProjectID === null) {
		content = (
			<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
		);
	} else if (projectsState.selectedProjectID === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
	}

	return (
		<main className="h-screen my-8 flex gap-8">
			<ProjectsSitebar
				onStartAddProject={handleStartAddProject}
				projects={projectsState.projects}
				onSelectProject={handleSelectProject}
				selectedProjectID={projectsState.selectedProjectID}
			/>
			{content}
		</main>
	);
}

export default App;
