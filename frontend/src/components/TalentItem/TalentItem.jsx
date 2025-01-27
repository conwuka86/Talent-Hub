import { useState } from 'react';
import './TalentItem.css';

export default function TalentItem({ talent, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [skill, setSkill] = useState(talent.skill);

  async function handleSave() {
    try {
      await onUpdate(talent._id, { skill });
      setEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  }

  return (
    <div className="talent-card">
      {editing ? (
        <>
          <textarea
            className="talent-textarea"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="Edit Skill"
          />
          <div className="talent-actions">
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
          <h2 className="talent-name">{talent.name}</h2>
          <p className="talent-skill">{talent.skill}</p>
          <p className="talent-date">
            <strong>Joined:</strong> {new Date(talent.createdAt).toLocaleDateString()}
          </p>
          <div className="talent-actions">
            <button className="primary-btn" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button className="danger-btn" onClick={() => onDelete(talent._id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
