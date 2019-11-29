import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**Landing page of the website */
export default class Home extends Component {
    render() {
        return (
            <main>
                <header>
                    <div class="container-fluid d-flex align-items-center justify-content-center h-100 " style={{ background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)" }} >
                        <div class="row d-flex justify-content-center text-center" style={{ height: "550px", width: "100%" }}>
                            <div class="col-md-10">
                                <h2 class="display-4 font-weight-bold text-dark pt-5 mb-2">Modern Solution For Skill Worker</h2>
                                <h6>The talent you need. The flexibility you want.</h6>
                            </div>
                            <div className="col-lg-5 col-md-5">
                                <Link
                                    to="/register"
                                    style={{
                                        width: "200px",
                                        height: "40px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px"
                                    }}
                                    className="btn btn-primary"
                                >Post a Job</Link>
                            </div>
                            <div className="col-lg-5 col-md-5">
                                <Link
                                    to="/register"
                                    style={{
                                        width: "200px",
                                        height: "40px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px"
                                    }}
                                    className="btn btn-primary">Want a Job</Link>
                            </div>
                        </div>

                    </div>
                </header>
                <div class="container-lg mt-5">
                    <section class="text-center">
                        <h2 class="mb-5 font-weight-bold">Need Work Done?</h2>
                        <div class="row d-flex justify-content-center mb-4">
                            <div class="col-md-8">
                                <p class="grey-text">Get your work done Faster, Better, and Cheaper</p>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 mb-5">
                                <i class="far fa-list-alt fa-4x blue-text"></i>
                                <h4 class="my-4 font-weight-bold">Post a job</h4>
                                <p class="grey-text">Tell us about your project.
                                We connects you with top freelancers and agencies around the world, or near you.</p>
                            </div>

                            <div class="col-md-4 mb-1">
                                <i class="fas fa-list-ol fa-4x blue-text"></i>
                                <h4 class="my-4 font-weight-bold">Bids come to you</h4>
                                <p class="grey-text">Get qualified proposals within 24 hours.
                                Compare bids, reviews, and prior work.
                                 Interview favorites.</p>
                            </div>

                            <div class="col-md-4 mb-1">
                                <i class="fas fa-user-check fa-4x blue-text"></i>
                                <h4 class="my-4 font-weight-bold">Hire Experts</h4>
                                <p class="grey-text">Hire the Experts that works best for you</p>
                            </div>

                        </div>

                    </section>
                    <section>
                        <h2 class="mb-5 font-weight-bold text-center">Popular Categories</h2>

                        <div class="row">
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-tools fa-3x mb-lg-3 p-3 " style={{ background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)" }}></i>
                                    <h6 className="p-2">Automotive</h6>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-calculator fa-3x p-3 mb-lg-3" style={{ background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)" }}></i>
                                    <h6 className="p-2">Accounting/ Finanace</h6>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-hammer fa-3x p-3 mb-lg-3" style={{ background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)" }}></i>
                                    <h6 className="p-2">Construction/ Facilities</h6>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3  text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-users-cog fa-3x p-3 mb-lg-3" style={{ background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)" }}></i>
                                    <h6 className="p-2">Customer Service</h6>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-user-md fa-3x p-3 mb-lg-3" style={{ background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)" }}></i>
                                    <h6 className="p-2">Healthcare</h6>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-magic  fa-3x p-3 mb-lg-3" style={{ background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)" }}></i>
                                    <h6 className="p-2">Desgin, Art &amp; Multimedia </h6>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-warehouse fa-3x p-3 mb-lg-3" style={{ background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)" }}></i>
                                    <h6 className="p-2">Warehouse</h6>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-utensils fa-3x p-3 mb-lg-3" style={{ background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)" }}></i>
                                    <h6 className="p-2">Restaurant / Food Service</h6>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <footer class="page-footer font-small unique-color-dark">
                    <div class="primary-color">
                        <div class="container-lg">
                            <div class="row py-4 d-flex align-items-center">
                                <div class="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                                    <h6 class="mb-0 white-text">Get connected with us on social networks!</h6>
                                </div>
                                <a class="fb-ic ml-0">
                                    <i class="fab fa-facebook fa-2x white-text mr-4"> </i>
                                </a>
                                <a class="gplus-ic">
                                    <i class="fab fa-google-plus fa-2x white-text mr-4"> </i>
                                </a>
                                <a class="li-ic">
                                    <i class="fab fa-linkedin fa-2x white-text mr-4"> </i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="container-lg mt-5 mb-4 text-center text-md-left">
                        <div class="row mt-3">
                            <div class="col-md-3 col-lg-4 col-xl-3 mb-4">
                                <h6 class="text-uppercase font-weight-bold">
                                    <strong>Freelancer</strong>
                                </h6>
                                <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                                <p>Freelancer work portal help you to find work</p>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase font-weight-bold">
                                    <strong>Useful links</strong>
                                </h6>
                                <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                                <p>
                                    <Link to="/browse">Browse</Link>
                                </p>
                                <p>
                                    <Link to="/ondemand">Ondemand Worker</Link>
                                </p>
                                <p>
                                    <Link to="/about">About</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="footer-copyright text-center py-3">© 2019 Copyright: Riket Patel</div>
                </footer>
            </main>
        )
    }
}
