import { useState } from 'react';
import './ProjectItem.css';
import { NavLink } from 'react-router';

export default function ProjectItem({ project, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  function handleSave() {
    onUpdate(project._id, { name, description });
    setEditing(false);
  }

  return (
    <div className="project-card">
      {editing ? (
        <>
          <input
            className="project-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project Name"
          />
          <textarea
            className="project-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
          />
          <div className="project-actions">
            <button className="primary-btn" onClick={handleSave}>
              Save
            </button>
            <button className="danger-btn" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <NavLink to={`/projects/${project._id}`} end>
          <h2 className="project-title">{project.name}</h2>
          <p className="project-description">{project.description}</p>
          <p className="project-date">
            <strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}
          </p>
          </NavLink>
          <div className="project-actions">
            <button className="primary-btn" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button className="danger-btn" onClick={() => onDelete(project._id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
