import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";

/* Page Spinner */
import { Preloader } from "../../shared/Preloader/Preloader";

/* Form Imports & Validation Imports */
import {Input, InputError} from "../../shared/ReusableFields/Input/Input";
import { password_validation, confirm_password_validation } from "../../../validations/inputValidations";
import {Container} from "react-bootstrap";
import {useChangePasswordMutation} from "../../../redux/slices/userSlice";

import "./ChangePassword.css";
export const ChangePasswordPage = () => {
    const { resetToken } = useParams();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState("");
    const methods = useForm();

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    useEffect(() => {
    }, []);

    const handleChangePasswordSubmission = methods.handleSubmit(async (data) => {
        console.log("Data to send: ", data, resetToken);
        setSubmissionError(false);
        setSubmissionErrorMessage(null);
        if(data.password !== data.confirm) {
            setSubmissionError(true);
            return setSubmissionErrorMessage(`Your Passwords Must Match!`);
        }

        let updates = {
            password: data.password,
            passwordConfirmation: data.confirm
        }

        try {
            const res = await changePassword({ updates, resetToken }).unwrap();
            console.log("Res Was: ", res);
            if(res.success) {
                setFormSubmitted(true);
                setSubmissionError(false);
            } else {
                console.log("Set expired: ", res)
                setSubmissionError(true);
                setSubmissionErrorMessage(res.data.message);
            }
        } catch(err) {
            if(err.status === 400) {
                setSubmissionError(true);
                setSubmissionErrorMessage(err.data);
            }
        }
    });

    return isLoading ? <Preloader /> :
        !formSubmitted && !isLoading ? (
            <FormProvider {...methods}>
                <form
                    onSubmit={e => e.preventDefault()}
                    noValidate
                    className="forgot-password-form"
                    autoComplete="off"
                >
                    <Container>
                        <h2>We are <span>BodyDynamix</span> and Here To Help</h2>
                        <p className={"lead"}>Let's Reset Your Password!</p>
                        <div className={"mb-5"}>
                            <Input
                                {...password_validation}
                                iconName={"mdi:lock"}
                            />
                        </div>
                        <Input
                            {...confirm_password_validation}
                            iconName={"mdi:lock"}
                        />
                        {
                            submissionError && (
                                <div className={"errorContainer mt-5"}>
                                    { typeof submissionErrorMessage === "string" ? (
                                        <InputError message={submissionErrorMessage}/>
                                    ) : (
                                        <>
                                            {submissionErrorMessage.map((generatedError, index) => (
                                                <div className={"mt-2 mb-2"} key={index}>
                                                    <InputError message={generatedError.msg}/>
                                                </div>
                                            ))}
                                        </>
                                    ) }
                                </div>
                            )
                        }
                        <div className={"text-center"}>
                            <button className={"modalButtonAuth buttonAuthLogin modalButtonSubmit"} type="submit"
                                    onClick={handleChangePasswordSubmission}>Change Password
                            </button>
                        </div>
                    </Container>
                </form>
            </FormProvider>
        ) : (
            <Container className={"mt-5 text-center"}>
                <h2 className={"mb-5"}>Password Successfully Changed!</h2>
                <p className={"lead"}>We have processed your password change.</p>
                <p className={"lead"}>
                    You may now log into your account. If your account is locked, please reach out to support.
                </p>
            </Container>
        );
}