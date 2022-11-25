import { BASE_URL } from '../config';
/* eslint-disable camelcase */
const confirmOrder = (hdx_ma) =>
  //eslint-disable-next-line no-undef
  fetch(`${BASE_URL}/api/confirmorder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     hdx_ma
    }),
  }).then((res) => res.json());

export default confirmOrder;
