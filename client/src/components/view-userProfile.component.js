import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Rating from 'react-rating';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export class ReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: ""
        };
    }
    componentDidMount() {
        axios.get('/users/userprofile/' + this.props.item.reviewer_id)
            .then(response => {
                this.setState({ full_name: response.data.full_name });
            }).catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="card p-lg-2 m-2" key={this.props.item._id}>
                <div class="card-body">
                    <h4 class="card-title"><Link to={"/viewprofile/" + this.props.item.reviewer_id}>{this.state.full_name}</Link></h4>
                    <p class="card-text">{this.props.item.comment}</p>
                    <div className="d-flex flex-row">Rating: <Rating id="ratingStar" emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x" initialRating={this.props.item.rating} readonly /><h4 className="ml-2">({this.props.item.rating})</h4> </div>

                </div>
            </div>
        );
    }
}

class ViewUserProfile extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
        this.state = {
            profile_id: this.props.match.params.id,
            user_id: '',
            full_name: '',
            work_title: '',
            description: '',
            work_catagorie: '',
            email: '',
            contact_number: '',
            websites: '',
            profile_photo: '',
            rating: 0,
            feedback: "",
            list_of_reviews: [],
            reviewer_name: "",
            review_count: 0
        };
    }
    componentDidMount() {
        axios.all([
            axios.get('/users/userprofile/' + this.props.match.params.id),
            axios.get('/users/userprofile/review/' + this.props.match.params.id)
        ])
            .then(([profileResponse, reviewResponse]) => {
                this.setState({
                    full_name: profileResponse.data.full_name,
                    work_title: profileResponse.data.work_title,
                    description: profileResponse.data.description,
                    work_catagorie: profileResponse.data.work_catagorie,
                    email: profileResponse.data.email,
                    contact_number: profileResponse.data.contact_number,
                    websites: profileResponse.data.websites,
                    profile_photo: profileResponse.data.profile_photo,
                    list_of_reviews: reviewResponse.data,
                    review_count: reviewResponse.data.length
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleClick(event) {
        this.setState({ rating: event });
    }
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            user_id: this.state.profile_id,
            comment: this.state.feedback,
            rating: this.state.rating,
            reviewer_id: this.props.auth.user.id
        }
        console.log(obj);
        axios.post('/users/feedback/review', obj)
            .then(response => {
                axios.get('/users/userprofile/review/' + this.props.match.params.id)
                    .then(resp => {
                        this.setState({ list_of_reviews: resp.data });
                    });
                store.addNotification({
                    title: 'Review Status',
                    message: response.data,
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
            });
    }
    goBack(){
        this.props.history.goBack();
    }
    render() {
        const { rating } = this.state;
        return (
            <div class="container py-4 my-2">
                <div className="mb-lg-5 mb-2 btn-link" onClick={this.goBack}>
                    <i class="fas fa-arrow-left"></i> Back to Browse
                </div>
                <div class="row">
                    <div class="col-md-4 pr-md-5">
                        <img class="w-100 rounded border rounded-circle" src="https://img.icons8.com/plasticine/2x/user.png" alt="Profile" />
                        <div class="pt-4 mt-2">
                            <section class="mb-4 pb-1">
                                <h3 class="h6 font-weight-light text-secondary text-uppercase">Catagories</h3>
                                <div class="pt-2">
                                    <div class="mb-4">
                                        <strong class="h5 d-block text-secondary font-weight-bold mb-1">{this.state.work_catagorie}</strong>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="d-flex align-items-center">
                            <h2 class="font-weight-bold m-0">
                                {this.state.full_name}
                            </h2>
                            <address class="m-0 pt-2 pl-0 pl-md-4 font-weight-light text-secondary">
                                <i class="fa fa-map-marker mr-lg-2"></i>
                                Hamilton, ON
                            </address>
                        </div>
                        <p class="h5 text-primary mt-2 d-block font-weight-light">
                            {this.state.work_title}
                        </p>
                        <p class="lead mt-4">{this.state.description}</p>
                        <section class="d-flex mt-5">
                            <button class="btn btn-light bg-transparent mr-3 mb-3">
                                <i class="fas fa-envelope mr-2"></i>  {this.state.email}
                            </button>
                            <button class="btn btn-light bg-transparent mr-3 mb-3">
                                <i class="fas fa-phone mr-2"></i>{this.state.contact_number}
                            </button>
                            <button class="btn btn-primary mb-3">
                                <i class="fas fa-globe-americas mr-2"></i>{this.state.websites}
                            </button>
                        </section>
                        <section className="mt-4">
                            <h3 class="h6 font-weight-light text-secondary text-uppercase">Rate and Review</h3>
                            <form onSubmit={this.onSubmit} class="bg-light p-2">
                                <div className="form-group">
                                    <label for="ratingStar">Ratings: </label>
                                    <Rating id="ratingStar" onClick={this.handleClick} emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x" initialRating={rating} />
                                </div>
                                <div className="form-group">
                                    <label for="feedback">Feedback: </label>
                                    <textarea type="text"
                                        id="feedback"
                                        className="form-control"
                                        name='feedback'
                                        value={this.state.feedback}
                                        onChange={this.onChange}
                                        placeholder="Feedback"
                                    />
                                </div>
                                <input type="submit" value="Review Post" className="btn btn-primary" />
                            </form>
                        </section>
                        <section className="mt-4">
                            <h5>Reviews ({this.state.review_count})</h5>
                            {this.state.list_of_reviews.map(review =>
                                <ReviewList item={review} key={review._id} />
                            )}
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(ViewUserProfile);
