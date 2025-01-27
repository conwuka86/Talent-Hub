import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as talentService from '../../services/talentService';
import './NewTalentPage.css';

export default function NewTalentPage() {
  const [team, setTeam] = useState('');
  const [skill, setSkill] = useState('');
  const navigate = useNavigate();

   async function handleSubmit(evt) {
     evt.preventDefault();
 
     const talentData = { team, skill };
     console.log('Payload Sent to Backend:', talentData);
 
     try {
       await talentService.create(talentData);
       navigate('/talents');
     } catch (err) {
       console.error(err);
     }
   }

  return (
    <div className="new-talent-page">
      <h2 className="page-title">Add New Talent</h2>
      <form className="talent-form" autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="talent-team" className="form-label">
          Team Member
        </label>
        <input
          id="talent-team"
          type="text"
          className="form-input"
          value={team}
          onChange={(evt) => setTeam(evt.target.value)}
          placeholder="Enter team member"
          required
        />
        <label htmlFor="talent-skill" className="form-label">
          Talent/Skill
        </label>
        <textarea
          id="talent-skill"
          className="form-textarea"
          value={skill}
          onChange={(evt) => setSkill(evt.target.value)}
          placeholder="Enter talent/skill"
          required
        />
        <button type="submit" className="primary-btn">
          Add Talent
        </button>
      </form>
    </div>
  );
}
