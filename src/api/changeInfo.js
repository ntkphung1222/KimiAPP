/* eslint-disable no-unused-vars */
import { BASE_URL } from '../config';
/* eslint-disable camelcase */
const changeInfo = (kh_email, kh_ten, kh_gioitinh, kh_ngaysinh, kh_sodienthoai) =>
  //eslint-disable-next-line no-undef
  fetch(`${BASE_URL}/api/customer/changeInfo`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      kh_email, kh_ten, kh_gioitinh, kh_ngaysinh, kh_sodienthoai
    }),
  }).then((res) => res.json());

export default changeInfo;
