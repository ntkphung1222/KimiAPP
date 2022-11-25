/* eslint-disable no-unused-vars */
import { BASE_URL } from '../config';
/* eslint-disable camelcase */
const changePassword = (kh_email, matkhaucu, matkhaumoi) =>
  //eslint-disable-next-line no-undef
  fetch(`${BASE_URL}/api/customer/changePassword`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      kh_email, matkhaucu, matkhaumoi
    }),
  }).then((res) => res.json());

export default changePassword;
