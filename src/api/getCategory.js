import { BASE_URL } from '../config';

const getCategory = () =>
  // eslint-disable-next-line no-undef
  fetch(`${BASE_URL}/api/category`).then((response) =>
    response.json()
  );
export default getCategory;
