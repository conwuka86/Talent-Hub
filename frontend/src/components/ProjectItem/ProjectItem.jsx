import { useState } from 'react';
import * as projectService from '../../services/projectService';

export default function ProjectItem({ project, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(project.content);

  async function handleUpdate() {
    try {
      const updatedProject = await projectService.updateProject(project._id, content);
      onUpdate(updatedProject); // Pass the updated project to parent
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <article>
      {editing ? (
        <>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{new Date(project.createdAt).toLocaleDateString()}</h4>
          <p>{project.content}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(project._id)}>Delete</button>
        </>
      )}
    </article>
  );
}
