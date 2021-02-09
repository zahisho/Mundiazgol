import React from 'react';
import Parse from 'parse';

import UserService from '../services/UserService';

const Login = (props) => {

  if (Parse.User.current()) {
    props.history.push('/');
  }

  let state = {
    username: '',
    password: ''
  };

  const handleChange = (e) => {
    state[e.target.name] = e.target.value;
  }

  const submit = (e) => {
    e.preventDefault();

    UserService.logIn(state.username, state.password)
      .then(() => {
        props.history.push('/');
      }, error => {
        console.log(error);
        alert('Usuario o contraseña incorrecto');
      });
  };

  return (
    <div className='login-body'>
      <form className='my-card login-card' onSubmit={submit}>
        <label className='form-item' htmlFor='username'>Usuario</label>
        <input className='form-item' type='text' name='username' id='username' onChange={handleChange} />
        <div className='sep'></div>
        <label className='form-item' htmlFor='password'>Contraseña</label>
        <input className='form-item' type='password' name='password' id='password' onChange={handleChange} />
        <div className='sep'></div>
        <div className='center'>
          <input className='login-button blue-button' type='submit' value='Aceptar' />
        </div>
      </form>
    </div>
  );
};

export default Login;