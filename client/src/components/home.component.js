import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div className="container-fluid home_compenent">
                <h4 align="center"  class="display-4 mt-5">
                    Find Your Career. You Deserve it.
                </h4>
                <div className="row mt-5" align="center">
                    <div className="col">
                        <Link
                            to="/register"
                            style={{
                                width: "140px",
                                height: "40px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-primary"
                        >Register</Link>
                    </div>
                    <div className="col">
                        <Link
                            to="/login"
                            style={{
                                width: "140px",
                                height: "40px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-primary">Log In
                                </Link>
                    </div>
                </div>
            </div>
        )
    }
}
