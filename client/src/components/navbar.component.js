import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        var isLogin = !!(this.props.auth.user.username);
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
                        </ul>
                        <div class="my-2 my-lg-0 ml-auto">
                            <NavLink to={'/create'} className="btn btn-dark nav-link">New Post</NavLink>
                        </div>
                        {isLogin ? (
                            <ul className="navbar-nav ml-1 nav-flex-icons">
                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle" id="userDropdown" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <div className="dropdown-menu dropdown-menu-right dropdown-default"
                                        aria-labelledby="userDropdown">
                                        <div className="dropdown-item"><i class="far fa-user-circle ml-1"></i> {this.props.auth.user.username}</div>
                                        <div className="dropdown-item" onClick={this.onLogoutClick}><i class="fas fa-sign-out-alt"></i> Logout</div>
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
