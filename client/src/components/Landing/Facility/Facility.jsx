import React, { useState, useEffect } from "react";

import {Container} from "react-bootstrap";


// Associated Styles
import "../parallax.css";
import "./Facility.css"

const Facility = () => {
    return (
        <section id="facility" className="parallax-section">
            <Container className={"d-flex"}>
                <div className="wow fadeInUp col-md-5 col-sm-12" data-wow-delay="1s">
                    <div className="overview-detail">
                        <h2 className={"facility__header"}>Our Facility</h2>
                        <p>
                            BodyDynamix Integrated Sports Medicine is located in the world-famous Sports
                            Academy campus in the city of Thousand Oaks.
                        </p>
                        <p>
                            The campus is centrally located serving the cities of Thousand Oaks, Newbury
                            Park,
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

                <div className="col-md-1"></div>


                <div className="col-md-1"></div>

                <div className="col-md-6 col-sm-12">
                    <img src="images/premises.jpeg" className="img-responsive" alt="Our Facility" width={600}
                         height={400}/>
                    <blockquote className="wow fadeInUp" data-wow-delay="1.9s">
                        Located inside of Sports Academy, a World-class training facility.
                    </blockquote>
                </div>
            </Container>
        </section>
    );
}

export default Facility;

// className="img-responsive" alt="Overview"