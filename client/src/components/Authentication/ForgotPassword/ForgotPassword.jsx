import React, {useState} from "react";

import { Preloader } from "../../shared/Preloader/Preloader";
import {FormProvider, useForm} from "react-hook-form";
import {Input, InputError} from "../../shared/ReusableFields/Input/Input";
import { email_validation } from "../../../validations/inputValidations";

import "./ForgotPassword.css";
import {useRequestPasswordResetMutation} from "../../../redux/slices/userSlice";


export const ForgotPassword = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState("");
    const methods = useForm();

    const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();

    const handleForgotPasswordSubmission = methods.handleSubmit(async (data) => {
        try {
            const res = await requestPasswordReset(data).unwrap();
            console.log("Res was: ", res);
            /**
             * For Security:
             * No Matter What, Always Return a Success, even if the app service failed.
             * */
            setFormSubmitted(true);
            setSubmissionError(false);
        } catch(err) {
            // Emit Network Errors
            if(err.stack && err.name && err.message) {
                setSubmissionError(true);
                setSubmissionErrorMessage(`${err.name}: ${err.message}`);
            }
        }
    });

    return (isLoading) ? <Preloader /> :
        !isLoading && !formSubmitted? (
            <FormProvider {...methods}>
                <form
                    onSubmit={e => e.preventDefault()}
                    noValidate
                    className="forgot-password-form"
                    autoComplete="off"
                >
                    <h4 className={"mb-2"}>We are <span>BodyDynamix</span></h4>
                    <p className={"lead"}>Need help resetting your password?</p>
                    <Input
                        {...email_validation}
                        iconName={"mdi:email"}
                    />
                    {
                        !isLoading && (
                            <button className={"modalButtonAuth buttonAuthLogin modalButtonSubmit"} type="submit"
                                    onClick={handleForgotPasswordSubmission}>Submit
                            </button>
                        )
                    }
                    {
                        submissionError && <div className={"formSubmissionError"}>
                            <InputError message={submissionErrorMessage} />
                        </div>
                    }
                </form>
            </FormProvider>
        ) : (
            <div className={"forgotPasswordFormSubmitted"}>
                <h2 className={"mb-5"}>Request Submitted</h2>
                <p className={"lead"}>A request to reset your password has been submitted.</p>
                <p className={"lead"}>
                    If the account exists, you will receive an email to the address on file. Be sure to check your
                    spam and junk folders.
                </p>
            </div>
    );
}

