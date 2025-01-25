import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as projectService from '../../services/projectService';

export default function NewProjectPage() {
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const project = await projectService.create(content);
      navigate('/projects'); // Navigate to the projects list after creation
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h2>New Project</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Project Content</label>
        <input
          type="text"
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          required
        />
        <button type="submit">CREATE PROJECT</button>
      </form>
    </>
  );
}