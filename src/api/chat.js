import { BASE_URL } from '../config';
/* eslint-disable camelcase */
const chat = (kh_ma, c_noidung, c_thoigian) =>
    //eslint-disable-next-line no-undef
    fetch(`${BASE_URL}/api/chat/sendMessage`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            kh_ma,
            c_noidung,
            c_thoigian,
        }),
    }).then((res) => res.json());

export default chat;
