import React, {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useLoginMutation } from "../../../redux/slices/userSlice";
import { setCredentials } from "../../../redux/slices/authSlice";

import {Input, InputError} from "../../shared/ReusableFields/Input/Input";
import { email_validation, password_validation } from "../../../validations/inputValidations";

import {Preloader} from "../../shared/Preloader/Preloader";

import "./Login.css";
export const LoginForm = ({ showForgotPasswordForm, closeModal }) => {
    const methods = useForm();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [login, { isLoading }] = useLoginMutation();

    const handleLoginSubmission = methods.handleSubmit(async (data) => {
        try {
            const res = await login(data).unwrap();
            let userState = {
                authLevel: res.data.authLevel,
                firstName: res.data.firstName,
                _id: res.data._id
            };
            await dispatch(setCredentials({...userState}));
            if(res.success) {
                setSubmissionError(false);
                closeModal();
                return navigate("/user/profile");
            }
        } catch(err) {
            console.log(err);
            // Emit Server Errors
            if(err && err.data) {
                setSubmissionError(true);
                setSubmissionErrorMessage(`${err.data.error}`);
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
        (!formSubmitted && !isLoading) ? (
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
                    <button className={"modalButtonAuth buttonAuthLogin"} type="submit" onClick={handleLoginSubmission} disabled={isLoading}>Submit
                    </button>
                    {
                        submissionError && <div className={"formSubmissionError"}>
                            <InputError message={submissionErrorMessage} />
                        </div>
                    }
                    <button className="discrete styleAsLink" onClick={showForgotPasswordForm} disabled={isLoading}>
                        Forgot Password
                    </button>
                </form>
            </FormProvider>
        ) : <Preloader />;
}