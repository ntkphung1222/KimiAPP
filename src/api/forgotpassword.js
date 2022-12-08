/* eslint-disable camelcase */
import { BASE_URL } from '../config';

const forgotpassword = (kh_email) => (
    // eslint-disable-next-line no-undef
    fetch(`${BASE_URL}/api/customer/forgotpassword`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kh_email })
    })
    .then(res => res.json())
);
export default forgotpassword;
