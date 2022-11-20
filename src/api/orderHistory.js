import { BASE_URL } from '../config';

// eslint-disable-next-line camelcase
const order = (hdx_kh, hdx_soluong, hdx_tongtien, chitiet) =>
  //this.refs.form.submit();
  //eslint-disable-next-line no-undef
  fetch(`${BASE_URL}/api/invoiceexport`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hdx_kh,
      hdx_soluong,
      hdx_tongtien,
      chitiet,
    }),
  }).then((res) => res.json());

export default order;
