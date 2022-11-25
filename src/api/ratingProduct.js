import { BASE_URL } from '../config';

/* eslint-disable camelcase */
const ratingProduct = (hdx_ma, sp_ma, dg_sao, dg_noidung) =>
  //eslint-disable-next-line no-undef
  fetch(`${BASE_URL}/api/rating`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     hdx_ma,
     sp_ma,
     dg_sao,
     dg_noidung
    }),
  }).then((res) => res.json());

export default ratingProduct;
