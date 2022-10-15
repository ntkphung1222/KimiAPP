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
      })  
    })
    .then(res => res.json())
    );

  export default register;
