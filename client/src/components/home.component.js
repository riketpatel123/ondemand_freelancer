import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <main>
                <header>
                    <div class="container-fluid d-flex align-items-center justify-content-center h-100 " style={{background:"linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)"}} >
                        <div class="row d-flex justify-content-center text-center" style={{ height: "550px", width: "100%" }}>
                            <div class="col-md-10">
                                <h2 class="display-4 font-weight-bold text-dark pt-5 mb-2">Modern Solution For Skill Worker</h2>
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
                                >Post a Work</Link>
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
                                    className="btn btn-primary">Want a Work</Link>
                            </div>
                        </div>

                    </div>
                </header>
                <div class="container">
                    <section class="text-center">

                        <h2 class="mb-5 font-weight-bold">How It Works</h2>

                        <div class="row d-flex justify-content-center mb-4">

                            <div class="col-md-8">

                                <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi voluptate
                                                            hic
                                                            provident nulla repellat
                                                            facere esse molestiae ipsa labore porro minima quam quaerat rem, natus repudiandae debitis
                                                            est
    sit pariatur.</p>

                            </div>

                        </div>

                        <div class="row">

                            <div class="col-md-4 mb-5">
                                <i class="fa fa-camera-retro fa-4x orange-text"></i>
                                <h4 class="my-4 font-weight-bold">Experience</h4>
                                <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit
                                    maiores nam,
                                    aperiam minima
    assumenda deleniti hic.</p>
                            </div>

                            <div class="col-md-4 mb-1">
                                <i class="fa fa-heart fa-4x orange-text"></i>
                                <h4 class="my-4 font-weight-bold">Happiness</h4>
                                <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit
                                    maiores nam,
                                    aperiam minima
    assumenda deleniti hic.</p>
                            </div>

                            <div class="col-md-4 mb-1">
                                <i class="fa fa-bicycle fa-4x orange-text"></i>
                                <h4 class="my-4 font-weight-bold">Adventure</h4>
                                <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit
                                    maiores nam,
                                    aperiam minima
    assumenda deleniti hic.</p>
                            </div>

                        </div>

                    </section>
                    <section>
                        <h2 class="mb-5 font-weight-bold text-center">Popular Categories</h2>

                        <div class="row">
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-tools fa-3x mb-lg-3 p-3 " style={{background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)"}}></i>
                                    <h6 className="p-2">Automotive</h6>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-calculator fa-3x p-3 mb-lg-3" style={{background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)"}}></i>
                                    <h6 className="p-2">Accounting/ Finanace</h6>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-hammer fa-3x p-3 mb-lg-3" style={{background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)"}}></i>
                                    <h6 className="p-2">Construction/ Facilities</h6>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3  text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-users-cog fa-3x p-3 mb-lg-3" style={{background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)"}}></i>
                                    <h6 className="p-2">Customer Service</h6>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-user-md fa-3x p-3 mb-lg-3" style={{background:"linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)"}}></i>
                                    <h6 className="p-2">Healthcare</h6>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-magic  fa-3x p-3 mb-lg-3" style={{background:"linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)"}}></i>
                                    <h6 className="p-2">Desgin, Art &amp; Multimedia </h6>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-warehouse fa-3x p-3 mb-lg-3" style={{background:"linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)"}}></i>
                                    <h6 className="p-2">Warehouse</h6>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 text-center mb-4">
                                <div className="card">
                                    <i class="fas fa-utensils fa-3x p-3 mb-lg-3" style={{background:"linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)"}}></i>
                                    <h6 className="p-2">Restaurant / Food Service</h6>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <footer class="page-footer font-small unique-color-dark">
                    <div class="primary-color">
                        <div class="container">
                            <div class="row py-4 d-flex align-items-center">

                                <div class="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                                    <h6 class="mb-0 white-text">Get connected with us on social networks!</h6>
                                </div>
                                <a class="fb-ic ml-0">
                                    <i class="fab fa-facebook white-text mr-4"> </i>
                                </a>
                                <a class="gplus-ic">
                                    <i class="fab fa-google-plus white-text mr-4"> </i>
                                </a>
                                <a class="li-ic">
                                    <i class="fab fa-linkedin white-text mr-4"> </i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="container mt-5 mb-4 text-center text-md-left">
                        <div class="row mt-3">

                            <div class="col-md-3 col-lg-4 col-xl-3 mb-4">
                                <h6 class="text-uppercase font-weight-bold">
                                    <strong>Company name</strong>
                                </h6>
                                <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                                <p>Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit
                        amet, consectetur adipisicing elit.</p>
                            </div>

                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase font-weight-bold">
                                    <strong>Useful links</strong>
                                </h6>
                                <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                                <p>
                                    <a href="#!">Browse</a>
                                </p>
                                <p>
                                    <a href="#!">Ondemand Worker</a>
                                </p>
                                <p>
                                    <a href="#!">About</a>
                                </p>
                                <p>
                                    <a href="#!">Help</a>
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
