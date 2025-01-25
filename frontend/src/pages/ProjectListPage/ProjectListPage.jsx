import { useState, useEffect } from 'react';
import * as projectService from '../../services/projectService';
import './ProjectListPage.css';
import ProjectItem from '../../components/ProjectItem/ProjectItem';

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await projectService.index();
      setPosts(projects);
    }
    fetchProjects();
  }, []);

  // Handle delete action
  async function handleDelete(projectId) {
    try {
      await projectService.deleteProject(projectId);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  }

  const projectItems = projects.map((p) => <ProjectItem key={p._id} project={p} />);

  return (
    <div style={styles.container}>
    <h2>Project List</h2>
    <button onClick={() => navigate('/projects/new')} style={styles.button}>
      Create New Project
    </button>
    <div style={styles.projectList}>
      {projects.map((project) => (
        <div key={project._id} style={styles.projectCard}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <button onClick={() => handleDelete(project._id)} style={{ ...styles.button, backgroundColor: 'red' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
  );
}
