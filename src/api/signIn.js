/* eslint-disable camelcase */
import { BASE_URL } from '../config';

const signIn = (kh_email, kh_matkhau) => (
    // eslint-disable-next-line no-undef
    fetch(`${BASE_URL}/api/customer/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kh_email, kh_matkhau })
    })
    .then(res => res.json())
);
export default signIn;
