import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as talentService from '../../services/talentService';
import './NewTalentPage.css';

export default function NewTalentPage() {
  const [skill, setSkill] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const talent = await talentService.create({ skill }); // Send skill as an object
      navigate('/talents'); // Navigate to the talents list after creation
    } catch (err) {
      console.error('Error:', err);
    }
  }

  return (
    <div className="new-talent-page">
      <h2 className="page-title">Add New Talent</h2>
      <form className="talent-form" autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="talent-skill" className="form-label">
          Name and Skill
        </label>
        <input
          id="talent-skill"
          type="text"
          className="form-input"
          value={skill}
          onChange={(evt) => setSkill(evt.target.value)}
          placeholder="Enter talent skill"
          required
        />
        <button type="submit" className="primary-btn">
          Add Talent
        </button>
      </form>
    </div>
  );
}
