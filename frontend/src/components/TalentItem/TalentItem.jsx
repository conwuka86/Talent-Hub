import { useState } from 'react';
import './TalentItem.css';

export default function TalentItem({ talent, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [team, setTeam] = useState(talent.team);
  const [skill, setSkill] = useState(talent.skill);
  
  async function handleSave() {
    try {
      await onUpdate(talent._id, { team, skill });
      setEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  }

  return (
    <div className="talent-card">
      {editing ? (
        <>
          <input
            className="talent-input"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            placeholder="Team Member"
          />
          <textarea
            className="project-textarea"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="Talent/Skill"
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
          <h2 className="talent-team">{talent.team}</h2>
          <p className="talent-skill">{talent.skill}</p>
          <p className="talent-date">
            <strong>Created:</strong> {new Date(talent.createdAt).toLocaleDateString()}
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
