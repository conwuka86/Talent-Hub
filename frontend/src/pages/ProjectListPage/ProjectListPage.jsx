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

  async function handleUpdate(id, content) {
    try {
      const updatedProject = await projectService.updateProject(id, content);
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? updatedProject : p))
      );
    } catch (err) {
      console.error('Error updating project:', err);
    }
  }

  async function handleDelete(id) {
    try {
      await projectService.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  }

  return (
    <section>
      <h1>Project List</h1>
      {projects.map((project) => (
        <ProjectItem
          key={project._id}
          project={project}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
}
