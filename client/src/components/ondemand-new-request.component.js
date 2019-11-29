import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

import { connect } from "react-redux";
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';

/** React component to create new ondemand request*/
class OnDemand extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            catagories: '',
            selectedDay: undefined,
            errors: {},
            redirect: false,
            catlist: ["Warehouse Associate", "Electrician", "Machinist", "Painter", "Moving Help",
                "Plumber", "Sales Representative", "Fitter Welder", "General Labour",
                "Food Packaging", "Customer Representative", "Kitchen Assistant", "Registered Nurse",
                "Volunteer", "Garbage Disposal", "HouseKeeper", "Front Desk Receptionist",
                "Supervisor", "Automotive Technician", "Constructor Worker", "Cleaner", "Driver", "Home Repair Services",
                "Locks Service", "Air Conditioner Service", "Lawn Care", "Flooring", "Roofing"]
        }
    }
    /** Method to handle date change in date picker */
    handleDayChange(day) {
        this.setState({ selectedDay: day });
    }
    /** method to handle input box onchange event */
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    /** method to handle onsubmit request event to create new ondemand request*/
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            user_id: this.props.auth.user.id,
            username: this.props.auth.user.username,
            request_catagorie: this.state.catagories,
            request_date: this.state.selectedDay,
        };
        if (obj.request_catagorie !== "") {
            this.setState({ errors: {} });
            axios.post('/request/ondemand/create', obj)
                .then(response => {
                    console.log(response.data);
                    this.setState({ redirect: true })
                });
        } else {
            this.setState({
                errors: { request_catagorie: "Choose catagorie required" },
            });
        }
    }
    render() {
        const { errors } = this.state;
        var { redirect } = this.state;
        // redirect to mylist
        if (redirect) {
            return <Redirect to='/ondemand/mylist' />;
        }
        return (
            <div className="container">
                <form class="p-5 text-center " noValidate onSubmit={this.onSubmit}>
                    <p class="h4 mb-4 text-center">ON Demand Worker Request</p>
                    <label for="catagories">Choose Request Category</label>
                    <select class="form-control browser-default custom-select mb-4" id="catagories" name='catagories' value={this.state.catagories}
                        onChange={this.onChange} required >
                        <option value="" disabled="" defaultValue="">Choose your Category</option>
                        {this.state.catlist.map(name =>
                            <option value={name}>{name}</option>
                        )}
                    </select>
                    <span class="red-text">{errors.request_catagorie}</span><br />
                    <DayPickerInput onDayChange={this.handleDayChange} />
                    {/* <Moment format="MMMM DD, YYYY" className="mr-2">{this.state.selectedDay}</Moment> */}
                    <button class="btn btn-info btn-block my-4 waves-effect" type="submit">Request</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(OnDemand);