import { BASE_URL } from '../config';

const getNewPost = () =>
  // eslint-disable-next-line no-undef
  fetch(`${BASE_URL}/api/newpost`).then((response) =>
    response.json()
  );
export default getNewPost;
