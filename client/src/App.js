import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import ReactNotifications from 'react-notifications-component';
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./actions/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import './App.css';
// import mdbootstrap css 
import 'bootstrap/dist/css/bootstrap.min.css';

// import different react component on user request using react router
import Home from "./components/home.component";
import Navbar from "./components/navbar.component";
import Register from "./components/auth/register.component";
import Login from "./components/auth/login.component";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./components/create-post.component";
import UpdatePost from "./components/update-post.component";
import ShowPostList from "./components/post-list.component";
import ShowMyPostList from "./components/mypost-list.component";
import ViewPost from "./components/view-post.component";
import OnDemand from "./components/ondemand.component";
import OnDemandIndex from "./components/ondemand-index.component";
import UserProfile from "./components/user-profile.component";
import ViewUserProfile from "./components/view-userProfile.component";
import About from "./components/about.component";
import Message from "./components/message-component";
import ForgotPassword from "./components/forgot-password.component";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <ReactNotifications />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/forgotpassword" component={ForgotPassword} />
                        <Route path="/about" component={About} />
                        <PrivateRoute path="/message/:name" component={Message} />
                        <PrivateRoute path="/browse" component={ShowPostList} />
                        <PrivateRoute path="/mylist" component={ShowMyPostList} />
                        <PrivateRoute path="/ondemand/inbox" component={OnDemandIndex} />
                        <PrivateRoute path="/ondemand" component={OnDemand} />
                        <PrivateRoute path="/update/:id" component={UpdatePost} />
                        <PrivateRoute path="/create" component={CreatePost} />
                        <PrivateRoute path="/view/:id" component={ViewPost} />
                        <PrivateRoute path="/userprofile" component={UserProfile} />
                        <PrivateRoute path="/viewprofile/:id" component={ViewUserProfile} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}
export default App;
