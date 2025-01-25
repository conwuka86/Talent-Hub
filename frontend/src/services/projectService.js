import sendRequest from "./sendRequest";

const BASE_URL = '/api/projects';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(content) {
  return sendRequest(BASE_URL, 'POST', { content });
}

export async function updateProject(id, content) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', { content });
}

export async function deleteProject(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}
