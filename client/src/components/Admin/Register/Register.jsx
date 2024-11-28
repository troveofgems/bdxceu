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

import { useRegisterMutation } from "../../../redux/slices/userSlice";

import CustomPhoneInput from "../../shared/ReusableFields/PhoneInput/PhoneInput";

import {Preloader} from "../../shared/Preloader/Preloader";

// Component Styles
import "./Register.css";
export const RegistrationForm = () => {
    const methods = useForm();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState("");

    const [value, setValue] = useState("");
    const [values, setValues] = useState("");

    const [register, { isLoading }] = useRegisterMutation();

    const handleRegistrationSubmission = methods.handleSubmit(async (data) => {
        if(values.phoneNumber === undefined || values.phoneNumber.length !== 12 || values.phoneNumber.length > 12) {
            setSubmissionError(true);
            setSubmissionErrorMessage("Please Correct the Phone Number");
            return;
        }

        setSubmissionError(false);
        let administrator = {
            firstName: data.first_name,
            middleInitial: data.middle_initial,
            lastName: data.last_name,
            email: data.email,
            password: data.password,
            phone: values.phoneNumber
        };

        try {
            const res = await register(administrator).unwrap();

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
            if(err?.data?.error) {
                setSubmissionError(true);
                setSubmissionErrorMessage(`${err?.data?.errorMessage}`);
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

    return isLoading ? <Preloader /> :
        !formSubmitted && !isLoading ? (
        <FormProvider {...methods}>
            <form onSubmit={e => e.preventDefault()}
                  noValidate
                  className="registration-form"
                  autoComplete="off"
            >
                <h4 className={"registrationFormHeader"}>Onboard New Administrator For <span>BodyDynamix</span></h4>
                <p className={"registrationLead"}>Create a New Administrator Account</p>
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
                <Input
                    {...email_validation}
                    iconName={"mdi:email"}
                />
                <Input
                    {...password_validation}
                    iconName={"mdi:lock"}
                />
                <Input
                    {...confirm_password_validation}
                    iconName={"mdi:lock"}
                />
                <CustomPhoneInput
                    id={"phonenumber"}
                    name={"phonenumber"}
                    value={value.phoneNumber}
                    onChange={(e) => setValues({ ...values, phoneNumber: e })}
                    className="input__field"
                    phonenumber={values.phoneNumber}
                />
                <button className={"modalButtonAuth buttonAuthLogin"} type="submit"
                        onClick={handleRegistrationSubmission}>Register
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
                <h2>You're Registered!</h2>
                <p>A welcome email has been sent to your email address on file.</p>
                <p>
                    You may now log into your account and browse our courses!
                </p>
            </div>
        );
}