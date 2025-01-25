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
  

    async function handleUpdate(updatedProject) {
      setProjects((prevProjects) =>
        prevProjects.map((p) => (p._id === updatedProject._id ? updatedProject : p))
      );
    }
    
    async function handleDelete(projectId) {
      try {
        await projectService.deleteProject(projectId);
        setProjects(projects.filter((project) => project._id !== projectId));
      } catch (err) {
        console.error(err);
      }
    }

    
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
