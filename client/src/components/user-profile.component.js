import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

/** UserPRofile component to update user profile of the user */
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
        this.state = {
            user_id: props.auth.user.id,
            full_name: '',
            work_title: '',
            description: '',
            work_catagorie: '',
            email: '',
            contact_number: '',
            websites: '',
            profile_photo: '',
            redirect: false,
        }
    }
    /** get the details of the users from the database */
    componentDidMount() {
        axios.get('/users/userprofile/' + this.props.auth.user.id)
            .then(response => {
                this.setState({
                    full_name: response.data.full_name,
                    work_title: response.data.work_title,
                    description: response.data.description,
                    work_catagorie: response.data.work_catagorie,
                    email: response.data.email,
                    contact_number: response.data.contact_number,
                    websites: response.data.websites,
                    profile_photo: response.data.profile_photo,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /** Handle input button onchange event when user change the value in inputbox*/
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    /** handle submit button event to update the user profile details in the database */
    onSubmit(e) {
        e.preventDefault();
        // Display notification message about updating user profile
        store.addNotification({
            title: 'Database',
            message: 'Update Profile Successfully ',
            type: 'success',
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000,
                showIcon: true
            },
            width: 250
        });
        const obj = {
            user_id: this.state.user_id,
            work_title: this.state.work_title,
            description: this.state.description,
            work_catagorie: this.state.work_catagorie,
            email: this.state.email,
            contact_number: this.state.contact_number,
            websites: this.state.websites,
            profile_photo: this.state.profile_photo,
            full_name: this.state.full_name
        };
        // send user profile update request to server
        axios.post('/users/userprofile/' + this.state.user_id, obj)
            .then(res => {
            });
    }
    /** handle back button event to return to home screen */
    onBack(e) {
        this.setState({ redirect: true });
    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/browse' />;
        }
        return (
            <div className="container">
                <h6>Freelancer > User Profile</h6>
                <h3>User Profile:</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Full Name: </label>
                        <input type="text"
                            className="form-control"
                            name='full_name'
                            value={this.state.full_name}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            className="form-control"
                            name='work_title'
                            value={this.state.work_title}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            name='description'
                            value={this.state.description}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group w-auto">
                        <label>Catagories: </label>
                        <select class="form-control" name='work_catagorie' value={this.state.work_catagorie}
                            onChange={this.onChange}>
                            <option>By Category</option>
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
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            className="form-control"
                            name='email'
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact Number: </label>
                        <input type="number"
                            className="form-control"
                            name='contact_number'
                            value={this.state.contact_number}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Website: </label>
                        <input type="text"
                            className="form-control"
                            name='websites'
                            value={this.state.websites}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Save" className="btn btn-danger" style={{ width: "150px" }} />
                        <input value="Back" type="submit" className="btn btn-primary" style={{ width: "150px" }} onClick={this.onBack} />
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(UserProfile);