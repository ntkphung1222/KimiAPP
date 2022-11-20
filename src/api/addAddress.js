import { BASE_URL } from '../config';
/* eslint-disable camelcase */
const addAddress = (dc_kh, dc_nguoinhan, dc_sdtnguoinhan, xaid, dc_chitiet) =>
    //eslint-disable-next-line no-undef
    fetch(`${BASE_URL}/api/addAddress`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dc_kh,
            dc_nguoinhan,
            dc_sdtnguoinhan,
            xaid,
            dc_chitiet,
        }),
    }).then((res) => res.json());

export default addAddress;
