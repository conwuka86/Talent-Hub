import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as projectService from '../../services/projectService';
import * as talentService from '../../services/talentService';
import './ProjectDetailsPage.css';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [allTalents, setAllTalents] = useState([]);
  const [newTalentId, setNewTalentId] = useState('');

  useEffect(() => {
    async function fetchData() {
      const projectData = await projectService.getProjectById(id);
      const talentsData = await talentService.index();
      setProject(projectData);
      setAllTalents(talentsData);
    }
    fetchData();
  }, [id]);

  async function handleAssignTalent() {
    if (!newTalentId) return;

    // Find the selected talent from `allTalents`
    const selectedTalent = allTalents.find((t) => t._id === newTalentId);
    if (!selectedTalent) {
      console.error("Talent not found!");
      return;
    }

    // Create Talent Data (name & skill)
    const talentData = {
      name: selectedTalent.name,
      skill: selectedTalent.skill,
    };

    try {
      const updatedProject = await projectService.assignTalent(project._id, selectedTalent._id, talentData);
      setProject(updatedProject.project);
      setNewTalentId('');
    } catch (err) {
      console.error('Error assigning talent:', err);
    }
  }

  async function handleUnassignTalent(talentId) {
    try {
      const updatedProject = await projectService.unassignTalent(project._id, talentId);
      setProject(updatedProject.project);
    } catch (err) {
      console.error('Error unassigning talent:', err);
    }
  }

  if (!project) return <p>Loading project...</p>;

  return (
    <div className="project-details-page">
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <h2>Assigned Talents</h2>
      <ul>
        {project.skills?.length > 0 ? (
          project.skills.map((talent) => (
            <li key={talent._id} value={talent._id}>
              {talent.name} ({talent.skill}) 
              <button onClick={() => handleUnassignTalent(talent._id)}>Unassign</button>
            </li>
          ))
        ) : (
          <p>No talents assigned yet.</p>
        )}
      </ul>

      <h3>Assign New Talent</h3>
      <select value={newTalentId} onChange={(e) => setNewTalentId(e.target.value)}>
        <option value="">Select Talent</option>
        {allTalents
          .filter((t) => !project.skills?.some((pt) => pt._id === t._id))
          .map((talent) => (
            <option key={talent._id} value={talent._id}>
              {talent.name} ({talent.team})
              {talent.name} ({talent.skill})
            </option>
          ))}
      </select>
      <button onClick={handleAssignTalent}>Assign Talent</button>
    </div>
  );
}

