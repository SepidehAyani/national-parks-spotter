import { Button } from '@material-ui/core';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const Nav = () => {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <a href='/' onClick={() => {Auth.logout()}}>
          <Button variant="contained">Logout</Button>
        </a>
      );
    } else {
      return (
        <ul>
          <li>
            <Link to="/login">
              <Button variant="contained">Login</Button>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <Button variant="contained">Sign Up</Button>
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header>
      <h1>
        <Link to="/">National Park Spotter</Link>
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
};

export default Nav;
