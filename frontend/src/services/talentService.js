import sendRequest from './sendRequest';

const BASE_URL = '/api/talents';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(skill) {
  return sendRequest(BASE_URL, 'POST',  skill );
}

export async function updateTalent(id, skill) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT',  skill );
}

export async function deleteTalent(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

