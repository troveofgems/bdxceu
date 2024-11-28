import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import {FormProvider, useForm} from "react-hook-form";

import {Form} from "react-bootstrap";
import { toast } from "react-toastify";

import {Preloader} from "../../../components/shared/Preloader/Preloader";

import CustomPhoneInput from "../../../components/shared/ReusableFields/PhoneInput/PhoneInput";
import "./SiteSettingsScreen.css";
import {
    site_settings_address_validation,
    site_settings_facility_evening_hours_validation,
    site_settings_facility_morning_hours_validation,
    site_settings_live_courses_validation,
    site_settings_recorded_courses_validation,
    site_settings_socials_alt_website_validation,
    site_settings_socials_facebook_validation
} from "../../../validations/siteSettingsValidations";
import {Input} from "../../../components/shared/ReusableFields/Input/Input";
import {email_validation_readonly} from "../../../validations/siteSettingsValidations";
import {useGetUserProfileQuery, useUpdateUserProfileMutation} from "../../../redux/slices/userSlice";
import {useFetchSiteSettingsQuery, useUpdateSiteSettingsMutation} from "../../../redux/slices/siteSettingsSlice";
import {formatDate} from "../../../utils/field.formatters";
const AdminSiteSettingsScreen = () => {
    const methods = useForm();
    const {register, watch, unregister} = methods;

    const [phoneNumber, setPhoneNumber] = useState("");

    const watchShowSiteAddress = watch("showSiteAddress");
    const watchShowSiteSupportEmail = watch("showSiteSupportEmail");
    const watchShowSiteTelephone = watch("showSiteTelephone");
    const watchShowSiteFacilityMorningHours = watch("showSiteFacilityMorningHours");
    const watchShowSiteFacilityEveningHours = watch("showSiteFacilityEveningHours");
    const watchShowSiteLiveCourseDates = watch("showSiteLiveCourseDates");
    const watchShowSiteRecordedCourseDates = watch("showSiteRecordedCourseDates");
    const watchShowSiteSocialsAltWebsite = watch("showSocialsAltWebsite");
    const watchShowSiteSocialsFacebook = watch("showSocialsFacebook");


    const { data: siteSettingsFromServer, isLoading: loadingSiteSettingsFromServer, refetch, error: errorLoadingSiteSettingsFromServer } = useFetchSiteSettingsQuery();
    const [updateSiteSettings, { isLoading: loadingUpdateToSiteSettings }] = useUpdateSiteSettingsMutation();

    const onSubmit = methods.handleSubmit(async (data) => {

        if(phoneNumber.phoneNumber !== undefined) {
            data.phone = phoneNumber.phoneNumber;
        }

        console.log("Update Site Settings: ", data);

        try {
            const res = await updateSiteSettings(data).unwrap();
            console.log("Res was: ", res);
            refetch();
        } catch(err) {
            console.error("EMITTED: ", err);
            // Emit Server Errors
            if(err?.response?.data?.error) {
                //setSubmissionError(true);
                //setSubmissionErrorMessage(`${err?.response?.data?.errorMessage}`);
                return;
            }

            // Emit Server Errors
            if(err?.data?.success === false) {
                //setSubmissionError(true);
                //setSubmissionErrorMessage(`${err?.data?.error}`);
                return;
            }
        }
    });

    useEffect(() => {
        if (watchShowSiteAddress) {
            register("address");
        } else {
            unregister("address");
        }
        if (watchShowSiteSupportEmail) {
            register("email");
        } else {
            unregister("email");
        }
        if (watchShowSiteFacilityMorningHours) {
            register("morningHours");
        } else {
            unregister("morningHours");
        }
        if (watchShowSiteFacilityEveningHours) {
            register("eveningHours");
        } else {
            unregister("eveningHours");
        }
        if (watchShowSiteLiveCourseDates) {
            register("liveCourses");
        } else {
            unregister("liveCourses");
        }
        if (watchShowSiteRecordedCourseDates) {
            register("recordedCourses");
        } else {
            unregister("recordedCourses");
        }
        if (watchShowSiteSocialsAltWebsite) {
            register("socialsWebsite");
        } else {
            unregister("socialsWebsite");
        }
        if (watchShowSiteSocialsFacebook) {
            register("socialsFacebook");
        } else {
            unregister("socialsFacebook");
        }

        if(siteSettingsFromServer !== undefined) console.log("Have Settings? ", siteSettingsFromServer);
    }, [
        register, unregister,
        watchShowSiteAddress, watchShowSiteSupportEmail, watchShowSiteTelephone,
        watchShowSiteFacilityMorningHours, watchShowSiteFacilityEveningHours, watchShowSiteLiveCourseDates,
        watchShowSiteRecordedCourseDates, watchShowSiteSocialsAltWebsite, watchShowSiteSocialsFacebook,
        loadingSiteSettingsFromServer
    ]);

    return loadingSiteSettingsFromServer ? <Preloader /> : (
        <Container>
            <h1 className={"text-center mt-5"}>Site Configurations</h1>
            <h5 className={"text-center mt-5"}>Last Update: {formatDate(siteSettingsFromServer.data[0].updatedAt)}</h5>
            <Row>
                <Col lg={12} md={12}>
                    <FormProvider {...methods}>
                        <Form
                            onSubmit={e => e.preventDefault()}
                            noValidate
                            className="payment-methods-form"
                            autoComplete="off"
                        >
                            <h4 className={"mb-2 text-decoration-underline"}>Site Contact</h4>
                            <hr/>
                            <Row className={"w-100 mb-5"}>
                                <Col lg={12}>
                                    <div className="switch">
                                        <input
                                            id={"siteAddress"}
                                            type="checkbox"
                                            defaultChecked={siteSettingsFromServer.data[0].siteContact.address.show || false}
                                            {...register('showSiteAddress', {})}
                                        />
                                        <span className="slider round"></span>
                                        <label htmlFor={"siteAddress"} className={"settingsLabel button-29"}>
                                            Site Physical Address
                                        </label>
                                    </div>
                                </Col>
                                {watchShowSiteAddress ? (
                                    <Col lg={12}>
                                        <Input
                                            {...site_settings_address_validation}
                                            value={siteSettingsFromServer.data[0].siteContact.address.val}
                                        />
                                    </Col>
                                ) : null}
                                <div className={"spacer mt-3 mb-3"}></div>
                                <Col lg={12}>
                                    <div className="switch">
                                        <input
                                            id={"siteSupportContact"}
                                            type="checkbox"
                                            defaultChecked={siteSettingsFromServer.data[0].siteContact.supportEmail.show || false}
                                            {...register('showSiteSupportEmail', {})}
                                        />
                                        <span className="slider round"></span>
                                        <label htmlFor={"siteSupportContact"} className={"settingsLabel button-29"}>
                                            Site Support Email
                                        </label>
                                    </div>
                                </Col>
                                {watchShowSiteSupportEmail ? (
                                    <Col lg={12}>
                                        <Input
                                            value={siteSettingsFromServer.data[0].siteContact.supportEmail.val || undefined}
                                            {...email_validation_readonly}
                                        />
                                    </Col>
                                ) : null}
                                <div className={"spacer mt-3 mb-3"}></div>
                                <Col lg={12}>
                                    <div className="switch">
                                        <input
                                            id={"siteTelephone"}
                                            type="checkbox"
                                            defaultChecked={siteSettingsFromServer.data[0].siteContact.supportPhone.show || false}
                                            {...register('showSiteTelephone', {})}
                                        />
                                        <span className="slider round"></span>
                                        <label htmlFor={"siteTelephone"} className={"settingsLabel button-29"}>
                                            Site Telephone Number
                                        </label>
                                    </div>
                                </Col>
                                {watchShowSiteTelephone ? (
                                    <Col lg={12}>
                                        <CustomPhoneInput
                                            id={"phonenumber"}
                                            name={"phonenumber"}
                                            onChange={(e) => setPhoneNumber({...phoneNumber, phoneNumber: e})}
                                            className="input__field"
                                            phonenumber={phoneNumber.phoneNumber}
                                            useLabel={false}
                                            showValidationMessage={false}
                                            passVal={siteSettingsFromServer.data[0].siteContact.supportPhone.val || ""}
                                        />
                                    </Col>
                                ) : null}
                            </Row>

                            <h4 className={"mb-2 text-decoration-underline"}>Facility Hours</h4>
                            <hr/>
                            <Row className={"w-100 mb-5"}>
                                <Col lg={12}>
                                    <div className="switch">
                                        <input
                                            id={"siteFacilityMorningHours"}
                                            type="checkbox"
                                            defaultChecked={(siteSettingsFromServer.data[0].facilityHours.morning.show || false)}
                                            {...register('showSiteFacilityMorningHours', {})}
                                        />
                                        <span className="slider round"></span>
                                        <label htmlFor={"siteFacilityMorningHours"} className={"settingsLabel button-29"}>
                                            Facility Morning Hours
                                        </label>
                                    </div>
                                </Col>
                                {watchShowSiteFacilityMorningHours ? (
                                    <Col lg={12}>
                                        <Input
                                            value={siteSettingsFromServer.data[0].facilityHours.morning.val || undefined}
                                            {...site_settings_facility_morning_hours_validation}
                                        />
                                    </Col>
                                ) : null}

                                <div className={"spacer mt-3 mb-3"}></div>
                                <Col lg={12}>
                                    <div className="switch">
                                        <input
                                            id={"siteFacilityEveningHours"}
                                            type="checkbox"
                                            defaultChecked={(siteSettingsFromServer.data[0].facilityHours.evening.show || false)}
                                            {...register('showSiteFacilityEveningHours', {})}
                                        />
                                        <span className="slider round"></span>
                                        <label htmlFor={"siteFacilityEveningHours"} className={"settingsLabel button-29"}>
                                            Facility Evening Hours
                                        </label>
                                    </div>
                                </Col>
                                {watchShowSiteFacilityEveningHours ? (
                                    <Col lg={12}>
                                        <Input
                                            {...site_settings_facility_evening_hours_validation}
                                            value={siteSettingsFromServer.data[0].facilityHours.evening.val || ""}
                                        />
                                    </Col>
                                ) : null}
                                <div className={"spacer mt-3 mb-3"}></div>
                            </Row>

                            <h4 className={"mb-2 text-decoration-underline"}>Course Dates</h4>
                            <hr/>
                            <Row className={"w-100 mb-5"}>
                                <Col lg={12}>
                                    <div className="switch">
                                        <input
                                            id={"liveCourseDates"}
                                            type="checkbox"
                                            defaultChecked={(siteSettingsFromServer === undefined) ? false : siteSettingsFromServer.data[0].courseDates.live.show}
                                            {...register('showSiteLiveCourseDates', {})}
                                        />
                                        <span className="slider round"></span>
                                        <label htmlFor={"liveCourseDates"} className={"settingsLabel button-29"}>
                                            Live Courses
                                        </label>
                                    </div>
                                </Col>
                                {watchShowSiteLiveCourseDates ? (
                                    <Col lg={12}>
                                        <Input
                                            {...site_settings_live_courses_validation}
                                            value={siteSettingsFromServer.data[0].courseDates.live.val || ""}
                                        />
                                    </Col>
                                ) : null}

                                <div className={"spacer mt-3 mb-3"}></div>
                                <Col lg={12}>
                                    <div className="switch">
                                        <input
                                            id={"recordedCourseDates"}
                                            type="checkbox"
                                            defaultChecked={siteSettingsFromServer === undefined ? false : siteSettingsFromServer.data[0].courseDates.prerecorded.show}
                                            {...register('showSiteRecordedCourseDates', {})}
                                        />
                                        <span className="slider round"></span>
                                        <label htmlFor={"recordedCourseDates"} className={"settingsLabel button-29"}>
                                            Pre-recorded
                                        </label>
                                    </div>
                                </Col>
                                {watchShowSiteRecordedCourseDates ? (
                                    <Col lg={12}>
                                        <Input
                                            value={siteSettingsFromServer.data[0].courseDates.prerecorded.val || ""}
                                            {...site_settings_recorded_courses_validation}
                                        />
                                    </Col>
                                ) : null}
                                <div className={"spacer mt-3 mb-3"}></div>
                            </Row>

                            <h4 className={"mb-2 text-decoration-underline"}>Site Socials</h4>
                            <hr/>
                            <Row className={"w-100 mb-5"}>
                                <Col lg={12}>
                                    <div className="switch">
                                        <input
                                            id={"siteSocialsAltWebsite"}
                                            type="checkbox"
                                            defaultChecked={(siteSettingsFromServer.data[0].socials.altWebsite.show || false)}
                                            {...register('showSocialsAltWebsite', {})}
                                        />
                                        <span className="slider round"></span>
                                        <label htmlFor={"siteSocialsAltWebsite"} className={"settingsLabel button-29"}>
                                            Alternative Website
                                        </label>
                                    </div>
                                </Col>
                                {watchShowSiteSocialsAltWebsite ? (
                                    <Col lg={12}>
                                        <Input
                                            value={siteSettingsFromServer.data[0].socials.altWebsite.val || undefined}
                                            {...site_settings_socials_alt_website_validation}
                                        />
                                    </Col>
                                ) : null}

                                <div className={"spacer mt-3 mb-3"}></div>
                                <Col lg={12}>
                                    <div className="switch">
                                        <input
                                            id={"siteSocialsFacebook"}
                                            type="checkbox"
                                            defaultChecked={(siteSettingsFromServer.data[0].socials.facebook.show || false)}
                                            {...register('showSocialsFacebook', {})}
                                        />
                                        <span className="slider round"></span>
                                        <label htmlFor={"siteSocialsFacebook"} className={"settingsLabel button-29"}>
                                            Facebook
                                        </label>
                                    </div>
                                </Col>
                                {watchShowSiteSocialsFacebook ? (
                                    <Col lg={12}>
                                        <Input
                                            {...site_settings_socials_facebook_validation}
                                            value={siteSettingsFromServer.data[0].socials.facebook.val || undefined}
                                        />
                                    </Col>
                                ) : null}
                                <div className={"spacer mt-3 mb-3"}></div>
                            </Row>
                            {
                                loadingUpdateToSiteSettings || loadingSiteSettingsFromServer ? <Preloader /> : (
                                    <button className={"modalButtonAuth buttonAuthLogin mb-5"} type="submit"
                                            onClick={onSubmit}>Upsert Site Settings
                                    </button>
                                )
                            }
                        </Form>
                    </FormProvider>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminSiteSettingsScreen;