import { BASE_URL } from '../config';
/* eslint-disable no-undef */
// eslint-disable-next-line camelcase
const getAllDG = (sp_ma) =>
  //eslint-disable-next-line no-undef
  // eslint-disable-next-line camelcase
  fetch(`${BASE_URL}/api/getAllDG?sp_ma=${sp_ma}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sp_ma,
    }),
  }).then((r) => r.json());

export default getAllDG;
