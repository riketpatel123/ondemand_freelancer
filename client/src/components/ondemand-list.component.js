import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Moment from 'react-moment';


class OnDemandList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list_of_requests: [],
            request_details: {},
        }
    }
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
    reviewRequest(request_id) {
        console.log(request_id);
        document.getElementById("reviewPanel").style.display = "block";
        axios.get('/request/ondemand/user_list/review/' + request_id)
            .then(response => {
                this.setState({ request_details: response.data });
            }).catch(function (error) {
                console.error(error);
            });
    }
    render() {
        return (
            <div>
                <h5 className="mt-2 text-center">My OnDemand Requests</h5>
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
                                <td><a onClick={() => this.deleteRequest(request._id)}>Delete</a> | <a class="hoverable" onClick={() => this.reviewRequest(request._id)}>Review</a></td>
                            </tr>
                        )}
                        <tr>
                            <td colspan="4"><div class="reviewPanel" id="reviewPanel"><h4>Review Panel:</h4><br/> Request {this.state.request_details.request_status}: {this.state.request_details.request_catagorie} |
                                    Date: <Moment format="MMMM DD, YYYY">{this.state.request_details.request_date}</Moment> |
                                    User: {this.state.request_details.confirm_freelancer_id}</div>
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