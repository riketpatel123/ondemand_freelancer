import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";

import axios from 'axios';
import Moment from 'react-moment';

class ShowPostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_of_posts: [],
            isLoading: true
        };
    }
    componentDidMount() {
        axios.get("/post/")
            .then(response => {
                this.setState({ list_of_posts: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /**User Logout */
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    deletePost(post_id) {
        axios.get('/post/delete/' + post_id)
            .then(response => {
                this.componentDidMount();
            })
            .catch(err => console.log(err));
    }
    postList() {
        var isAdmin = (this.props.auth.user.user_type === "Admin");
        return this.state.list_of_posts.map(post =>
            <div class="card row post_items m-2" key={post._id}>
                <div class="col-md-12">
                    <div class="bg-white p-4 d-block d-md-flex align-items-center">
                        <div class="mb-4 mb-md-0 mr-5">
                            <div class="d-flex align-items-center">
                                <h2 class="mr-3 text-black"><Link to={"/view/" + post._id}>{post.post_title}</Link></h2>
                                <span class="badge badge-primary badge-pill p-2">{post.post_catagories}</span>
                                <div class="ml-lg-4"><i class="far fa-money-bill-alt"></i> {post.post_budget}</div>
                            </div>
                            <div class="d-block d-md-flex">
                                <p class="mr-3 overflow ellipsis">{post.post_description} </p>
                            </div>
                            <div><i class="fas fa-map-marker-alt"></i><span> {post.province}, {post.country}</span></div>
                        </div>
                        <div class="ml-auto d-flex text-center">
                            <Moment format="DD/MM/YYYY" className="mr-2">{post.post_date}</Moment>
                            <div><Link to={"/view/" + post._id} className="btn btn-dark mr-2">Bid Now</Link>
                                {isAdmin ? (
                                    <button onClick={() => this.deletePost(post._id)} className="btn btn-danger ml-1">Delete</button>
                                ) : (<p></p>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="container">
                <h6 className="mb-3">Freelancer  > Browse All Jobs </h6>
                {this.postList()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(ShowPostList);
