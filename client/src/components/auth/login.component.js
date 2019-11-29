import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

/**login component  allow user to login to website using email address and password*/
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/browse");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/browse"); // push user to post when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    /** onchange on the input box value of email and password */
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    /** handle onclick submit button event to login attemp*/
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container p-sm-2 d-flex justify-content-center">
                <div class="card p-lg-4 p-md-4 p-2">
                    <Link to="/" class="btn btn-link"><i class="fas fa-arrow-left"></i> Back to home </Link>
                    <form class="border border-light p-lg-5" noValidate onSubmit={this.onSubmit}>
                        <p class="h4 mb-4 text-center">Sign in</p>
                        <input type="email"
                            class="form-control mb-4 rounded-pill"
                            placeholder="E-mail"
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email" />
                        <span class="red-text">{errors.email}{errors.emailnotfound}</span>
                        <input type="password"
                            class="form-control mb-4 rounded-pill"
                            placeholder="Password"
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password" />
                        <span class="red-text">{errors.password}{errors.passwordincorrect}</span><br/>
                        <Link to="/forgotpassword">Forgot Password?</Link>
                        <button class="btn btn-info btn-block my-4 rounded-pill" type="submit">Sign in</button>
                        <div class="text-center">
                            <p>Not a member? <Link to="/register">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, { loginUser })(Login);


