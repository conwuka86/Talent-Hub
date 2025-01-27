import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as projectService from '../../services/projectService';
import './NewProjectPage.css';

export default function NewProjectPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();

    const projectData = { name, description };
    console.log('Payload Sent to Backend:', projectData); // Debugging the payload

    try {
      await projectService.create(projectData);
      navigate('/projects');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="new-project-page">
      <h2 className="page-title">Create New Project</h2>
      <form className="project-form" autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="project-name" className="form-label">
          Project Name
        </label>
        <input
          id="project-name"
          type="text"
          className="form-input"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
          placeholder="Enter project name"
          required
        />
        <label htmlFor="project-description" className="form-label">
          Project Description
        </label>
        <textarea
          id="project-description"
          className="form-textarea"
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
          placeholder="Enter project description"
          required
        />
        <button type="submit" className="primary-btn">
          Create Project
        </button>
      </form>
    </div>
  );
}
