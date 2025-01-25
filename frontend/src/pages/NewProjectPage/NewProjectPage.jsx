import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as projectService from '../../services/projectService';

export default function NewProjectPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const navigate = useNavigate();

  // Handle input changes
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const post = await projectService.create(formData);
      navigate('/projects');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h2>New Project</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Create New Project</label>
        <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Project Name"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Project Description"
        required
      ></textarea>
        <button type="submit">CREATE PROJECT</button>
      </form>
    </>
  );
}