import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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
                        + postListResponse.data.country
                });
                this.setState({
                    list_of_bids: bidListResponse.data,
                    number_of_bids: bidListResponse.data.length
                });
                axios.get('/users/userprofile/' + this.state.user_id)
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
            })
            .catch(error => {
                console.log(error);
            });
    }
    postBidList() {
        return this.state.list_of_bids.map(bid =>
            <div class="card p-lg-2 m-2" key={bid._id}>
                <div class="row pl-4">
                    <div class="col"><Link to={"/viewprofile/" + bid.user_id}>{bid.username}</Link></div>
                    <div class="col">${bid.bid_amount}</div>
                    <div class="col"><button className="btn btn-primary">Hire Me</button></div>
                </div>
            </div>
        )
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const newPostBid = {
            username: this.props.auth.user.username,
            bid_amount: this.state.bid_amount,
            user_id: this.props.auth.user.id
        };
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
                <div class="row">
                    <div class="card col ml-3 mr-5">
                        <div class="view overlay mt-2 ">
                            <h6>About the Employer</h6>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title"><i class="fas fa-user-tie mr-2 "></i><Link to={"/viewprofile/" + this.state.employer_details.user_id}>{this.state.employer_details.full_name}</Link></h4>
                            <h6>{this.state.employer_details.work_title}</h6>
                            <small class="badge badge-primary badge-pill p-2">{this.state.employer_details.work_catagorie}</small>
                            <p><i class="fas fa-envelope mr-2"></i>  {this.state.employer_details.email}</p>
                            <p><i class="fas fa-phone mr-2"></i>{this.state.employer_details.contact_number}</p>
                            <p><i class="fas fa-globe-americas mr-2"></i>{this.state.employer_details.websites}</p>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-7 input_bid_amount pl-lg-5">
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
                <h5 className="mt-3">Freelancer Bids on this Post ({this.state.number_of_bids})</h5>
                <div>{this.postBidList()}</div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(ViewPost);