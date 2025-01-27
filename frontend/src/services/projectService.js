import sendRequest from './sendRequest';

const BASE_URL = '/api/projects';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(projectData) {
  console.log('Service Layer - Payload:', projectData); // Log payload
  return sendRequest(BASE_URL, 'POST', projectData);
}


export async function updateProject(id, projectData) {
  console.log('Service Layer - Payload:', projectData); // Log payload
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', { projectData });
}

export async function deleteProject(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

