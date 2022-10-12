const register = (email, name, password) => (
    //this.refs.form.submit();
    //eslint-disable-next-line no-undef
    fetch('http://kimimylife.site/api/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
        password_confirmation: password
      })  
    })
    .then(res => res.text())
    );

  export default register;
