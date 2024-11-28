import React, { useState, useEffect } from "react";
import {Container, Row} from "react-bootstrap";

// Associated Styles
import "../parallax.css";
import "./CoFounders.css"

const CoFounders = () => {
    return (
        <section id="co-founders" className="parallax-section">
            <Container>
                <Row>
                    <div className="wow fadeInUp col-md-4 col-sm-12" data-wow-delay="1s">
                        <div className="overview-detail">
                            <h2>Our Co-Founders</h2>
                            <p>Beau Daniels and Eddie Stanislawski.</p>
                            <p>Our founders had a vision...</p>
                        </div>
                    </div>

                    <div className="col-md-1"></div>

                    <div className="col-md-5 col-sm-12">
                        <img src="images/sportsAcademyCofounders.jpg" className="img-responsive" width={700}
                             height={700}
                             alt="Our CoFounders Beau Daniels (left) and Eddie Stanislawski (right)"/>
                        <blockquote className="wow fadeInUp" data-wow-delay="1.9s">
                            Beau Daniels (left) and Eddie Stanislawski (right)
                        </blockquote>
                    </div>

                    <div className="col-md-1"></div>
                </Row>
            </Container>
        </section>
    );
}

export default CoFounders;