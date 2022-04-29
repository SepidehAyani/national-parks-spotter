import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

import { Button } from '@material-ui/core';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const mutationResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
  
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
      
    } catch (error) {
      alert(error.message);
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
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@domain.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
