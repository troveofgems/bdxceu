import React from "react";
import {useSelector} from "react-redux";

// External Components
import {AuthenticationModal} from "../../Authentication/Authentication";
import BackgroundSlider from "../../shared/BackgroundSlider/BackgroundSlider";

// Associated Styles
import "../parallax.css";
import "./Splash.css"

// Images
const splashImages = [
    "/images/banners/home-bg-slider-img1.jpeg",
    "/images/banners/home-bg-slider-img2.jpg"
];

const Splash = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <section id="splash" className="parallax-section shadowOverlay">
            <div className="container">
                <div className="row">
                    <div className="text-center">
                        <h3 className="wow bounceIn" data-wow-delay="0.9s">{(!!user) ? `Hey ${user?.firstName || "Anon"}, welcome back to` : "Hello! welcome to"}</h3>
                        <h1 className="wow fadeInUp" data-wow-delay="1.6s"><br/>BodyDynamix Integrated Sports
                            Medicine <strong>CEU</strong> Courses</h1>
                        {(!user) && <AuthenticationModal modalType={"registration"}/>}
                    </div>
                </div>
                <BackgroundSlider images={splashImages} />
            </div>
        </section>
    );
}

export default Splash;