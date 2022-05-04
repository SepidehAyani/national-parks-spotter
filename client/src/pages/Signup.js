import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

import { TextField, Button } from '@mui/material';

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
    <div className="form-div">
      <h2>Signup</h2>
      <form id="signup-form" className="form" onSubmit={handleFormSubmit}>
        <div>
          <TextField
            variant="outlined"
            label="Username"
            value={formState.username}
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            label="Email Address"
            value={formState.email}
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            label="Password"
            value={formState.password}
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color='success'
            sx={{ backgroundColor: 'darkgreen', color: 'whitesmoke' }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
