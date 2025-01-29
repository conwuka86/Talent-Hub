import sendRequest from './sendRequest';

const BASE_URL = '/api/projects';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(projectData) {
  console.log('Service Layer - Payload:', projectData);
  return sendRequest(BASE_URL, 'POST', projectData);
}


export async function updateProject(id, projectData) {
  console.log('Service Layer - Payload:', projectData);
  return sendRequest(`${BASE_URL}/${id}`, 'PUT',  projectData );
}

export async function deleteProject(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export function assignTalent(projectId, talentId, talentData) {
  return sendRequest(`${BASE_URL}/${projectId}/talents/${talentId}`, 'PUT', talentData);
}

export function unassignTalent(projectId, talentId) {
  return sendRequest(`${BASE_URL}/${projectId}/talents/${talentId}`, 'DELETE');
}

export function getProjectById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}