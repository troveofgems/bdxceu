import React from 'react';

import "./Footer.css";
class SiteFooter extends React.Component {
    render() {
        return (
            <footer>
                <div className="container footer__container">
                    <div className="row">

                        <div className="wow fadeInUp col-md-3 col-sm-4" data-wow-delay="0.6s">
                            <h2>Contact</h2>
                            <address>
                                1011 Rancho Conejo Blvd. Thousand Oaks, CA 91320<br/>
                                <a className="supportContact"
                                   href={"mailto:support@bdxceu.com"}>support@bdxceu.com</a><br/>
                                <a className="supportContact" href={"tel:+10000000000"}>+1 (000) 000-0000</a><br/>

                            </address>
                        </div>

                        <div className="wow fadeInUp col-md-3 col-sm-4" data-wow-delay="0.9s">
                            <h2>The Facility</h2>
                            <div>
                                <h5>Morning</h5>
                                <h4>TBD</h4>
                            </div>
                            <div>
                                <h5>Evening</h5>
                                <h4>TBD</h4>
                            </div>
                        </div>

                        <div className="wow fadeInUp col-md-3 col-sm-4" data-wow-delay="0.9s">
                            <h2>Course Dates</h2>
                            <div>
                                <h5>Live Course Start Dates</h5>
                                <h4>TBD</h4>
                            </div>
                            <div>
                                <h5>Live Course End Dates</h5>
                                <h4>TBD</h4>
                            </div>
                        </div>

                        <div className="wow fadeInUp col-md-3 col-sm-4" data-wow-delay="1s">
                            <h2>Follow us</h2>
                            <ul className="social-icon">
                                <li><a href="#" className="fa fa-facebook wow fadeIn" data-wow-delay="1s"></a></li>
                                <li><a href="#" className="fa fa-twitter wow fadeInUp" data-wow-delay="1.3s"></a></li>
                            </ul>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col-md-12 col-sm-12">
                            <p className="copyright-text">
                                Copyright &copy; 2024 BodyDynamix
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default SiteFooter;