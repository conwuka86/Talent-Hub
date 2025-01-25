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
  
    const projectItems = projects.map((p) => <ProjectItem key={p._id} project={p} />);

  // Handle delete action
  async function handleDelete(projectId) {
    try {
      await projectService.deleteProject(projectId);
      // Remove the deleted project from the local state
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  }
  return (
    <>
      <h1>Project List</h1>
      <section className="project-item-container">{projectItems}</section>
    </>
  );
}
