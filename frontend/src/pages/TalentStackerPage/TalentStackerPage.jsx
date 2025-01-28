import { useState, useEffect } from 'react';
import * as talentService from '../../services/talentService';
import * as projectService from '../../services/projectService';
import './TalentStackerPage.css';

export default function TalentStackerPage() {
  const [talents, setTalents] = useState([]);
  const [stack, setStack] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedTalents = await talentService.index();
      const fetchedProjects = await projectService.index();
      setTalents(fetchedTalents);
      setProjects(fetchedProjects);
    }
    fetchData();
  }, []);

  const handleAddToStack = async (talent) => {
    if (selectedProject) {
      try {
        const updatedProject = await projectService.assignTalent(
          selectedProject._id,
          talent._id
        );
        setStack(updatedProject.talents);
      } catch (err) {
        console.error('Error assigning talent:', err);
      }
    }
  };

  const handleRemoveFromStack = async (talent) => {
    if (selectedProject) {
      try {
        const updatedProject = await projectService.unassignTalent(
          selectedProject._id,
          talent._id
        );
        setStack(updatedProject.talents);
      } catch (err) {
        console.error('Error unassigning talent:', err);
      }
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setStack(project.talents);
  };

  return (
    <div className="talent-stacker-page">
      <div className="talent-list">
        <h2>Available Talents</h2>
        <ul>
          {talents.map((talent) => (
            <li key={talent._id}>
              {talent.name} ({talent.skill})
              <button onClick={() => handleAddToStack(talent)}>+</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="project-selection">
        <h2>Select a Project</h2>
        <ul>
          {projects.map((project) => (
            <li
              key={project._id}
              className={selectedProject?._id === project._id ? 'selected' : ''}
              onClick={() => handleProjectSelect(project)}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="talent-stack">
        <h2>Project Stack</h2>
        {selectedProject ? (
          <ul>
            {stack.map((talent) => (
              <li key={talent._id}>
                {talent.name} ({talent.skill})
                <button onClick={() => handleRemoveFromStack(talent)}>X</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Select a project to start stacking talents.</p>
        )}
      </div>
    </div>
  );
}
