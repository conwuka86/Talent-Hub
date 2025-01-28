import sendRequest from './sendRequest';

const BASE_URL = '/api/talents';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(talentData) {
  return sendRequest(BASE_URL, 'POST',  talentData );
}

export async function updateTalent(id, talentData) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', talentData );
}

export async function deleteTalent(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

