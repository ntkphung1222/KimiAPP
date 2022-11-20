import { BASE_URL } from '../config';
/* eslint-disable camelcase */
const cancleOrder = (hdx_ma) =>
  //eslint-disable-next-line no-undef
  fetch(`${BASE_URL}/api/cancleorder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     hdx_ma
    }),
  }).then((res) => res.json());

export default cancleOrder;
