import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

/* Form Imports & Validations*/
import { Input, InputError } from "../../shared/ReusableFields/Input/Input";
import CustomPhoneInput from "../../shared/ReusableFields/PhoneInput/PhoneInput";
import {
  confirm_password_validation,
  email_validation,
  first_name_validation,
  last_name_validation,
  middle_initial_validation,
  password_validation,
  phone_validation,
} from "../../../validations/inputValidations";

/* Redux Slices */
import { useRegisterMutation } from "../../../redux/slices/userSlice";

import { Preloader } from "../../shared/Preloader/Preloader";

// Component Styles
import "react-phone-number-input/style.css"; // <= Move to the Reusable File
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
    if (
      values.phoneNumber === undefined ||
      values.phoneNumber.length !== 12 ||
      values.phoneNumber.length > 12
    ) {
      setSubmissionError(true);
      setSubmissionErrorMessage("Please Correct Your Phone Number");
      return;
    }

    setSubmissionError(false);
    let registrant = {
      firstName: data.first_name,
      middleInitial: data.middle_initial,
      lastName: data.last_name,
      email: data.email,
      password: data.password,
      phone: values.phoneNumber,
    };

    try {
      const res = await register(registrant).unwrap();
      /**
       * For Security:
       * No Matter What, Always Return a Success, even if the app service failed.
       * */
      setFormSubmitted(true);
      setSubmissionError(false);
      setSubmissionErrorMessage("");
    } catch (err) {
      console.error("EMITTED: ", err);
      // Emit Server Errors
      if (err?.response?.data?.error) {
        setSubmissionError(true);
        setSubmissionErrorMessage(`${err?.response?.data?.errorMessage}`);
        return;
      }

      // Emit Server Errors
      if (err?.data?.error) {
        setSubmissionError(true);
        setSubmissionErrorMessage(`${err?.data?.errorMessage}`);
        return;
      }

      // Emit Validation Errors Sent By Server
      if (
        Object.prototype.toString.call(err?.response?.data) === "[object Array]"
      ) {
        let fullValidationMessage = "";
        err.response.data.map((item) => {
          let genericErrorMessageIncluded = item.msg.includes("Invalid value"),
            filterMessages = genericErrorMessageIncluded ? 1 : 0;
          fullValidationMessage += genericErrorMessageIncluded
            ? ""
            : item.msg +
              (err.response.data.length - filterMessages > 1 ? ", " : "");
        });
        setSubmissionError(true);
        setSubmissionErrorMessage(fullValidationMessage);
        return;
      }

      // Emit Network Errors
      if (err.stack && err.name && err.message) {
        setSubmissionError(true);
        setSubmissionErrorMessage(`${err.name}: ${err.message}`);
      }
    }
  });

  return isLoading ? (
    <Preloader />
  ) : !formSubmitted && !isLoading ? (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => e.preventDefault()}
        noValidate
        className="registration-form"
        autoComplete="off"
      >
        <h4 className={"registrationFormHeader"}>
          Register with <span>BodyDynamix</span>
        </h4>
        <p className={"registrationLead"}>
          Register an account with us to sign up for courses!
        </p>
        <div className={"registrantNameBlock"}>
          <div className={"col-md-4 col-sm-12 nameField"}>
            <Input
              {...first_name_validation}
              iconName={"openmoji:european-name-badge"}
            />
          </div>
          <div className={"col-md-3 col-sm-12"}>
            <Input
              {...middle_initial_validation}
              iconName={"openmoji:european-name-badge"}
            />
          </div>
          <div className={"col-md-5 col-sm-12 nameField"}>
            <Input
              {...last_name_validation}
              iconName={"openmoji:european-name-badge"}
            />
          </div>
        </div>
        <Input {...email_validation} iconName={"mdi:email"} />
        <Input {...password_validation} iconName={"mdi:lock"} />
        <Input {...confirm_password_validation} iconName={"mdi:lock"} />
        <CustomPhoneInput
          id={"phonenumber"}
          name={"phonenumber"}
          value={value.phoneNumber}
          onChange={(e) => setValues({ ...values, phoneNumber: e })}
          className="input__field"
          phonenumber={values.phoneNumber}
        />
        <button
          className={"modalButtonAuth buttonAuthLogin"}
          type="submit"
          onClick={handleRegistrationSubmission}
        >
          Register
        </button>
        {submissionError && (
          <div className={"formSubmissionError"}>
            <InputError message={submissionErrorMessage} />
          </div>
        )}
      </form>
    </FormProvider>
  ) : (
    <div className={"forgotPasswordFormSubmitted"}>
      <h2>You're Registered!</h2>
      <p>A welcome email has been sent to your email address on file.</p>
      <p>You may now log into your account and browse our courses!</p>
    </div>
  );
};
