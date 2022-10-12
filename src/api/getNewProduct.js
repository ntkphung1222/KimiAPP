const getNewProduct = () =>
  // eslint-disable-next-line no-undef
  fetch('http://kimimylife.site/api/newproduct').then((response) =>
    response.json()
  );
export default getNewProduct;
