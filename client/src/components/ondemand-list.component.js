import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
/**List all the ondemand request list create by employer user */
class OnDemandList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list_of_requests: [],
            request_details: {},
            confirmedUser: ""
        }
    }
    /** GET all ondemand request create by employer */
    componentWillMount() {
        const user_obj = { user_id: this.props.auth.user.id }
        axios.post("/request/ondemand/user_list/", user_obj)
            .then(response => {
                this.setState({ list_of_requests: response.data });
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    /** Method to handle the delete  ondemand request by id*/
    deleteRequest(request_id) {
        axios.get('/request/ondemand/user_list/delete/' + request_id)
            .then(response => {
                console.log("Request Deleted : ", request_id);
                const user_obj = { user_id: this.props.auth.user.id }
                axios.post("/request/ondemand/user_list/", user_obj)
                    .then(response => {
                        this.setState({ list_of_requests: response.data });
                    });
            })
            .catch(err => console.log(err))
    }
    /** Method to display review panel to check the status of the your ondemand request */
    reviewRequest(request_id) {
        document.getElementById("reviewPanel").style.display = "block";
        axios.get('/request/ondemand/user_list/review/' + request_id)
            .then(response => {
                this.setState({ request_details: response.data });
                // set status to Not confirmed if request is still in pending state
                if (this.state.request_details.confirm_freelancer_id === undefined) {
                    this.setState({
                        confirmedUser: "Not Confirmed"
                    });
                } else {
                    axios.get('/users/userprofile/' + this.state.request_details.confirm_freelancer_id)
                        .then(response => {
                            this.setState({
                                confirmedUser: response.data.full_name
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }).catch(function (error) {
                console.error(error);
            });
    }
    render() {
        return (
            <div>
                <h5 className="mt-2 text-center">My OnDemand Requests List</h5>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Service</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list_of_requests.map(request =>
                            <tr key={request._id}>
                                <td>{request.request_catagorie} </td>
                                <td><Moment format="MMMM DD, YYYY">{request.request_date}</Moment></td>
                                <td>{request.request_status} </td>
                                <td><a className='text-primary' onClick={() => this.deleteRequest(request._id)}>Delete</a> | <a class="hoverable text-primary" onClick={() => this.reviewRequest(request._id)}>Review</a></td>
                            </tr>
                        )}
                        <tr>
                            <td colspan="4">
                                <div className="reviewPanel" id="reviewPanel">
                                    <h4>Review Panel:</h4><br />
                                    <div className="card p-3">
                                        <h6>Request <strong>{this.state.request_details.request_status}</strong>: {this.state.request_details.request_catagorie}</h6>
                                        <p>Date: <Moment format="MMMM DD, YYYY">{this.state.request_details.request_date}</Moment></p>
                                        <p>User: <Link className="text-primary" to={"/viewprofile/" + this.state.request_details.confirm_freelancer_id}>{this.state.confirmedUser}</Link></p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(OnDemandList);