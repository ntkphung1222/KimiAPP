const register = (name, sodienthoai, email, password) =>
  //this.refs.form.submit();
  //eslint-disable-next-line no-undef
  fetch('http://kimimylife.site/api/auth/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      sodienthoai,
      email,
      password
    }),
  }).then((res) => res.json());

export default register;
