import React, { useState, useEffect } from "react";

// Associated Styles
import "../parallax.css";
import "./Overview.css"
import {Container} from "react-bootstrap";

const Overview = () => {
    return (
        <section id="overview" className="parallax-section">
            <Container className={"d-flex"}>
                <div className="col-md-6 col-sm-12">
                    <img src="images/overview-img.jpg" className="img-responsive" alt="Overview" width={550}
                         height={550}/>
                    <blockquote className="wow fadeInUp" data-wow-delay="1.9s">BodyDynamix offers
                        Chiropractic
                        and Physical Therapy Classes offered by the best professionals! Sign up today
                        to kickstart your career and learn with us!
                    </blockquote>
                </div>

                <div className="col-md-1"></div>

                <div className="wow fadeInUp col-md-4 col-sm-12" data-wow-delay="1s">
                    <div className="overview-detail">
                        <h2>About BodyDynamix</h2>
                        <p>
                            BodyDynamix is the number one Sports Medical, Physical Therapy, Sports
                            Chiropractic,
                            Recovery & Massage Therapy center in the greater Los Angeles area. We work with
                            every kind of patient, from elite athletes to weekend warriors. We strive to be
                            the
                            best and give you the best, utilizing the most advanced and effective
                            therapeutic
                            options for healing faster and better recovery.
                        </p>
                    </div>
                </div>
                <div className="col-md-1"></div>
            </Container>
        </section>
    );
}

export default Overview;