import { BASE_URL } from '../config';

// eslint-disable-next-line camelcase
const postTBDaDoc = (tb_ma) =>
  //eslint-disable-next-line no-undef
  fetch(`${BASE_URL}/api/tbDaDoc`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tb_ma,
    }),
  }).then((res) => res.json());

export default postTBDaDoc;
