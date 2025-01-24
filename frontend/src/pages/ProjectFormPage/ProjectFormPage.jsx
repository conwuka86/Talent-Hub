import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as projectService from '../../services/projectService';

export default function ProjectForm() {
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

  // Handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await projectService.create(formData); // Send data to create a project
      navigate('/projects'); // Redirect to the projects page
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Create New Project</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Project Name"
        required
        style={styles.input}
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Project Description"
        required
        style={styles.textarea}
      ></textarea>
      <button type="submit" style={styles.button}>
        Create Project
      </button>
    </form>
  );
}