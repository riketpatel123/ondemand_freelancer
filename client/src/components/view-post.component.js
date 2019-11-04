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
                console.log(bidListResponse.data);
                this.setState({ list_of_bids: bidListResponse.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
    postBidList(){
        return this.state.list_of_bids.map(bid =>
            <div class="row" key={bid._id}>
                <div class="col">@{bid.username}</div>
                <div class="col">${bid.bid_amount}</div>
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
            bid_amount: this.state.bid_amount
        };
        axios.post('/post/detail/' + this.props.match.params.id + '/bid', newPostBid)
            .then(res => {
                if (res.status === 200) {
                    this.setState({ bid_amount: res.data.bid_amount });
                }
                axios.get('/post/detail/bid/' + this.props.match.params.id)
                .then(response=>{
                    this.setState({ list_of_bids: response.data });
                })
            }).catch(function (error) {
                console.log(error.response.data);
            });
    }
    render() {
        return (
            <div className="container">
                <div><Link to="/browse" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to Browse
                </Link>
                    <div className="h1">{this.state.post_title} </div>
                    <p><mark>{this.state.post_catagories}</mark> | Address: {this.state.post_address} | <strong> ${this.state.post_budget}</strong></p>
                    <p>{this.state.post_description}</p>
                </div>
                <div class="row">
                    <div class="col-8">
                        <h4>@Employer details</h4>
                    </div>
                    <div class="col-4 input_bid_amount">
                        <form onSubmit={this.onSubmit}>
                            <h3>@{this.props.auth.user.username}</h3>
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
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                {this.postBidList()}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(ViewPost);