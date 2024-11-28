import React, {useEffect} from 'react';
import {Row, Col} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useFetchSiteSettingsQuery } from "../../../redux/slices/siteSettingsSlice";
import { setFooterData } from "../../../redux/slices/siteSettingsSlice";

import {Preloader} from "../Preloader/Preloader";

import "../../../public/css/font-awesome.min.css";
import "./Footer.css";
const Footer = () => {
    const dispatch = useDispatch();

    const { footerData } = useSelector((state) => state.siteSettings);

    const
        appInitiallyPublished = 2024,
        currentYear = new Date().getFullYear(),
        activeYears = currentYear - appInitiallyPublished,
        generatedCopyright = activeYears > 0 ? `${appInitiallyPublished} - ${currentYear}` : `${appInitiallyPublished}`;

    const { data: siteSettingsFromServer, isLoading: loadingSiteSettingsFromServer, refetch, error: errorLoadingSiteSettingsFromServer } = useFetchSiteSettingsQuery();

    useEffect(() => {
        let fetchAndSetFooterState = footerData === null &&
            !loadingSiteSettingsFromServer &&
            !!siteSettingsFromServer &&
            errorLoadingSiteSettingsFromServer === undefined;

        if(fetchAndSetFooterState) {
            let footerData = {
                siteContact: siteSettingsFromServer.data[0].siteContact,
                facilityHours: siteSettingsFromServer.data[0].facilityHours,
                courseDates: siteSettingsFromServer.data[0].courseDates,
                socials: siteSettingsFromServer.data[0].socials
            };
            dispatch(setFooterData({ ...footerData }));
        }
    }, [loadingSiteSettingsFromServer]);

    return (loadingSiteSettingsFromServer) ? <Preloader /> :
        !!footerData ? (
        <footer id={"footer"}>
            <Row className="footer_subsections">
                <Col lg={3}>
                    <div className="wow fadeInUp addFooterPad" data-wow-delay="0.6s">
                        <h2>Contact</h2>
                        {
                            footerData.siteContact.address.show && (
                                <address>
                                    <h6>Location</h6>
                                    {footerData.siteContact.address.val}<br/>
                                    <h6 className={"mt-4"}>Support</h6>
                                    {footerData.siteContact.supportEmail.show && (
                                        <>
                                            <a className="supportContact"
                                               href={`mailto:${footerData.siteContact.supportEmail.val}`}>{footerData.siteContact.supportEmail.val}</a><br/>
                                        </>
                                    )}
                                    {footerData.siteContact.supportPhone.show && (
                                        <>
                                            <h6 className={"mt-4"}>Telephone</h6>
                                            <a className="supportContact"
                                               href={`tel:${footerData.siteContact.supportPhone.val}`}>{footerData.siteContact.supportPhone.val}</a>
                                        </>
                                    )}
                                </address>
                            )
                        }
                    </div>
                </Col>
                <Col lg={3}>
                    <div className="wow fadeInUp addFooterPad" data-wow-delay="0.9s">
                        <h2>Facility Hours</h2>
                        <div className={"hour-list"}>
                            <h6>Opens At</h6>
                            {
                                footerData.facilityHours.morning.show && (
                                    <h5>{footerData.facilityHours.morning.val}</h5>
                                )
                            }
                        </div>
                        <div className={"hour-list"}>
                            <h6>Closes At</h6>
                            {
                                footerData.facilityHours.morning.show && (
                                    <h5>{footerData.facilityHours.evening.val}</h5>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col lg={3}>
                    <div className="wow fadeInUp addFooterPad" data-wow-delay="0.9s">
                        <h2>Course Dates</h2>
                        <div className={"hour-list"}>
                            <h6>Live Course Dates</h6>
                            {
                                footerData.courseDates.live.show && (
                                    <h5>{footerData.courseDates.live.val}</h5>
                                )
                            }
                        </div>
                        <div className={"hour-list"}>
                            <h6>Pre-recorded Course Dates</h6>
                            {
                                footerData.courseDates.prerecorded.show && (
                                    <h5>{footerData.courseDates.prerecorded.val}</h5>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col lg={3}>
                    <div className="wow fadeInUp addFooterPad" data-wow-delay="1s">
                        <h2>Follow us</h2>
                        <ul className="social-icon">
                            {footerData.socials.altWebsite.show && (
                                <li>
                                    <a href={`${footerData.socials.altWebsite.val}`}
                                       className="fa fa-server wow fadeIn" data-wow-delay="1s"
                                    ></a>
                                </li>
                            )}
                            {footerData.socials.facebook.show && (
                                <li>
                                    <a href={`${footerData.socials.facebook.val}`}
                                       className="fa fa-facebook wow fadeIn" data-wow-delay="1s"
                                    ></a>
                                </li>
                            )}
                        </ul>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12} className={"copyright-text"}>
                    BodyDynamix &copy; {generatedCopyright}
                </Col>
            </Row>
        </footer>
    ) : <Preloader />;
};

export default Footer;
