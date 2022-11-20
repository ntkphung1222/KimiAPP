import { BASE_URL } from '../config';

const getNewProduct = () =>
  // eslint-disable-next-line no-undef
  fetch(`${BASE_URL}/api/newproduct`).then((response) =>
    response.json()
  );
export default getNewProduct;
