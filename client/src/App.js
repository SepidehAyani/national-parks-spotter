import { Container, Grid } from "@mui/material";
import "./App.css";

// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// apollo
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// components
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SinglePark from "./pages/SinglePark";
import NoMatch from "./pages/NoMatch";

const httpLink = new HttpLink({
	uri: "/graphql"
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ""
		}
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Container className={"top_60"}>
					<Grid item xs={12} sm={12} md={4} lg={3}>
						<Nav />
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={3}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/dashboard" component={Dashboard} />
							<Route exact path="/park/:id" component={SinglePark} />
							<Route component={NoMatch}></Route>
						</Switch>
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={3}>
						<Footer />
					</Grid>
				</Container>
			</Router>
		</ApolloProvider>
	);
}

export default App;
