import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Moment from 'react-moment';


class OnDemandList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list_of_requests: [],
        }
    }
    componentWillMount() {
        axios.get("/request/ondemand/")
            .then(response => {
                this.setState({ list_of_requests: response.data });
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    reviewRequest(request_id) {
        console.log(request_id);
        alert(request_id);
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
                                    <div class="d-flex justify-content-start">
                                        <div class="p-2 pr-2">{request.user_id}</div>
                                        <div class="p-2"><i class="far fa-clock amber-text pr-2"></i> <Moment format="MMMM DD, YYYY">{request.request_date}</Moment></div>
                                        <div class="p-2"><i class="fas fa-map-marker-alt pr-2"></i> {request.request_status}</div>
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