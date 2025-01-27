import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as projectService from '../../services/projectService';

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
    <>
      <h2>Create New Project</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Project Name</label>
        <input
          type="text"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
          required
        />
        <label>Project Description</label>
        <textarea
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
          required
        />
        <button type="submit">Create Project</button>
      </form>
    </>
  );
}
