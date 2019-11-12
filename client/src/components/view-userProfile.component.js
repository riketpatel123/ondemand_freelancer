import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from "react-redux";

class ViewUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            full_name: '',
            work_title: '',
            description: '',
            work_catagorie: '',
            email: '',
            contact_number: '',
            websites: '',
            profile_photo: '',
            redirect: false,
        }
    }
    componentDidMount() {
        axios.get('/users/userprofile/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    full_name: response.data.full_name,
                    work_title: response.data.work_title,
                    description: response.data.description,
                    work_catagorie: response.data.work_catagorie,
                    email: response.data.email,
                    contact_number: response.data.contact_number,
                    websites: response.data.websites,
                    profile_photo: response.data.profile_photo,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/browse' />;
        }
        return (
            <div class="container py-4 my-2">
                <div class="row">
                    <div class="col-md-4 pr-md-5">
                        <img class="w-100 rounded border" src="https://img.icons8.com/plasticine/2x/user.png" />
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
                            <h3 class="h6 font-weight-light text-secondary text-uppercase">Reviews</h3>

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