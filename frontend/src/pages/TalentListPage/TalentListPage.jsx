import { useState, useEffect } from 'react';
import * as talentService from '../../services/talentService';
import './TalentListPage.css';
import TalentItem from '../../components/TalentItem/TalentItem';

export default function TalentListPage() {
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    async function fetchTalents() {
      const talents = await talentService.index();
      setTalents(talents);
    }
    fetchTalents();
  }, []);

  async function handleUpdate(id, skill) {
    try {
      console.log('Updating talent with ID:', id, 'Skill:', skill); // Log the payload
      const updatedTalent = await talentService.updateTalent(id, skill);
      setTalents((prev) =>
        prev.map((p) => (p._id === id ? updatedTalent : p))
      );
    } catch (err) {
      console.error('Error updating talent:', err);
    }
  }

  async function handleDelete(id) {
    try {
      await talentService.deleteTalent(id);
      setTalents((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting talent:', err);
    }
  }

  return (
    <section>
      <h1>Talent List</h1>
      {talents.map((talent) => (
        <TalentItem
          key={talent._id}
          talent={talent}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
}
