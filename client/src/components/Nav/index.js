import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


const Nav = () => {
  return (
    <div>
      <Button variant="contained">Login</Button>
      <h1>National Park Spotter</h1>
      <Button variant="contained">Sign Up</Button>
    </div>
  );
}

export default Nav
