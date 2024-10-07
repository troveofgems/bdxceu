import {Icon} from "@iconify/react";
import React from "react";

import {FormProvider, useForm} from "react-hook-form";

import "./Login.css";
import {email_validation, password_validation} from "../../../utils/inputValidations";
import {Input} from "../../shared/ReusableFields/Input/Input";
export const LoginForm = ({ showForgotPasswordForm }) => {
    const methods = useForm();

    const handleLoginSubmission = methods.handleSubmit(data => {
        console.log(data)
    });

    return (
        <FormProvider {...methods}>
        <form
            onSubmit={e => e.preventDefault()}
            noValidate
            className="log-in-form"
            autoComplete="off"
        >
            <h4>We are <span>BodyDynamix</span></h4>
            <p>Welcome back! Login to your account to view today's coursework and newest offerings:</p>
            <Input
                {...email_validation}
                iconName={"mdi:email"}
            />
            <Input
                {...password_validation}
                iconName={"mdi:lock"}
            />
            <button className={"modalButtonAuth buttonAuthLogin"} type="submit" onClick={handleLoginSubmission}>Login
            </button>
            <button className="discrete styleAsLink" onClick={showForgotPasswordForm}>
                Forgot Password
            </button>
        </form>
        </FormProvider>
    );
}