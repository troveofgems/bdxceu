import React from "react";

// Affiliates Images
import AngelCityLogo from "../../../assets/images/affiliates/angel_city.png";
import PepperdineLogo from "../../../assets/images/affiliates/pepperdine.png";
import RamsLogo from "../../../assets/images/affiliates/rams.png";
import USAFieldHockeyLogo from "../../../assets/images/affiliates/usa_field_hockey.png";
import USAVolleyballLogo from "../../../assets/images/affiliates/usa_volleyball.png";

// Associated Styles
import "./Affiliates.css"
import Carousel from "react-bootstrap/Carousel";

const OurAffiliatesSection = () => {
    const affiliates = [
        {
          _id: 0,
          name: "Angel City",
          logoSrc: AngelCityLogo,
          alt: " Logo",
          description: "Something About Our Sponsor ",
          customWidth: 300,
          customHeight: 479
        },
        {
            _id: 1,
            name: "Pepperdine",
            logoSrc: PepperdineLogo,
            alt: " Logo",
            description: "Something About Our Sponsor ",
            customWidth: false,
            customHeight: false
        },
        {
            _id: 2,
            name: "Rams",
            logoSrc: RamsLogo,
            alt: " Logo",
            description: "Something About Our Sponsor ",
            customWidth: 500,
            customHeight: 550
        },
        {
            _id: 3,
            name: "USA Field Hockey",
            logoSrc: USAFieldHockeyLogo,
            alt: " Logo",
            description: "Something About Our Sponsor ",
            customWidth: false,
            customHeight: false
        },
        {
            _id: 4,
            name: "USA Volleyball",
            logoSrc: USAVolleyballLogo,
            alt: " Logo",
            description: "Something About Our Sponsor ",
            customWidth: false,
            customHeight: false
        },
    ];

    return (
        <section id="affiliates" className="parallax-section mb-5">
            <div className="container">
                <div className="row">
                    <h2 className={"text-white text-center mb-5"}>Our Affiliates</h2>
                    <div className="col-md-12 col-sm-12">
                        <Carousel fade pause={"hover"}>
                            {
                                (affiliates.length > 0) && affiliates.map(affiliate => (
                                    <Carousel.Item className={"text-center"} key={`affiliate_${affiliate._id}-${affiliate.name}`}>
                                        {
                                            typeof affiliate.customWidth === "number" ? (
                                                <img
                                                    src={`${affiliate.logoSrc}`}
                                                    className="img-responsive"
                                                    alt={`${affiliate.name} ${affiliate.logoSrc}`}
                                                    width={affiliate.customWidth}
                                                    height={affiliate.customHeight}
                                                />
                                            ) : (
                                                <img
                                                    src={`${affiliate.logoSrc}`}
                                                    className="img-responsive"
                                                    alt={`${affiliate.name} ${affiliate.logoSrc}`}
                                                />
                                            )
                                        }
                                        <Carousel.Caption className={"pt-4 carouselItem"}>
                                            <h3>{affiliate.name}</h3>
                                            <p className={"affiliate-info"}>{affiliate.description} {affiliate.name}.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OurAffiliatesSection;