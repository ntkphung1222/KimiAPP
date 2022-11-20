/* eslint-disable camelcase */
import { BASE_URL } from '../config';

/* eslint-disable no-undef */
// eslint-disable-next-line camelcase
const setDCMD = (dc_ma, dc_kh) =>
    fetch(`${BASE_URL}/api/setDefaultAddress?dc_ma=${dc_ma}&dc_kh=${dc_kh}`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dc_ma,
                dc_kh
            }),
        }
    ).then((r) => r.json());

export default setDCMD;
