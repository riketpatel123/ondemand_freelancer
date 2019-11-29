import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from "react-redux";

/** React Component to Update the job post detail, this component load when user click on update button */
class UpdatePost extends Component {
    constructor(props) {
        super(props);
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
    /** Collect  all the post post detail by post id */
    componentDidMount() {
        axios.get('/post/detail/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    post_title: response.data.post_title,
                    post_description: response.data.post_description,
                    post_catagories: response.data.post_catagories,
                    post_budget: response.data.post_budget,
                    post_address: response.data.address,
                    post_city: response.data.city,
                    post_postal_code: response.data.postal_code,
                    post_province: response.data.province,
                    post_country: response.data.country,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    } 
    /** Handle input button onchange event when user change the value in inputbox*/
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    /** handle submit button event to update the post details in the database */
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
        /** send the post request to update the job details in database */
        axios.post('/post/update/' + this.props.match.params.id, obj)
            .then(res => {
                console.log(res.data);
                this.setState({ redirect: true })
            });
    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/mylist' />;
        }
        return (
            <div className="container">
                <h6>Freelancer > Update Post</h6>
                <h3>Update Existing Post</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            className="form-control"
                            name='post_title'
                            value={this.state.post_title}
                            onChange={this.onChange}
                            maxlength="50" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            name='post_description'
                            value={this.state.post_description}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Catagories: </label>
                            <select class="form-control" name='post_catagories' value={this.state.post_catagories}
                                onChange={this.onChange}>
                                <option>By Category</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Hardware">Hardware</option>
                                <option value="Electrical">Electrical</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Budget: </label>
                            <input type="text"
                                className="form-control"
                                name='post_budget'
                                value={this.state.post_budget}
                                onChange={this.onChange}
                                max="30"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Address: </label>
                        <input type="text"
                            className="form-control"
                            name='post_address'
                            value={this.state.post_address}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>City: </label>
                            <input type="text"
                                className="form-control"
                                name='post_city'
                                value={this.state.post_city}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Postal_code: </label>
                            <input type="text"
                                className="form-control"
                                name='post_postal_code'
                                value={this.state.post_postal_code}
                                onChange={this.onChange}
                                maxlength="6" 
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Post_province: </label>
                            <input type="text"
                                className="form-control"
                                name='post_province'
                                value={this.state.post_province}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Post_country: </label>
                            <input type="text"
                                className="form-control"
                                name='post_country'
                                value={this.state.post_country}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Post" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(UpdatePost);