import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as talentService from '../../services/talentService';

export default function NewTalentPage() {
  const [skill, setSkill] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const project = await talentService.create(skill);
      navigate('/talents'); // Navigate to the talents list after creation
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h2>New Talent</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Talent Content</label>
        <input
          type="text"
          value={skill}
          onChange={(evt) => setSkill(evt.target.value)}
          required
        />
        <button type="submit">ADD TALENT</button>
      </form>
    </>
  );
}