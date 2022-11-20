/* eslint-disable camelcase */
import { BASE_URL } from '../config';

const register = (kh_ten, kh_sodienthoai, kh_email, kh_matkhau) =>
    //eslint-disable-next-line no-undef
    fetch(`${BASE_URL}/api/customer/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            kh_ten,
            kh_sodienthoai,
            kh_email,
            kh_matkhau,
        }),
    }).then((res) => res.json());

export default register;
