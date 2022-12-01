import { BASE_URL } from '../config';
/* eslint-disable no-undef */
// eslint-disable-next-line camelcase
const getNotification = (dc_kh) =>
  //eslint-disable-next-line no-undef
  // eslint-disable-next-line camelcase
  fetch(`${BASE_URL}/api/getNotification?dc_kh=${dc_kh}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dc_kh,
    }),
  }).then((r) => r.json());

export default getNotification;
