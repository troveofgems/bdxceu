import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Input} from "../../shared/ReusableFields/Input/Input";

import { email_validation } from "../../../utils/inputValidations";

import "./ForgotPassword.css";
export const ForgotPassword = () => {
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const methods = useForm();

    const handleForgotPasswordSubmission = methods.handleSubmit(data => {
        console.log(data);
        setFormSubmitted(true);
        fetch("/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: data.email }),
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);

        })
    });

    return !formSubmitted ? (
            <FormProvider {...methods}>
                <form
                    onSubmit={e => e.preventDefault()}
                    noValidate
                    className="forgot-password-form"
                    autoComplete="off"
                >
                    <h4>We are <span>BodyDynamix</span></h4>
                    <p>Need help resetting your password?</p>
                    <Input
                        {...email_validation}
                        iconName={"mdi:email"}
                    />
                    <button className={"modalButtonAuth buttonAuthLogin modalButtonSubmit"} type="submit"
                            onClick={handleForgotPasswordSubmission}>Submit
                    </button>
                </form>
            </FormProvider>
            ) : (
        <div className={"forgotPasswordFormSubmitted"}>
            <h2>Request Submitted</h2>
            <p>A request to reset your password has been submitted.</p>
            <p>
                If the account exists, you will receive an email to the address on file. Be sure to check your
                spam and junk folders.
            </p>
        </div>
    );
}