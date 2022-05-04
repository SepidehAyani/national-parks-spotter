import "./App.css";
import { Container, Grid } from "@mui/material";

// react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";

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
	const [parkClicked, setParkClicked] = useState("");
	return (
		<ApolloProvider client={client}>
			<Router>
						<Nav />
						<Routes>
							<Route
								exact
								path="/"
								element={
									<Home
										parkClicked={parkClicked}
										setParkClicked={setParkClicked}
									/>
								}
							/>
							<Route exact path="/login" element={<Login />} />
							<Route exact path="/signup" element={<Signup />} />
							<Route exact path="/dashboard" element={<Dashboard />} />
							<Route exact path="/park/:id" element={<SinglePark />} />
							<Route element={<NoMatch />}></Route>
						</Routes>
						<Footer />
				
			</Router>
		</ApolloProvider>
	);
}

export default App;
