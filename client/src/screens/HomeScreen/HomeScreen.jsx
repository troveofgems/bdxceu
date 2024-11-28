import React, {useEffect} from "react";
import {Row, Col} from "react-bootstrap";

// Landing Page Sections
import Splash from "../../components/Landing/Splash/Splash";
import Overview from "../../components/Landing/Overview/Overview";
import Team from "../../components/Landing/Team/Team";
import Pricing from "../../components/Landing/Pricing/Pricing";
import Facility from "../../components/Landing/Facility/Facility";
import FacilityServices from "../../components/Landing/Facility/FacilityServices/FacilityServices";
import CoFounders from "../../components/Landing/CoFounders/CoFounders";

import WOW from "wowjs";
import {useSelector} from "react-redux";

const HomeScreen = () => {
    const
        { userInfo } = useSelector((state) => state.auth),
        isAdmin = userInfo?.data?.authLevel === "admin" || false;

    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, [userInfo]);

    return (
        <Row>
            <Col lg={12} md={12} sm={12}>
                <Splash />
            </Col>
            <Col lg={12} md={12} sm={12}>
                <Overview />
            </Col>
            <Col lg={12} md={12} sm={12}>
                <Team />
            </Col>
            <Col lg={12} md={12} sm={12}>
                <Pricing isAdmin={isAdmin} />
            </Col>
            <Col lg={12} md={12} sm={12}>
                <Facility />
            </Col>
            <Col lg={12} md={12} sm={12}>
                <FacilityServices />
            </Col>
            <Col lg={12} md={12} sm={12}>
                <CoFounders />
            </Col>
        </Row>
    );
}

export default HomeScreen;