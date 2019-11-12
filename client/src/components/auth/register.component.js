import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/browse");
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onRegister = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log(userData);
        this.props.registerUser(userData, this.props.history);
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="container p-sm-2 d-flex justify-content-center">
                <div class="card p-lg-4">
                    <Link to="/" class="btn btn-link d-flex align-items-start">
                        <i class="fas fa-arrow-left mr-2"></i> Back to home
                        </Link>
                    <div class="row">
                        <div class="col">
                            <h4>
                                <b>Sign Up</b> below
                            </h4>
                            <p class="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>
                    </div>
                    <div class="row m-3 p-2">
                        <form className onSubmit={this.onRegister}>
                            <div class="form-row">
                                <div class="form-group  col-md-6">
                                    <label for="username">Username</label>
                                    <input
                                        class="form-control"
                                        onChange={this.onChange}
                                        value={this.state.username}
                                        error={errors.username}
                                        id="username"
                                        type="text"
                                    />
                                    <span class="red-text">{errors.username}</span>
                                </div>
                                <div class="form-group  col-md-6">
                                    <label for="email">Email</label>
                                    <input
                                        class="form-control"
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                        type="email"
                                    />
                                    <span class="red-text">{errors.email}</span>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col">
                                    <label for="password">Password</label>
                                    <input
                                        class="form-control"
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                    />
                                    <span class="red-text">{errors.password}</span>
                                </div>
                                <div class="form-group col">
                                    <label for="password2">Confirm Password</label>
                                    <input
                                        class="form-control"
                                        onChange={this.onChange}
                                        value={this.state.password2}
                                        error={errors.password2}
                                        id="password2"
                                        type="password"
                                    />
                                    <span class="red-text">{errors.password2}</span>
                                </div>
                            </div>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                class="btn btn-primary">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
