import React from "react";

// Associated Styles
import "../../parallax.css";
import "./FacilityServices.css"

const FacilityServices = () => {
    return (
        <section id="facility-services" className="parallax-section mb-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <img src="images/premises_2.jpeg" className="img-responsive" alt="Our Facility" width={600}
                             height={400}/>
                    </div>

                    <div className="wow fadeInUp col-md-5 col-sm-12" data-wow-delay="1s">
                        <div className="overview-detail">
                            <h2 className={"facility__header"}>Facility Services</h2>
                            <p>
                                Here at Body Dynamix we use the most advanced technology to help out clients
                                reach their maximum potential. Our state-of-the-art medical center includes:
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
    );
}

export default FacilityServices;