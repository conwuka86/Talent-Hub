import { useState, useEffect } from 'react';
import * as projectService from '../../services/projectService';
import './ProjectListPage.css';
import ProjectItem from '../../components/ProjectItem/ProjectItem';

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await projectService.index();
      setProjects(projects);
    }
    fetchProjects();
  }, []);

  async function handleUpdate(id, projectData) {
    const updatedProject = await projectService.updateProject(id, projectData);
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p._id === id ? updatedProject : p))
    );
  }

  async function handleDelete(id) {
    await projectService.deleteProject(id);
    setProjects((prevProjects) => prevProjects.filter((p) => p._id !== id));
  }

  return (
    <div className="project-page">
      <div className="header">
        <h1>Projects</h1>
        <button
          className="primary-btn"
          onClick={() => window.location.assign('/projects/new')}
        >
          Create New Project
        </button>
      </div>
      <section className="project-list-container">
        {projects.map((project) => (
          <ProjectItem
            key={project._id}
            project={project}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </section>
    </div>
  );
}

