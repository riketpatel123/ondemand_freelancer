import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Moment from 'react-moment';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

class OnDemandList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list_of_requests: [],
        }
    }
    /** get list of all the ondemand request for the freelancer user  */
    componentWillMount() {
        axios.get("/request/ondemand/")
            .then(response => {
                this.setState({ list_of_requests: response.data });
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    /** Method to show notification when user accept the request */
    ShowNotification(message) {
        store.addNotification({
            title: 'Database',
            message: message,
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
    }
    /** Confirm the request when user click on accept button */
    reviewRequest(request_id) {
        console.log(request_id);
        
        var requestObj = {
            request_status: "Confirmed",
            confirm_freelancer_id: this.props.auth.user.id
        }
        // send freelancer_id to confirm the request of ondemand
        axios.post("/request/ondemand/confirm/" + request_id, requestObj)
            .then(response => {
                this.ShowNotification(response.data.message);
                this.componentWillMount();
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    render() {
        return (
            <div className="container">
                <h5 className="mt-2">OnDemand Index:</h5>
                {this.state.list_of_requests.map(request =>
                    <div class="item" key={request._id}>
                        <div class="d-flex flex-row flex-wrap">
                            <div class="d-flex align-items-start flex-column p-2">
                                <div class="h4">{request.request_catagorie}</div>
                                <div class="d-flex justify-content-start row">
                                <div class="p-2 pr-2 column"><i class="fas fa-user-tie mr-1"></i>{request.username}</div>
                                    <div class="p-2 column"><i class="far fa-clock amber-text pr-2"></i> <Moment format="MMMM DD, YYYY">{request.request_date}</Moment></div>
                                    <div class="p-2 column"><i class="fas fa-map-marker-alt pr-2"></i> {request.request_status}</div>
                                </div>
                            </div>
                            <div class="p-2 ml-auto align-self-center"><a onClick={() => this.reviewRequest(request._id)} class="btn btn-secondary">Apply</a></div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(OnDemandList);