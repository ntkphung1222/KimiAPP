import { BASE_URL } from '../config';
// eslint-disable-next-line camelcase
const dgTB = (sp_ma) =>
  //this.refs.form.submit();
  //eslint-disable-next-line no-undef
  fetch(`${BASE_URL}/api/getDGTB`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sp_ma,
    }),
  }).then((res) => res.json());

export default dgTB;
