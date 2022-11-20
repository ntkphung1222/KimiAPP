import { BASE_URL } from '../config';

const getDefaultAddress = () =>
  // eslint-disable-next-line no-undef
  fetch(`${BASE_URL}/api/defaultAddress`).then((response) =>
    response.json()
  );
export default getDefaultAddress;
