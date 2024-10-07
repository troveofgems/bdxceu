import React, {useState} from "react";

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {
    confirm_password_validation,
    email_validation,
    first_name_validation,
    last_name_validation,
    middle_initial_validation, password_validation
} from "../../../utils/inputValidations";
import {FormProvider, useForm} from "react-hook-form";
import {Input} from "../../shared/ReusableFields/Input/Input";

import "./Register.css";
export const RegistrationForm = () => {
    const methods = useForm();
    const [value, setValue] = useState();

    const handleRegistrationSubmission = methods.handleSubmit(data => {
        console.log(data)
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={e => e.preventDefault()}
                  noValidate
                  className="registration-form"
                  autoComplete="off"
            >
                <h4 className={"registrationFormHeader"}>Register with <span>BodyDynamix</span></h4>
                <p className={"registrationLead"}>Register an account with us to sign up for classes!</p>
                <Input
                    {...first_name_validation}
                    iconName={"openmoji:european-name-badge"}
                />
                <Input
                    {...middle_initial_validation}
                    iconName={"openmoji:european-name-badge"}
                />
                <Input
                    {...last_name_validation}
                    iconName={"openmoji:european-name-badge"}
                />
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
                <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}
                    required={true}
                />
                <button className={"modalButtonAuth buttonAuthLogin"} type="submit"
                        onClick={handleRegistrationSubmission}>Register
                </button>
            </form>
        </FormProvider>
    );
}