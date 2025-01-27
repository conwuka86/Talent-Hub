import { useState } from 'react';
import * as talentService from '../../services/talentService';

export default function TalentItem({ talent, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [skill, setSkill] = useState(talent.skill);

  async function handleUpdate() {
    try {
      await onUpdate(talent._id, skill);
      setEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  }

  return (
    <article>
      {editing ? (
        <>
          <textarea value={skill} onChange={(e) => setSkill(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{new Date(talent.createdAt).toLocaleDateString()}</h4>
          <p>{talent.skill}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(talent._id)}>Delete</button>
        </>
      )}
    </article>
  );
}