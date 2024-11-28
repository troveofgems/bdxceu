import React, {useEffect, useState} from "react";
import {
    useFetchUserByIdQuery,
    useUpdateAccountLockStatusMutation, useUpdateUserDetailsMutation
} from "../../../redux/slices/userSlice";
import {Preloader} from "../../shared/Preloader/Preloader";
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {formatDate} from "../../../utils/field.formatters";
import {Input} from "../../shared/ReusableFields/Input/Input";
import {
    email_validation,
    first_name_validation,
    last_name_validation,
    middle_initial_validation, phone_validation
} from "../../../validations/inputValidations";
import CustomPhoneInput from "../../shared/ReusableFields/PhoneInput/PhoneInput";
import {FormProvider, useForm} from "react-hook-form";
import SheilaJackson from "../../../assets/images/placeholders/sj.png";
import LaurenJung from "../../../assets/images/team/jung_headshot.jpg";
import AnonProfile from "../../../assets/images/placeholders/anon_profile.png";

const AdminUserByIdScreen = () => {
    const {userId} = useParams();
    const [phoneNumber, setPhoneNumber] = useState("");
    const { data: user, isLoading: loadingUser, refetch, error: ordersError } = useFetchUserByIdQuery(userId);

    const [updateAccountLockStatus, { isLoading: loadingUpdateAccountLockStatus }] = useUpdateAccountLockStatusMutation();
    const [updateUserDetails, { isLoading: loadingUpdateUserDetails }] = useUpdateUserDetailsMutation();

    const methods = useForm();

    useEffect(() => {
        console.log("User? ", user);
        if(!loadingUser && !!user) {
            setPhoneNumber(user.data.phone);
        }
        refetch();
    }, [loadingUser]);

    const handleAccountLockUpdate = async () => {
        let updates = { unlockAccount:  user.data.accountIsLocked, isTeamMember: false };

        // Use the Mutation...
        const res = await updateAccountLockStatus({ userId: user.data._id, updates }).unwrap();

        console.log("Response was? ", res);
        refetch();
    }

    const onSubmit = async (event) => {
        // this part is for stopping parent forms to trigger their submit
        if (event) {
            // sometimes not true, e.g. React Native
            if (typeof event.preventDefault === 'function') {
                event.preventDefault();
            }
            if (typeof event.stopPropagation === 'function') {
                // prevent any outer forms from receiving the event too
                event.stopPropagation();
            }
        }

        return methods.handleSubmit(async (updates) => {
            let studentUpdates = {
              firstName: updates.first_name,
              middleInitial: updates.middle_initial,
              lastName: updates.last_name,
              email: updates.email
            };

            if(phoneNumber.phoneNumber !== undefined) {
                studentUpdates.phone = phoneNumber.phoneNumber
            }

            console.log("Push Updates For User: ", studentUpdates);

            try {
                const res = await updateUserDetails({userId: user.data._id, updates: studentUpdates}).unwrap();
                console.log("Res was ", res);
                refetch();
            } catch(err) {
                console.log("EMIT ", err);
                /*            // Emit Server Errors




                            // Emit Validation Errors Sent By Server
                            if(Object.prototype.toString.call(err?.response?.data) === '[object Array]') {
                                console.log("Need to parse error: ");
                                let fullValidationMessage = "";
                                console.log("Test", err.response.data);
                                err.response.data.map(item => {
                                    console.log("Item: ", item);
                                    let
                                        genericErrorMessageIncluded = item.msg.includes("Invalid value"),
                                        filterMessages = genericErrorMessageIncluded ? 1 : 0;
                                    fullValidationMessage += genericErrorMessageIncluded ? "" :
                                        (
                                            item.msg + ((err.response.data.length - filterMessages) > 1 ? ", " : "")
                                        )
                                });
                                setSubmissionError(true);
                                setSubmissionErrorMessage(fullValidationMessage);
                                return;
                            }

                            // Emit Network Errors
                            if(err.stack && err.name && err.message) {
                                setSubmissionError(true);
                                setSubmissionErrorMessage(`${err.name}: ${err.message}`);
                            }*/
            }
        })(event);
    };

    return (
        <>
            {loadingUser ? <Preloader/> : (
                <div className={"userScreenContent"}>
                    <Container>
                        <div className={"text-center"}>
                            <h1 className={"text-center"}>{user.data.firstName} {user.data.lastName}</h1>
                            <img
                                className="rounded-circle img-responsive mt-3 mb-3" width="250" height="250"
                                src={
                                    user.data.email === "sheila.jackson@gmail.com" ? SheilaJackson :
                                        user.data.email === "lauren@sportsacademy.us" ? LaurenJung : AnonProfile
                                }
                                alt={"User Avatar"}
                            />
                        </div>
                        <hr className={"hrStyle"} />
                        <Row>
                            <Col lg={6}>
                                <Row>
                                    <h4 className={"text-decoration-underline mb-3"}>Account Details</h4>
                                    <Col lg={4}>
                                        <p className={"lead"}>User Id:</p>
                                    </Col>
                                    <Col lg={8}>
                                        <p className={"lead"}><strong>{user.data._id}</strong></p>
                                    </Col>
                                    <Col lg={4}>
                                        <p className={"lead"}>Account
                                            Creation:</p>
                                    </Col>
                                    <Col lg={8}>
                                        <p className={"lead"}><strong>{formatDate(user.data.createdAt)}</strong></p>
                                    </Col>
                                    <Col lg={4}>
                                        <p className={"lead"}>Last Profile
                                            Update:</p>
                                    </Col>
                                    <Col lg={8}>
                                        <p className={"lead"}><strong>{formatDate(user.data.updatedAt)}</strong></p>
                                    </Col>
                                    <Col lg={4}>
                                        <p className={"lead"}>
                                            Account Type:
                                        </p>
                                    </Col>
                                    <Col lg={8}>
                                        <p className={"lead"}><strong>{user.data.authLevel === 1500 ? "Student" :
                                            user.data.authLevel === 500 ? "Team Member" :
                                                user.data.authLevel === 100 ? "Application Administrator" :
                                                    "Unknown User Type"
                                        }</strong></p>
                                    </Col>
                                    <Col lg={4}>
                                        <p className={"lead"}>
                                            Account Status:
                                        </p>
                                    </Col>
                                    <Col lg={8}>
                                        <p className={"lead"}><strong>{user.data.accountIsLocked === true ? "Locked" :
                                            "Open"
                                        }</strong></p>
                                    </Col>
                                    <Col lg={4}>
                                        <p className={"lead"}>
                                            Login Failures:
                                        </p>
                                    </Col>
                                    <Col lg={8}>
                                        <p className={"lead"}><strong>{user.data.loginAttempts}</strong></p>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} className={"mt-5"}>
                                        <h4 className={"text-decoration-underline"}>Enrolled Courses</h4>
                                        {
                                            user.data.subscribedModules.length === 0 && (
                                                <p className={"lead"}>Not Yet Enrolled In Any Courses</p>
                                            )
                                        }
                                        {
                                            user.data.subscribedModules.length > 0 && (
                                                <ol className={"lead"}>
                                                    {
                                                        user.data.subscribedModules.map((enrollment, index) => (
                                                            <li key={enrollment?.product?.id || `deleted_product__${index}`}>
                                                                <div>{enrollment?.product?.courseTitle || "Deleted Product"}</div>
                                                                <div>
                                                                    <small>Date of
                                                                        Enrollment: {formatDate(enrollment.createdAt)}</small>
                                                                </div>
                                                                <div>
                                                                    <small>Course Completed: Not Yet Completed</small>
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ol>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <Row>
                                    <h4 className={"text-decoration-underline"}>User Profile</h4>
                                    <FormProvider {...methods}>
                                        <form onSubmit={e => e.preventDefault()}
                                              noValidate
                                              className="profile-form mt-0 pt-0"
                                              autoComplete="off">
                                            <div className="row w-100">
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <Input
                                                        {...first_name_validation}
                                                        value={user.data.firstName}
                                                    />
                                                </div>
                                                <div className="col-lg-12 col-md-12  col-sm-12">
                                                    <Input
                                                        {...middle_initial_validation}
                                                        value={user.data.middleInitial}
                                                    />
                                                </div>
                                                <div className="col-lg-12 col-md-12  col-sm-12">
                                                    <Input
                                                        {...last_name_validation}
                                                        value={user.data.lastName}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row w-100">
                                                <div className="col-md-12">
                                                    <Input
                                                        {...email_validation}
                                                        value={user.data.email}
                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <CustomPhoneInput
                                                        {...phone_validation}
                                                        passVal={user.data.phone}
                                                        onChange={(e) => setPhoneNumber({ ...phoneNumber, phoneNumber: e })}
                                                    />
                                                </div>
                                            </div>
                                            {
                                                loadingUpdateAccountLockStatus || loadingUpdateUserDetails ? <Preloader /> : (
                                                    <div
                                                        className="mt-5 w-100 text-center d-flex justify-content-around">
                                                        <button className={"modalButtonAuth buttonAuthLogin btn-danger"}
                                                                type="sumbit"
                                                                onClick={handleAccountLockUpdate}>{user.data.accountIsLocked ? "Unlock" : "Lock"} Account
                                                        </button>
                                                        <button className={"modalButtonAuth buttonAuthLogin"}
                                                                type="sumbit"
                                                                onClick={onSubmit}>Update {user.data.firstName}'s
                                                            Profile
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </form>
                                    </FormProvider>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </>

    );
}

export default AdminUserByIdScreen;