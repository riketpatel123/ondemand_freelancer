import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from "react-redux";

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
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }
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

        // this.setState({
        //     post_title:'',
        //     post_description:'',
        //     post_catagories:'',
        //     post_budget:'',
        //     post_address:'',
        //     post_city:'',
        //     post_postal_code:'',
        //     post_province:'',
        //     post_country:''
        // })
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
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            className="form-control"
                            name='post_title'
                            value={this.state.post_title}
                            onChange={this.onChange}
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
                    <div className="form-row">

                        <div className="form-group col-md-6">
                            <label>Catagories: </label>
                            <select class="form-control" name='post_catagories' value={this.state.post_catagories}
                                onChange={this.onChange}>
                                <option>Choose Category</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Hardware">Hardware</option>
                                <option value="Electrical">Electrical</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Budget: </label>
                            <input type="number"
                                className="form-control"
                                name='post_budget'
                                value={this.state.post_budget}
                                onChange={this.onChange}
                                required
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
                            required
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
                                required
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Postal Code: </label>
                            <input type="text"
                                className="form-control"
                                name='post_postal_code'
                                value={this.state.post_postal_code}
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Province: </label>
                            <input type="text"
                                className="form-control"
                                name='post_province'
                                value={this.state.post_province}
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Country: </label>
                            <input type="text"
                                className="form-control"
                                name='post_country'
                                value={this.state.post_country}
                                onChange={this.onChange}
                                required
                            />
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