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

   async function handleUpdate(id, talentData) {
      const updatedTalent = await talentService.updateTalent(id, talentData);
      setTalents((prevTalents) =>
        prevTalents.map((p) => (p._id === id ? updatedTalent : p))
      );
    }
  
    async function handleDelete(id) {
      await talentService.deleteTalent(id);
      setTalents((prevTalents) => prevTalents.filter((p) => p._id !== id));
    }
  return (
   <div className="talent-page">
         <div className="header">
           <h1>Talents</h1>
           <button
             className="primary-btn"
             onClick={() => window.location.assign('/talents/new')}
           >
             Add Talent
           </button>
         </div>
         <section className="talent-list-container">
           {talents.map((talent) => (
             <TalentItem
               key={talent._id}
               talent={talent}
               onUpdate={handleUpdate}
               onDelete={handleDelete}
             />
           ))}
         </section>
       </div>
     );
   }
