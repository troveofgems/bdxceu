import React from "react";
import {AuthenticationModal} from "../Authentication/Authentication";

import "./Landing.css";
import NavigationBar from "../shared/Navigation/Navigation";
import SiteFooter from "../shared/Footer/Footer";
export const Landing = () => {
    return (
        <>
            <NavigationBar/>
            <section id="home" className="parallax-section shadowOverlay">
                <div className="container">
                    <div className="row">
                        <div className="col-md-offset-1 col-md-10 col-sm-12">
                            <h3 className="wow bounceIn" data-wow-delay="0.9s">Hello! welcome to</h3>
                            <h1 className="wow fadeInUp" data-wow-delay="1.6s"><br/>BodyDynamix Integrated Sports
                                Medicine <strong>CEU</strong> Courses</h1>
                            <AuthenticationModal modalType={"registration"}/>
                        </div>
                    </div>
                </div>
            </section>
            <section id="overview" className="parallax-section">
                <div className="container">
                    <div className="row">

                        <div className="col-md-6 col-sm-12">
                            <img src="images/overview-img.jpg" className="img-responsive" alt="Overview"/>
                            <blockquote className="wow fadeInUp" data-wow-delay="1.9s">BodyDynamix offers Chiropractic
                                and Physical Therapy Classes offered by the best professionals! Sign up today
                                to kickstart your career and learn with us!
                            </blockquote>
                        </div>

                        <div className="col-md-1"></div>

                        <div className="wow fadeInUp col-md-4 col-sm-12" data-wow-delay="1s">
                            <div className="overview-detail">
                                <h2>About BodyDynamix</h2>
                                <p>
                                    BodyDynamix is the number one Sports Medical, Physical Therapy, Sports Chiropractic,
                                    Recovery & Massage Therapy center in the greater Los Angeles area. We work with
                                    every kind of patient, from elite athletes to weekend warriors. We strive to be the
                                    best and give you the best, utilizing the most advanced and effective therapeutic
                                    options for healing faster and better recovery.
                                </p>
                                <a href="#trainer" className="btn btn-default smoothScroll">Let us begin</a>
                            </div>
                        </div>

                        <div className="col-md-1"></div>

                    </div>
                </div>
            </section>
            <section id="trainer" className="parallax-section">
                <div className="container">
                    <div className="row">
                        <div className="wow fadeInUp col-md-12 col-sm-12" data-wow-delay="1.3s">
                            <h2>Our Chiropractic Team</h2>
                            <p>Lorem ipsum dolor sit amet, maecenas eget vestibulum justo.</p>
                        </div>
                        <div className="wow fadeInUp col-md-4 col-sm-6" data-wow-delay="1.9s">
                            <div className="trainer-thumb">
                                <img src="images/anon_profile.png" className="img-responsive" alt="Trainer"/>
                                <div className="trainer-overlay">
                                    <div className="trainer-des">
                                        <h2>Beau Daniels</h2>
                                        <h3>D.C.</h3>
                                        <ul className="social-icon">
                                            <li><a href="#" className="fa fa-facebook wow fadeInUp"
                                                   data-wow-delay="1s"></a></li>
                                            <li><a href="#" className="fa fa-twitter wow fadeInUp"
                                                   data-wow-delay="1.3s"></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, maecenas eget vestibulum justo imperdiet, wisi risus purus
                                augue vulputate.</p>
                        </div>
                        <div className="wow fadeInUp col-md-4 col-sm-6" data-wow-delay="2s">
                            <div className="trainer-thumb">
                                <img src="images/anon_profile.png" className="img-responsive" alt="Trainer"/>
                                <div className="trainer-overlay">
                                    <div className="trainer-des">
                                        <h2>Eddie Stanislawski</h2>
                                        <h3>D.C., CSCS, DACBSP</h3>
                                        <ul className="social-icon">
                                            <li><a href="#" className="fa fa-facebook wow fadeInUp"
                                                   data-wow-delay="1s"></a></li>
                                            <li><a href="#" className="fa fa-twitter wow fadeInUp"
                                                   data-wow-delay="1.3s"></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, maecenas eget vestibulum justo imperdiet, wisi risus purus
                                augue vulputate.</p>
                        </div>
                        <div className="wow fadeInUp col-md-4 col-sm-6" data-wow-delay="2.3s">
                            <div className="trainer-thumb">
                                <img src="images/anon_profile.png" className="img-responsive" alt="Trainer"/>
                                <div className="trainer-overlay">
                                    <div className="trainer-des">
                                        <h2>Tyler Slamans</h2>
                                        <h3>D.C., MS, CSCS</h3>
                                        <ul className="social-icon">
                                            <li><a href="#" className="fa fa-facebook wow fadeInUp"
                                                   data-wow-delay="1s"></a></li>
                                            <li><a href="#" className="fa fa-twitter wow fadeInUp"
                                                   data-wow-delay="1.3s"></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, maecenas eget vestibulum justo imperdiet, wisi risus purus
                                augue vulputate.</p>
                        </div>
                        <div className="wow fadeInUp col-md-4 col-sm-6" data-wow-delay="1.9s">
                            <div className="trainer-thumb">
                                <img src="images/anon_profile.png" className="img-responsive" alt="Trainer"/>
                                <div className="trainer-overlay">
                                    <div className="trainer-des">
                                        <h2>Brock Dudley</h2>
                                        <h3>D.C., DACBSP</h3>
                                        <ul className="social-icon">
                                            <li><a href="#" className="fa fa-facebook wow fadeInUp"
                                                   data-wow-delay="1s"></a></li>
                                            <li><a href="#" className="fa fa-twitter wow fadeInUp"
                                                   data-wow-delay="1.3s"></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, maecenas eget vestibulum justo imperdiet, wisi risus purus
                                augue vulputate.</p>
                        </div>
                        <div className="wow fadeInUp col-md-4 col-sm-6" data-wow-delay="2s">
                            <div className="trainer-thumb">
                                <img src="images/anon_profile.png" className="img-responsive" alt="Trainer"/>
                                <div className="trainer-overlay">
                                    <div className="trainer-des">
                                        <h2>Charlotte Campbell</h2>
                                        <h3>D.C.</h3>
                                        <ul className="social-icon">
                                            <li><a href="#" className="fa fa-facebook wow fadeInUp"
                                                   data-wow-delay="1s"></a></li>
                                            <li><a href="#" className="fa fa-twitter wow fadeInUp"
                                                   data-wow-delay="1.3s"></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, maecenas eget vestibulum justo imperdiet, wisi risus purus
                                augue vulputate.</p>
                        </div>
                        <div className="wow fadeInUp col-md-4 col-sm-6" data-wow-delay="2.3s">
                            <div className="trainer-thumb">
                                <img src="images/anon_profile.png" className="img-responsive" alt="Trainer"/>
                                <div className="trainer-overlay">
                                    <div className="trainer-des">
                                        <h2>??</h2>
                                        <h3>??</h3>
                                        <ul className="social-icon">
                                            <li><a href="#" className="fa fa-facebook wow fadeInUp"
                                                   data-wow-delay="1s"></a></li>
                                            <li><a href="#" className="fa fa-twitter wow fadeInUp"
                                                   data-wow-delay="1.3s"></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, maecenas eget vestibulum justo imperdiet, wisi risus purus
                                augue vulputate.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="price" className="parallax-section">
                <div className="container">
                    <div className="row">

                        <div className="wow fadeInUp col-md-12 col-sm-12" data-wow-delay="0.9s">
                            <h2 className={"pricing__header"}>Our Pricing</h2>
                        </div>

                        <div className="wow fadeInUp col-md-6 col-sm-6" data-wow-delay="1s">
                            <div className="pricing__item">
                                <h3 className="pricing__title">Online Course</h3>
                                <div className="pricing__price"><span className="pricing__currency">$</span>750</div>
                                <ul className="pricing__feature-list">
                                    <li className="pricing__feature">12 CEUs Ethic & Law</li>
                                    <li className="pricing__feature">12 CEUs (TODO: GET FROM BOSS)</li>
                                    <li className="pricing__feature">Online exam</li>
                                    <li className="pricing__feature">Course Certificate</li>
                                </ul>
                                <button className="pricing__action">Sign Up Now</button>
                            </div>
                        </div>

                        <div className="wow fadeInUp col-md-6 col-sm-6" data-wow-delay="1.3s">
                            <div className="pricing__item">
                                <h3 className="pricing__title">Live Course</h3>
                                <div className="pricing__price"><span className="pricing__currency">$</span>1250</div>
                                <ul className="pricing__feature-list">
                                    <li className="pricing__feature">12 CEUs Ethic & Law (Online)</li>
                                    <li className="pricing__feature">12 CEUs (TODO: GET FROM BOSS)</li>
                                    <li className="pricing__feature">Online exam</li>
                                    <li className="pricing__feature">Course Certificate</li>
                                </ul>
                                <button className="pricing__action">Sign Up Now</button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section id="testimonial" className="parallax-section">
                <div className="container">
                    <div className="row">
                        <div id="owl-testimonial" className="owl-carousel">

                            <div className="item col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 wow fadeInUp"
                                 data-wow-delay="0.6s">
                                <i className="fa fa-quote-left"></i>
                                <h3>Lorem ipsum dolor sit amet, maecenas eget vestibulum justo imperdiet, wisi risus
                                    purus augue vulputate.</h3>
                                <h4>Sandar ( Fashion Designer )</h4>
                            </div>

                            <div className="item col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 wow fadeInUp"
                                 data-wow-delay="0.6s">
                                <i className="fa fa-quote-left"></i>
                                <h3>Yes! Lorem ipsum dolor sit amet, maecenas eget vestibulum justo imperdiet, wisi
                                    risus purus augue.</h3>
                                <h4>James Job ( Social Assistant )</h4>
                            </div>

                            <div className="item col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 wow fadeInUp"
                                 data-wow-delay="0.6s">
                                <i className="fa fa-quote-left"></i>
                                <h3>Sed dapibus rutrum lobortis. Sed nec interdum nunc, quis sodales ante. Maecenas
                                    volutpat congue.</h3>
                                <h4>Mark Otto ( New Cyclist )</h4>
                            </div>

                            <div className="item col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 wow fadeInUp"
                                 data-wow-delay="0.6s">
                                <i className="fa fa-quote-left"></i>
                                <h3>Lorem ipsum dolor sit amet, maecenas eget vestibulum justo imperdiet, wisi risus
                                    purus.</h3>
                                <h4>David Moore ( Pro Boxer )</h4>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
            <section id="facility" className="parallax-section">
                <div className="container">
                    <div className="row">

                        <div className="wow fadeInUp col-md-5 col-sm-12" data-wow-delay="1s">
                            <div className="overview-detail">
                                <h2 className={"facility__header"}>Our Facility</h2>
                                <p>
                                    BodyDynamix Integrated Sports Medicine is located in the world-famous Sports
                                    Academy campus in the city of Thousand Oaks.
                                </p>
                                <p>
                                    The campus is centrally located serving the cities of Thousand Oaks, Newbury Park,
                                    Camarillo, Westlake Village, Simi Valley, Oak Park and Agoura Hills.
                                </p>
                                <p>
                                    This state-of-the-art campus is a 100,000 square-foot facility that houses five
                                    basketball courts, five volleyball courts, two beach volleyball courts, a turf
                                    field, Gracie Barre Jiujutsu dojo, a bio-mechanics lab, a world-class cognitive
                                    training lab, an e-sports training ground, batting cages and pitching mounds, a
                                    mondo sprint track, a learning center for academic tutoring and training, and a
                                    yoga/cycling studio.
                                </p>
                            </div>
                        </div>

                        {/* <div className="col-md-1"></div>*/}


                        <div className="col-md-1"></div>

                        <div className="col-md-6 col-sm-12">
                            <img src="images/premises.jpeg" className="img-responsive" alt="Overview"/>
                            <blockquote className="wow fadeInUp" data-wow-delay="1.9s">
                                Located inside of Sports Academy, a World-class training facility.
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>
            <section id="facility-services" className="parallax-section mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <img src="images/premises.jpeg" className="img-responsive" alt="Overview"/>
                            <blockquote className="wow fadeInUp" data-wow-delay="1.9s">
                                Located inside of Sports Academy, a World-class training facility.
                            </blockquote>
                        </div>

                        {/* <div className="col-md-1"></div>*/}

                        <div className="wow fadeInUp col-md-5 col-sm-12" data-wow-delay="1s">
                            <div className="overview-detail">
                                <h2 className={"facility__header"}>Facility Services</h2>
                                <p>
                                    Here at Body Dynamix we use the most advanced technology to help out clients reach their maximum potential. Our state-of-the-art medical center includes:
                                </p>
                                <ul className={"services-list"}>
                                    <li>BRF (Blood Flow Restriction)</li>
                                    <li>AlterG® Anti-Gravity Treadmill®</li>
                                    <li>Cold Laser Therapy</li>
                                    <li>Normatec® Recovery compression technology</li>
                                    <li>Infra-red Sauna</li>
                                    <li>Hyperbaric Chamber</li>
                                    <li>Whirlpool Cold Baths</li>
                                    <li>Biomechanics Lab</li>
                                    <li>X-rays</li>
                                    <li>Diagnostic Ultrasound</li>
                                    <li>EMG (Nerve conduction studies)</li>
                                    <li>+ MORE</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-1"></div>

                    </div>
                </div>
            </section>
            <section id="cofounders" className="parallax-section">
                <div className="container">
                    <div className="row">

                        <div className="wow fadeInUp col-md-4 col-sm-12" data-wow-delay="1s">
                            <div className="overview-detail">
                                <h2>Our Co-Founders</h2>
                                <p>Beau Daniels and Eddie Stanislawski.</p>
                                <p>Our founders had a vision...</p>
                            </div>
                        </div>

                        <div className="col-md-1"></div>

                        <div className="col-md-6 col-sm-12">
                            <img src="images/sportsAcademyCofounders.jpg" className="img-responsive" alt="Overview"/>
                            <blockquote className="wow fadeInUp" data-wow-delay="1.9s">
                                Beau Daniels (left) and Eddie Stanislawski (right)
                            </blockquote>
                        </div>

                        <div className="col-md-1"></div>

                    </div>
                </div>
            </section>
            <SiteFooter/>
        </>
    );
}