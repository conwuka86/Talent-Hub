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
    console.log(newTalentId);
    console.log(project);
    try {
      const updatedProject = await projectService.assignTalent(project._id, newTalentId);
      setProject(updatedProject.project);
      console.log(updatedProject);
      setNewTalentId('');
    } catch (err) {
      console.error('Error assigning talent:', err);
    }
  }

  async function handleUnassignTalent(talentId) {
    try {
      const updatedProject = await projectService.unassignTalent(project._id, talentId);
      setProject(updatedProject.projects);
    } catch (err) {
      console.error('Error unassigning talent:', err);
    }
  }

  if (!project) return <p>You have successfully unassigned a talent. Please return to Project List!</p>;

  return (
    <div className="project-details-page">
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <h2>Assigned Talents</h2>
      <ul>
        {project.skills.length && project.skills?.map((talent) => (
          <li key={talent._id}>
            {talent.name} ({talent.skill})
            <button onClick={() => handleUnassignTalent(talent._id)}>Unassign</button>
          </li>
        ))}
      </ul>

      <h3>Assign New Talent</h3>
      <select
        value={newTalentId}
        onChange={(e) => setNewTalentId(e.target.value)}
      >
        <option value="">Select Talent</option>
        {allTalents
          .filter((t) => !project.skills?.some((pt) => pt._id === t._id))
          .map((talent) => (
            <option key={talent._id} value={talent._id}>
              {talent.name} ({talent.skill})
            </option>
          ))}
      </select>
      <button onClick={handleAssignTalent}>Assign Talent</button>
    </div>
  );
}
