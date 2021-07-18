
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/../components/layout/navbar/Menu";
import HomePage from "./components/home/HomePage";
import BlogPage from "./components/blog/BlogPage";
import SearchPage from "./components/blog/SearchPage";
import DetailPosts from "./components/detail/DetailPosts";
import AddPost from "./components/admin/AddPost";
import EditPost from "./components/admin/EditPost";
import LoginPage from "./components/login/LoginPage";
import Layout from "./components/layout/layout/Layout";
import Footer from "./components/layout/footer/Footer";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/AuthContext";

import theme from "./styles/theme";

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<AuthProvider>
					<Router>
						<Menu />
						<Layout>
							<Switch>
								<Route exact path="/">
									<HomePage />
								</Route>
								<Route exact path="/blog">
									<BlogPage />
								</Route>
								<Route path="/detail/:id">
									<DetailPosts />
								</Route>
								<Route path="/search">
									<SearchPage />
								</Route>
								<Route path="/login">
									<LoginPage />
								</Route>	
								<Route path="/admin/add">
									<AddPost />
								</Route>
								<Route path="/admin/edit/:id">
									<EditPost />
								</Route>
							</Switch>
						</Layout>
					</Router>
				</AuthProvider>
				<Footer>&copyright 2021 Develop by Florinda Zeida</Footer>
			</ThemeProvider>
		</>
	);
}

export default App;
