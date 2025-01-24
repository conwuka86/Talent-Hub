import { useState, useEffect } from 'react';
import * as projectService from '../../services/projectService';
import './ProjectListPage.css';
import ProjectItem from '../../components/ProjectItem/PostItem';

export default function ProjecttListPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await projectService.index();
      setPosts(projects);
    }
    fetchPosts();
  }, []);

  const projectItems = posts.map((p) => <ProjectItem key={p._id} post={p} />);

  return (
    <>
      <h1>Project List</h1>
      <section className="project-item-container">{projectItems}</section>
    </>
  );
}