import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
/** react compmoent to Create new job post */
class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            user_id: props.auth.user.id,
            post_title: '',
            post_description: '',
            post_catagories: '',
            post_budget: '',
            post_address: '',
            post_city: '',
            post_postal_code: '',
            post_province: '',
            post_country: '',
            redirect: false
        }
    }
    /** handle onchange event of the input box */
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    /** handle onclick event to create an new post and send a create new post request to server */
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            user_id: this.state.user_id,
            post_title: this.state.post_title,
            post_description: this.state.post_description,
            post_catagories: this.state.post_catagories,
            post_budget: this.state.post_budget,
            address: this.state.post_address,
            city: this.state.post_city,
            postal_code: this.state.post_postal_code,
            province: this.state.post_province,
            country: this.state.post_country
        };
        axios.post('/post/create', obj)
            .then(response => {
                this.setState({ redirect: true })
            });
    }
    render() {
        // Redirect to Main Page
        var { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/mylist' />;
        }
        return (
            <div className="container">
                <h6>Freelancer > Create New Post</h6>
                <h3>Enter New Post Details</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Title: </label>
                                <input type="text"
                                    className="form-control"
                                    name='post_title'
                                    value={this.state.post_title}
                                    onChange={this.onChange}
                                    placeholder="Title"
                                    maxlength="50" 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label for="post_description">Description: </label>
                                <textarea type="text"
                                    id="post_description"
                                    className="form-control"
                                    name='post_description'
                                    value={this.state.post_description}
                                    onChange={this.onChange}
                                    placeholder="Description"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Catagories: </label>
                                <select class="form-control" name='post_catagories' value={this.state.post_catagories}
                                    onChange={this.onChange} required>
                                    <option>Choose Category</option>
                                    <option value="Automotive">Automotive</option>
                                    <option value="Agriculture">Agriculture/Farming</option>
                                    <option value="Cleaning">Cleaning</option>
                                    <option value="Construction">Construction/ Facilities</option>
                                    <option value="Customer Service">Customer Service</option>
                                    <option value="Finance">Accounting/ Finanace</option>
                                    <option value="Food Service">Restaurant / Food Service</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Multimedia">Desgin, Art &amp; Multimedia</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Volunteer">Volunteer</option>
                                    <option value="Warehouse">Warehouse</option>
                                    <option value="Other">Other</option>
                                  </select>
                            </div>
                        </div>
                        <div className="form-group col-lg-6 d-flex align-items-center">
                            <label className="m-lg-5 mr-2">Budget/Wage: </label>
                            <i class="fas fa-dollar-sign mr-1"></i>
                            <input type="text"
                                className="form-control"
                                name='post_budget'
                                value={this.state.post_budget}
                                onChange={this.onChange}
                                placeholder="Budget"
                                max="30"
                                required
                            />
                        </div>
                    </div>
                    <h6>Additional Information:</h6>
                    <div className="border border-primary p-3">
                        <div className="form-row">
                            <div className="form-group col-lg-6 col-md-6">
                                <label>Address: </label>
                                <input type="text"
                                    id="AutoAddress"
                                    className="form-control"
                                    name='post_address'
                                    value={this.state.post_address}
                                    onChange={this.onChange}
                                    placeholder="Address"
                                    required
                                />
                            </div>
                            <div className="form-group col-lg-2 col-md-2">
                                <label>City: </label>
                                <input type="text"
                                    className="form-control"
                                    name='post_city'
                                    value={this.state.post_city}
                                    onChange={this.onChange}
                                    placeholder="City"
                                    required
                                />
                            </div>
                            <div className="form-group col-lg-2 col-md-2">
                                <label>Postal Code: </label>
                                <input type="text"
                                    className="form-control"
                                    name='post_postal_code'
                                    value={this.state.post_postal_code}
                                    onChange={this.onChange}
                                    placeholder="Postal Code"
                                    maxlength="6"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label>Province: </label>
                                <input type="text"
                                    className="form-control"
                                    name='post_province'
                                    value={this.state.post_province}
                                    onChange={this.onChange}
                                    placeholder="Province"
                                    required
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <label>Country Code: </label>
                                <input type="text"
                                    className="form-control"
                                    name='post_country'
                                    value={this.state.post_country}
                                    onChange={this.onChange}
                                    placeholder="Country"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create New Post" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(CreatePost);