import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

/**
 * View Post Component loads when user clicks on specific post , In this page user will find all the information 
 * about the posted job and freelancer will also place a bid on the post using biding panel. This page also allow employer
 * to find best choice of freelancer and hire for there work
 */
class ViewPost extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            user_id: '',
            post_title: '',
            post_description: '',
            post_catagories: '',
            post_budget: '',
            post_address: '',
            confirm_freelancer: '',
            bid_amount: '',
            list_of_bids: [],
            number_of_bids: 0,
            employer_details: {
                full_name: '',
                user_id: '',
                work_title: '',
                work_catagorie: '',
                email: '',
                contact_number: '',
                websites: ''
            },
            redirect: false

        }
    }
    /** Get the post details and bid list from the database on page load */
    componentDidMount() {
        axios.all([
            axios.get('/post/detail/' + this.props.match.params.id),
            axios.get('/post/detail/bid/' + this.props.match.params.id)
        ])
            .then(([postListResponse, bidListResponse]) => {
                this.setState({
                    user_id: postListResponse.data.user_id,
                    post_title: postListResponse.data.post_title,
                    post_description: postListResponse.data.post_description,
                    post_catagories: postListResponse.data.post_catagories,
                    post_budget: postListResponse.data.post_budget,
                    post_address: postListResponse.data.address + ", "
                        + postListResponse.data.city + ", "
                        + postListResponse.data.postal_code + ", "
                        + postListResponse.data.province + ", "
                        + postListResponse.data.country,
                    confirm_freelancer: postListResponse.data.confirm_freelancer
                });
                /** Display the confimation panel if the freelancer is confirmed of the post */
                if (this.state.confirm_freelancer !== null) {
                    this.getuserProfile(this.state.confirm_freelancer);
                    document.getElementById("additionalpanel").style.display = "none";
                    document.getElementById("showbids").style.display = "none";
                    document.getElementById("confirmedPanel").style.display = "block";
                }else{
                    this.getuserProfile(this.state.user_id);
                }
                /** Hide the biding panel from employer, to Protect them from biding on there own post */
                if (this.props.auth.user.id === this.state.user_id) {
                    document.getElementById("bidPanel").style.visibility = "hidden";
                }
                this.setState({
                    list_of_bids: bidListResponse.data,
                    number_of_bids: bidListResponse.data.length
                });
               
            })
            .catch(error => {
                console.log(error);
            });
    }
    /** Display the user profile details on the profile card */
    getuserProfile(user_id) {
        axios.get('/users/userprofile/' + user_id)
            .then(response => {
                this.setState({
                    employer_details: {
                        user_id: response.data.user_id,
                        full_name: response.data.full_name,
                        work_title: response.data.work_title,
                        work_catagorie: response.data.work_catagorie,
                        email: response.data.email,
                        contact_number: response.data.contact_number,
                        websites: response.data.websites
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /** Show the list of all freelancers bid on the post */
    postBidList() {
        return this.state.list_of_bids.map(bid =>
            <div class="card p-lg-2 m-2" key={bid._id}>
                <div class="row pl-4">
                    <div class="col"><Link to={"/viewprofile/" + bid.user_id}>{bid.username}</Link></div>
                    <div class="col">${bid.bid_amount}</div>
                    <div class="col">
                        {(this.props.auth.user.id === this.state.user_id) ?
                            (<button className="btn btn-primary" onClick={() => this.confirmedFreelancerRequest(bid.user_id)} >Hire Me</button>
                            ) : (<p></p>)}
                    </div>
                </div>
            </div>
        )
    }
    /** Send the confirmation of the freelancer to server when employer click on HIRE ME button to hire a freelancer */
    confirmedFreelancerRequest(freelancer_id) {
        const requestData = {
            confirm_freelancer: freelancer_id
        };
        axios.post('/post/confirm/' + this.props.match.params.id, requestData)
            .then(res => {
                console.log(res.data);
                if (!alert('Freelancer Confirmed !')) { window.location.reload(); }
            }).catch(function (error) {
                console.log(error.response.data);
            });
    }
    /** Handle input button onchange event when user change the value in inputbox*/
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    /** handle submit button event to place a bid on the post for freelancer users */
    onSubmit(e) {
        e.preventDefault();
        const newPostBid = {
            username: this.props.auth.user.username,
            bid_amount: this.state.bid_amount,
            user_id: this.props.auth.user.id
        };
        // send a new post request to create new bid on post by freelancer
        axios.post('/post/detail/' + this.props.match.params.id + '/bid', newPostBid)
            .then(res => {
                if (res.status === 200) {
                    this.setState({ bid_amount: res.data.bid_amount });
                }
                axios.get('/post/detail/bid/' + this.props.match.params.id)
                    .then(response => {
                        this.setState({ list_of_bids: response.data });
                    })
            }).catch(function (error) {
                console.log(error.response.data);
            });
    }
    render() {
        return (
            <div className="container">
                <div><Link to="/browse" className="btn-flat">
                    <i class="fas fa-arrow-left"></i> Back to Browse
                </Link>
                    <div className="h1">{this.state.post_title} </div>
                    <p><mark>{this.state.post_catagories}</mark> | Address: {this.state.post_address} | <strong> ${this.state.post_budget}</strong></p>
                    <p>{this.state.post_description}</p>
                </div>
                <div class="row" id="additionalpanel" >
                    <div class="card col ml-3 mr-5">
                        <div class="view overlay mt-2 ">
                            <h6>About the Employer</h6>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title"><i class="fas fa-user-tie mr-2 "></i><Link to={"/viewprofile/" + this.state.employer_details.user_id}>{this.state.employer_details.full_name}</Link></h4>
                            <h6>{this.state.employer_details.work_title}</h6>
                            <small class="badge badge-primary badge-pill p-2"><i class="fas fa-tag mr-2" style={{ color: "white" }}></i>{this.state.employer_details.work_catagorie}</small>
                            <p><i class="fas fa-envelope mr-2"></i>  {this.state.employer_details.email}</p>
                            <p><i class="fas fa-phone mr-2"></i>{this.state.employer_details.contact_number}</p>
                            <p><i class="fas fa-globe-americas mr-2"></i>{this.state.employer_details.websites}</p>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-7 input_bid_amount pl-lg-5" id="bidPanel">
                        <form onSubmit={this.onSubmit}>
                            <h3>Place a Bid on this Project</h3>
                            <h6 class="mt-4">Bid Details</h6>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">$</span>
                                </div>
                                <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)" name="bid_amount"
                                    value={this.state.bid_amount}
                                    onChange={this.onChange} />
                                <div class="input-group-append">
                                    <span class="input-group-text">.00</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">PLace Bid</button>
                        </form>
                    </div>
                </div>
                <div id="confirmedPanel">
                    <div class="card col-lg-4">
                        <div class="view overlay mt-2">
                            <h6><i class="far fa-check-circle pr-1 fa-2x" style={{ color: "orange" }}></i>About the Confirmed Freelancer</h6>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title"><i class="fas fa-user-tie mr-2 "></i><Link to={"/viewprofile/" + this.state.employer_details.user_id}>{this.state.employer_details.full_name}</Link></h4>
                            <h6>{this.state.employer_details.work_title}</h6>
                            <small class="badge badge-primary badge-pill p-2"><i class="fas fa-tag mr-2" style={{ color: "white" }}></i>{this.state.employer_details.work_catagorie}</small>
                            <p><i class="fas fa-envelope mr-2"></i>  {this.state.employer_details.email}</p>
                            <p><i class="fas fa-phone mr-2"></i>{this.state.employer_details.contact_number}</p>
                            <p><i class="fas fa-globe-americas mr-2"></i>{this.state.employer_details.websites}</p>
                        </div>
                    </div>
                </div>
                <div id="showbids" >
                    <h5 className="mt-3">Freelancer Bids on this Post ({this.state.number_of_bids})</h5>
                    <div>{this.postBidList()}</div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(ViewPost);