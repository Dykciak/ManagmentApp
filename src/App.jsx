import { useState } from "react";
import ProjectsSitebar from "./components/ProjectsSitebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";

function App() {
	const [projectsState, setProjectState] = useState({
		selectedProjectID: undefined,
		projects: [],
	});

	function handleStartAddProject() {
		setProjectState((prevState) => {
			return {
				...prevState,
				selectedProjectID: null, //sygnal ze dodajemy teraz nowy projekt
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
	let content;

	if (projectsState.selectedProjectID === null) {
		content = <NewProject onAdd={handleAddProject} />;
	} else if (projectsState.selectedProjectID === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
	}

	return (
		<main className="h-screen my-8 flex gap-8">
			<ProjectsSitebar
				onStartAddProject={handleStartAddProject}
				projects={projectsState.projects}
			/>
			{content}
		</main>
	);
}

export default App;
