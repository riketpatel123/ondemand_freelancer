import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import axios from 'axios';
import Moment from 'react-moment';

class ShowMyPostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_of_posts: [],
            postMessage: ''
        };
    }
    componentDidMount() {
        const userObj = {
            user_id: this.props.auth.user.id
        };
        axios.post("/post/view/", userObj)
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
                const userObj = {
                    user_id: this.props.auth.user.id,
                };
                axios.post("/post/view/", userObj)
                    .then(response => {
                        this.setState({
                            postMessage: 'Post Deleted',
                            list_of_posts: response.data
                        });
                    })
            })
            .catch(err => console.log(err));
    }
    postList() {
        return this.state.list_of_posts.map(post =>
            <div class="card row post_items m-2" key={post._id}>
                <div class="col-md-12">
                    <div class="bg-white p-4 d-block d-md-flex align-items-center">
                        <div class="mb-4 mb-md-0 mr-5">
                            <div class="d-flex align-items-center">
                                <h2 class="mr-3 text-black h3"><Link to={"/view/" + post._id}>{post.post_title}</Link></h2>
                                <div class="badge-wrap">
                                    <span class="bg-primary text-white badge">{post.post_catagories}</span>
                                </div>
                                <div class="ml-4">${post.post_budget}</div>
                            </div>
                            <div class="d-block d-md-flex">
                                <div class="mr-3 overflow ellipsis"><span class="icon-layers"></span>{post.post_description} </div>
                                <div><i class="fa fa-map-marker"></i><span> {post.province}, {post.country}</span></div>
                            </div>
                        </div>
                        <div class="ml-auto d-flex">
                            <Moment format="DD/MM/YYYY" className="mr-2">{post.post_date}</Moment>
                            <div><Link to={"/update/" + post._id} className="btn btn-primary mr-2">Edit</Link>
                            <button onClick={() => this.deletePost(post._id)} className="btn btn-danger">Delete</button></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="container">
                <h6>Freelancer > My Job Posts</h6>
                {this.postList()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(ShowMyPostList);