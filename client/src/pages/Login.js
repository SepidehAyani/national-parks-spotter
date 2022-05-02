import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

import { TextField, Button } from '@mui/material'


const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <TextField
            variant='outlined'
            label='Email Address'
            value={formState.email}
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            variant='outlined'
            label='Password'
            value={formState.password}
            type="password"
            name='password'
            id='password'
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p>Wrong email or password</p>
          </div>
        ) : null}
        <div>
          <Button type='submit' variant='outlined'>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;