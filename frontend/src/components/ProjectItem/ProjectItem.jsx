import { useState } from 'react';
import * as projectService from '../../services/projectService';

export default function ProjectItem({ project, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  function handleSave() {
    onUpdate(project._id, { name, description });
    setEditing(false);
  }

  return (
    <article>
      {editing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(project._id)}>Delete</button>
        </>
      )}
    </article>
  );
}