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

  const projectItems = projects.map((p) => <ProjectItem key={p._id} project={p} />);

  return (
    <>
      <h1>Project List</h1>
      <section className="post-item-container">{projectItems}</section>
    </>
  );
}
