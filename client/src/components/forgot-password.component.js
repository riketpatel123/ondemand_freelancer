import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';

/** react component of forgot password to reset the password */
class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            sanswer: "",
            squestion: "",
            realAnswer: "",
            new_password: "",
            redirect: false,
            errors: {}
        };
    }
    /** handle onchange event of the input box */
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    /** handle Onclick event of the reset password button,
     *  which will reset the password of the user if the security answer is correct 
     * */
    onSubmit = e => {
        e.preventDefault();
        /** find the user by user email address */
        axios.get('/users/forgotpassword/' + this.state.email)
            .then(response => { 
                // match the security answer
                if (this.state.sanswer === response.data.sanswer) {
                    var new_password = this.state.new_password;
                    if (new_password.length >= 6) {
                        const obj = {
                            password: this.state.new_password
                        };
                        // reset the password of the user
                        axios.post('/users/forgotpassword/' + this.state.email, obj)
                            .then(response => {
                                this.setState({
                                    redirect: true
                                });
                            }).catch(function (error) {
                                console.error(error);
                            });
                    } else {
                        this.setState({
                            errors: { password: "Password must be at least 6 characters & special characters" }
                        });
                    }
                }
                else {
                    this.setState({
                        errors: { sanswer: "Incorrect security answer" }
                    });
                }
            }).catch(function (error) {
                console.error(error);
            });
    };
    /** Handle click event to check the user is exist or not */
    checkEmail() {
        axios.get('/users/forgotpassword/' + this.state.email)
            .then(response => {
                if (response.data === null) {
                    this.setState({
                        errors: { invalidEmail: "Invalid email address" }
                    });
                } else {
                    this.setState({
                        squestion: response.data.squestion
                    });
                }

            }).catch(function (error) {
                console.error(error);
            });
    }
    render() {
        const { errors } = this.state;
        // Redirect to login Page
        var { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/login' />;
        }
        return (
            <div className="container p-sm-2 d-flex justify-content-center">
                <div class="card p-lg-5 p-md-5 p-2" style={{ width: '100%' }}>
                    <Link to="/login" class="btn btn-link text-left"><i class="fas fa-arrow-left"></i> Back to login </Link>
                    <form class="border border-light p-lg-5" noValidate onSubmit={this.onSubmit}>
                        <p class="h4 mb-4 text-center">Forgot Password</p>
                        <div className="form-group form-inline">
                            <input type="email"
                                class="form-control col-lg-8 col-md-8 col-sm-6 "
                                placeholder="Your recovery email"
                                onChange={this.onChange}
                                value={this.state.email}
                                id="email"
                                required />
                            <p className="btn col-sm-3 col-lg-2 col-md-3" onClick={() => this.checkEmail()}>find Email</p>
                            <span class="red-text">{errors.invalidEmail}</span><br />
                        </div>
                        <div className="form-group">
                            <label>Question: <strong>{this.state.squestion}?</strong></label>
                            <input type="text"
                                class="form-control"
                                placeholder="Answer"
                                onChange={this.onChange}
                                value={this.state.sanswer}
                                id="sanswer"
                                required
                            />
                            <span class="red-text">{errors.sanswer}</span><br />
                        </div>
                        <div className="form-group">
                            <label>New Password: </label>
                            <input type="password"
                                className="form-control"
                                id='new_password'
                                value={this.state.new_password}
                                onChange={this.onChange}
                                placeholder="New Password"
                                required
                            />
                            <span class="red-text">{errors.password}</span><br />
                        </div>
                        <button class="btn btn-primary" type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(ForgotPassword);


