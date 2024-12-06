import React, {useEffect, useState} from "react";
import {
    useGetTeamMemberByIdQuery,
    useUpdateAccountLockStatusMutation, useUpdateTeamMemberDetailsMutation,
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
import DanielsHeadshot from "../../../assets/images/team/daniels_headshot_4.jpg";
import StanislawskiHeadshot from "../../../assets/images/team/stanislawski_headshot_2.jpg";
import AnonProfile from "../../../assets/images/placeholders/anon_profile.png";
import {
    certification_list_validation, role_escalation_validation,
    show_team_member_on_homepage_validation,
    team_member_description_validation
} from "../../../validations/teamValidations";
import {TextArea} from "../../shared/ReusableFields/TextArea/TextArea";
import {RadioGroup} from "../../shared/ReusableFields/RadioGroup/RadioGroup";

const AdminTeamMemberByIdScreen = () => {
    const {teamMemberId} = useParams();
    const { data: user, isLoading: loadingUser, refetch, error: teamMemberError } = useGetTeamMemberByIdQuery(teamMemberId);
    const [updateTeamMemberDetails, { isLoading: loadingUpdateTeamMemberDetails }] = useUpdateTeamMemberDetailsMutation();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState("");

    const methods = useForm();

    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        if(!loadingUser && !!user) {
            setPhoneNumber(user.data.phone);
        }
        refetch();
    }, [loadingUser]);

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
            let profileUpdates = {
                teamMemberId: user?.data?._id,
                userProfileId: user?.data?.userId,
                sharedUpdates: {
                    firstName: updates.first_name,
                    middleInitial: updates.middle_initial,
                    lastName: updates.last_name,
                    email: user?.data?.email,
                    phone: phoneNumber.phoneNumber === undefined ? null : phoneNumber.phoneNumber
                },
                teamModelUpdates: {
                    description: updates.teamMemberDescription,
                    showOnHomepage: updates.showTeamMemberOnHomepage === "true"
                },
                userModelUpdates: {
                    authLevel: updates.roleEscalation === "true" ? 100 : 500
                }
            };

            console.log("Update to Admin Level? ", updates);
            try {
                const res = await updateTeamMemberDetails({ teamMemberId: `${user?.data?._id}`, updates: profileUpdates}).unwrap();
                console.log("Res Was: ", res);
                return refetch();
            } catch(err) {
                if(err?.response?.data?.error) {
                    setSubmissionError(true);
                    setSubmissionErrorMessage(`${err?.response?.data?.errorMessage}`);
                    return;
                }

                // Emit Server Errors
                if(err?.data?.success === false) {
                    setSubmissionError(true);
                    setSubmissionErrorMessage(`${err?.data?.error}`);
                    return;
                }
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

    const [updateAccountLockStatus, { isLoading: loadingUpdateAccountLockStatus }] = useUpdateAccountLockStatusMutation();

    const handleAccountLockUpdate = async () => {
        let updates = { unlockAccount:  user.data.accountIsLocked, isTeamMember: true, email: user.data.email };

        // Use the Mutation...
        const res = await updateAccountLockStatus({ userId: user.data._id, updates }).unwrap();

        console.log("Response was? ", res);
        refetch();
    }

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
                                        user.data.email === "lauren@sportsacademy.us" ? LaurenJung :
                                    user.data.email === "beau@sportsacademy.us" ? DanielsHeadshot :
                                    user.data.email === "eddie@sportsacademy.us" ? StanislawskiHeadshot : AnonProfile
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
                                        <p className={"lead"}>Team Member Id:</p>
                                    </Col>
                                    <Col lg={8}>
                                        <p className={"lead"}><strong>{user.data._id}</strong></p>
                                    </Col>
                                    <Col lg={4}>
                                        <p className={"lead"}>User Account Id:</p>
                                    </Col>
                                    <Col lg={8}>
                                        <p className={"lead"}><strong>{user.data.userId}</strong></p>
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
                                        <h4 className={"text-decoration-underline"}>Taught Courses</h4>
                                        {
                                            user.data?.taughtCourses?.length === 0 && (
                                                <p className={"lead"}>Not Yet Teaching Any Courses</p>
                                            )
                                        }
                                        {
                                            user.data?.taughtCourses?.length > 0 && (
                                                <ol className={"lead"}>
                                                    {
                                                        user.data.taughtCourses.map(course => (
                                                            <li key={course._id} className={"mb-2"}>
                                                                <div>{course.courseTitle}</div>
                                                                <div>
                                                                    <small>Student Roster</small>
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ol>
                                            )
                                        }
                                        {
                                            user.data?.subscribedModules?.length > 0 && (
                                                <ol className={"lead"}>
                                                    {
                                                        user.data.subscribedModules.map(enrollment => (
                                                            <li key={enrollment.product.id}>
                                                                <div>{enrollment.product.courseTitle}</div>
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
                                    {
                                        loadingUpdateAccountLockStatus || loadingUpdateTeamMemberDetails ? <Preloader /> : (
                                            <FormProvider {...methods}>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                    }}
                                                    noValidate
                                                    className="profile-form mt-0 pt-0"
                                                    autoComplete="off">
                                                    <div className="row w-100" onChange={e => e.stopPropagation()}>
                                                        <div>
                                                            <RadioGroup {...show_team_member_on_homepage_validation}
                                                                        passVal={user.data.showOnHomepage}
                                                            />
                                                        </div>
                                                        <div>
                                                            <RadioGroup {...role_escalation_validation}
                                                                        passVal={ (user.data.authLevel === 100) }
                                                            />
                                                        </div>
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
                                                        <div className={"col-lg-12"}>
                                                            <Input
                                                                {...certification_list_validation}
                                                                value={user.data.certificationList}
                                                            />
                                                        </div>
                                                        <div className={"col-lg-12"}>
                                                            <TextArea
                                                                {...team_member_description_validation}
                                                                value={user.data.description}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-5 w-100 text-center d-flex justify-content-around">
                                                        <button className={"modalButtonAuth buttonAuthLogin btn-danger"} type="button"
                                                                onClick={handleAccountLockUpdate}>{user.data.accountIsLocked ? "Unlock" : "Lock"} Account
                                                        </button>
                                                        <button className={"modalButtonAuth buttonAuthLogin"} type="submit"
                                                                onClick={onSubmit}>Update {user.data.firstName}'s Profile
                                                        </button>
                                                    </div>
                                                </form>
                                            </FormProvider>
                                        )
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </>

    );
}

export default AdminTeamMemberByIdScreen;