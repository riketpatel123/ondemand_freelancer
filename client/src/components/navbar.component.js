import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
/** Navigation bar of the website */
class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        // variable to check is user isloged in or not
        var isLogin = !!(this.props.auth.user.username);
        // variable to check type of the users to change layout of website
        var isFreelancer = (this.props.auth.user.user_type === "Freelancer");
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark primary-color">
                    <NavLink to={'/'} className="navbar-brand">Freelancing</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink to={'/browse'} className="nav-link">Browse Jobs</NavLink>
                            </li>
                            <li className="nav-item">
                                {isFreelancer ? (
                                    <NavLink to={'/ondemand/inbox'} className="nav-link">OnDemand</NavLink>
                                ) : (
                                        <NavLink to={'/ondemand'} className="nav-link">OnDemand</NavLink>
                                    )}
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/mylist'} className="nav-link">My Posts</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/about'} className="nav-link">About</NavLink>
                            </li>
                        </ul>
                        <div className="my-2 my-lg-0 ml-auto">
                            <NavLink to={'/create'} className="btn btn-dark nav-link">New Post</NavLink>
                        </div>
                        {isLogin ? (
                            <ul className="navbar-nav ml-lg-1 ml-sm-5 nav-flex-icons">
                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle mr-5" data-toggle="dropdown">  
                                        <i className="far fa-user-circle ml-1"></i> {this.props.auth.user.username}
                                    </div>
                                    <div className="dropdown-menu"
                                        aria-labelledby="userDropdown">
                                        <NavLink className="dropdown-item mr-2" to={"/viewprofile/" + this.props.auth.user.id}>View Profile</NavLink>
                                        <NavLink className="dropdown-item mr-2" to={'/userprofile'}>Update Profile</NavLink>
                                        <div className="dropdown-item" onClick={this.onLogoutClick}>Logout</div>
                                    </div>
                                </li>
                            </ul>
                        ) : (<div> <NavLink
                            to="/register"
                            style={{
                                width: "140px",
                                height: "40px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-primary"
                        >Register</NavLink>
                            <NavLink
                                to="/login"
                                style={{
                                    width: "140px",
                                    height: "40px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-primary">Log In
                                </NavLink></div>)}
                    </div>
                </nav><br />
            </header>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
