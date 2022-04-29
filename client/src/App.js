import logo from './logo.svg';
import './App.css';

// react router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// components
import Nav from './components/Nav';
import Footer from './components/Footer';

// pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SinglePark from './pages/SinglePark';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';

const httpLink = new HttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
            <Nav />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/park/:id" element={<SinglePark />} />
              <Route element={<NoMatch/>}></Route>
            </Routes>
            <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
