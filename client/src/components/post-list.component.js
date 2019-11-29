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
        this.aceSort = this.aceSort.bind(this);
    }
    /** GET List of all the job post create by different employers */
    componentDidMount() {
        axios.get("/post/")
            .then(response => {
                this.setState({ list_of_posts: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /** Sort the list by title in acending order */
    aceSort(event, sortKey) {
        const list_of_posts = this.state.list_of_posts;
        list_of_posts.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({ list_of_posts })
    }
    /** Method to Delete Work Post */
    deletePost(post_id) {
        axios.get('/post/delete/' + post_id)
            .then(response => {
                this.componentDidMount();
            })
            .catch(err => console.log(err));
    }
    /** Method to list the work post */
    postList() {
        var isAdmin = (this.props.auth.user.user_type === "Admin");
        return this.state.list_of_posts.map(post =>
            <div class="card row post_items m-2" key={post._id}>
                <div class="col-md-12">
                    <div class="bg-white p-4 d-block d-md-flex align-items-center">
                        <div class="mb-4 mb-md-0 mr-5">
                            <div class="d-flex align-items-center row">
                                <h2 class="mr-3 text-black"><Link to={"/view/" + post._id}>{post.post_title}</Link></h2>
                                <div class="ml-lg-4">Budget: <i class="fas fa-dollar-sign ml-1 fa-1x"></i>{post.post_budget}</div>
                            </div>
                            <div class="d-block d-md-flex row">
                                <div id="description" className="overflow ellipsis">{post.post_description}</div>
                            </div>
                            <div className="mt-2">
                                <span class="badge badge-primary badge-pill p-2 mr-2">
                                    <i class="fas fa-tag mr-2" style={{ color: "white" }}></i>{post.post_catagories}
                                </span>
                                <i class="fas fa-map-marker-alt"></i><span> {post.province}, {post.country}</span>
                            </div>
                        </div>
                        <div class="ml-auto d-flex text-center">
                            <Moment format="DD/MM/YYYY" className="mr-2">{post.post_date}</Moment>
                            <div>
                                {(this.props.auth.user.id !== post.user_id) ? (<Link to={"/view/" + post._id} className="btn btn-dark mr-2">Bid Now</Link>) : (<p></p>)}
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
                <div className="d-flex flex-row">
                    <h6 className="mb-3">Freelancer  > Browse All Posts </h6>
                    <p className="ml-auto border" onClick={e => this.aceSort(e, 'post_title')}>Sort by A-Z <i class="fas fa-caret-down ml-1"></i></p>
                </div>
                {this.postList()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(ShowPostList);
