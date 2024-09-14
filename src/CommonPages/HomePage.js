import React from 'react';
import './HomePage.css'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

const HomePage = () => {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');  // Redirect to Login page
    };

    const handleSignupClick = () => {
        navigate('/signup');  // Redirect to Signup page
    };

    return (
        <div>
            <header className="header bg-white py-3 shadow-sm">
                <div className="container">
                    <div className="navbar d-flex justify-content-between align-items-center">
                        <div className="nav-logo">
                            <h2 className="text-primary">Telecomm Service</h2>
                        </div>
                        <div className="nav-buttons">
                            <button className="btn btn-primary me-2" onClick={handleLoginClick}>Login</button>
                            <button className="btn btn-outline-primary" onClick={handleSignupClick}>Signup</button>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <div className="hero-section bg-primary text-white text-center py-5">
                    <h1 className="display-4">Telecomm Service Provisioning</h1>
                    <p className="lead">Your trusted partner in providing seamless telecom services.</p>
                    <button className="btn btn-warning btn-lg mt-3">Learn More</button>
                </div>

                <div className="container my-5">
                    <div className="row">
                        <div className="col">
                            <h2 className="text-center text-primary mb-4">Our Services</h2>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col">
                            <div id="serviceCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#serviceCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#serviceCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#serviceCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner shadow-lg">
                                    <div className="carousel-item active">
                                        <img src="highSpeedInternet.jpg" className="d-block w-100" alt="High-speed Internet" />
                                        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
                                            <h3>High-speed Internet</h3>
                                            <p>Experience blazing fast internet with our reliable broadband services.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="cableTvService.png" className="d-block w-100" alt="Cable TV" />
                                        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
                                            <h3>Cable TV</h3>
                                            <p>Enjoy hundreds of channels with crystal clear picture quality.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="homePhone.png" className="d-block w-100" alt="Home Phone" />
                                        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
                                            <h3>Home Phone</h3>
                                            <p>Stay connected with family and friends with our unlimited calling plans.</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#serviceCarousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#serviceCarousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="footer bg-dark text-white pt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>About Us</h5>
                            <p>We are a leading provider of telecom services, offering a wide range of internet, TV, and phone solutions to suit your needs.</p>
                        </div>
                        <div className="col-md-4">
                            <h5>Contact</h5>
                            <ul className="list-unstyled">
                                <li>Email: support@telecomm.com</li>
                                <li>Phone: +1-800-123-4567</li>
                                <li>Address: 123 Telecom St, City, Country</li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Follow Us</h5>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="#" className="text-white">Facebook</a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="text-white">Twitter</a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="text-white">Instagram</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col text-center">
                            <p>&copy; 2024 Telecomm Service. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
