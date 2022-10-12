const getCategory = () =>
  // eslint-disable-next-line no-undef
  fetch('http://kimimylife.site/api/category').then((response) =>
    response.json()
  );
export default getCategory;
