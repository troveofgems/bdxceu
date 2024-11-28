import React, {useState} from "react";

import 'react-phone-number-input/style.css';
import {
    confirm_password_validation,
    email_validation,
    first_name_validation,
    last_name_validation,
    middle_initial_validation, password_validation, phone_validation
} from "../../../validations/inputValidations";
import {FormProvider, useForm} from "react-hook-form";
import {Input, InputError} from "../../shared/ReusableFields/Input/Input";

import {useAddTeamMemberMutation, useDeleteTeamMemberMutation, useGetUsersQuery} from "../../../redux/slices/userSlice";

import {TextArea} from "../../shared/ReusableFields/TextArea/TextArea";
import {
    certification_list_validation, role_escalation_validation,
    show_team_member_on_homepage_validation,
    team_member_description_validation
} from "../../../validations/teamValidations";

import CustomPhoneInput from "../../shared/ReusableFields/PhoneInput/PhoneInput";

import {Preloader} from "../../shared/Preloader/Preloader";

// Component Styles
import "./TeamMember.css";
import {Col, Row} from "react-bootstrap";
import {RadioGroup} from "../../shared/ReusableFields/RadioGroup/RadioGroup";
import {course_status_validation} from "../../../validations/productValidations";
export const TeamMemberForm = () => {
    const methods = useForm();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState("");

    const [value, setValue] = useState("");
    const [values, setValues] = useState("");

    const [addTeamMember, { isLoading: isLoadingCreateTeamMember }] = useAddTeamMemberMutation();

    const { refetch } = useGetUsersQuery();

    const handleCreateTeamMemberSubmission = methods.handleSubmit(async (data) => {
        if(values.phoneNumber === undefined || values.phoneNumber.length !== 12 || values.phoneNumber.length > 12) {
            setSubmissionError(true);
            setSubmissionErrorMessage("Please Correct the Phone Number");
            return;
        }

        setSubmissionError(false);
        let teamMember = {
            firstName: data.first_name,
            middleInitial: data.middle_initial,
            lastName: data.last_name,
            email: data.email,
            phone: values.phoneNumber,
            description: data.teamMemberDescription,
            certificationList: data.certificationList,
            showOnHomepage: data.showTeamMemberOnHomepage === "true",
            roleEscalation: data.roleEscalation === "true"
        };

        try {
            const res = await addTeamMember(teamMember).unwrap();
            refetch();

            /**
             * For Security:
             * No Matter What, Always Return a Success, even if the app service failed.
             * */
            setFormSubmitted(true);
            setSubmissionError(false);
            setSubmissionErrorMessage("");
        } catch(err) {
            console.error("EMITTED: ", err);
            // Emit Server Errors
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
            }
        }
    });

    return isLoadingCreateTeamMember ? <Preloader /> :
        !formSubmitted && !isLoadingCreateTeamMember ? (
        <FormProvider {...methods}>
            <form onSubmit={e => e.preventDefault()}
                  noValidate
                  className="add-team-member-form"
                  autoComplete="off"
            >
                <h4 className={"registrationFormHeader"}>Onboard New Team Member To <span>BodyDynamix</span></h4>
                <p className={"registrationLead"}>Expand the Team of Providers</p>
                <div className={"registrantNameBlock"}>
                    <div className={"col-md-4 nameField"}>
                        <Input
                            {...first_name_validation}
                            iconName={"openmoji:european-name-badge"}
                        />
                    </div>
                    <div className={"col-md-3"}>
                        <Input
                            {...middle_initial_validation}
                            iconName={"openmoji:european-name-badge"}
                        />
                    </div>
                    <div className={"col-md-5 nameField"}>
                        <Input
                            {...last_name_validation}
                            iconName={"openmoji:european-name-badge"}
                        />
                    </div>
                </div>
                <Row lg={12} md={12} sm={12} className={"w-100"}>
                    <Col lg={6} md={6} sm={12}>
                        <Input
                            {...email_validation}
                            iconName={"mdi:email"}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <Input
                            {...certification_list_validation}
                            iconName={"mdi:certificate"}
                        />
                    </Col>
                </Row>
                <Row lg={12} md={12} sm={12}>
                    <Col lg={6} md={6} sm={12}>
                        <RadioGroup {...show_team_member_on_homepage_validation} />
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <RadioGroup {...role_escalation_validation} />
                    </Col>
                </Row>
                <CustomPhoneInput
                    id={"phonenumber"}
                    name={"phonenumber"}
                    value={value.phoneNumber}
                    onChange={(e) => setValues({ ...values, phoneNumber: e })}
                    className="input__field"
                    phonenumber={values.phoneNumber}
                />
                <TextArea
                    {...team_member_description_validation}
                />
                <button className={"modalButtonAuth buttonAuthLogin"} type="submit"
                        onClick={handleCreateTeamMemberSubmission}>Add Team Member
                </button>
                {
                    submissionError && <div className={"formSubmissionError"}>
                        <InputError message={submissionErrorMessage} />
                    </div>
                }
            </form>
        </FormProvider>
    ) : (
            <div className={"forgotPasswordFormSubmitted"}>
                <h2>Team Member Registered!</h2>
                <p>This team member has been created and is immediately available on the website.</p>
            </div>
        );
}