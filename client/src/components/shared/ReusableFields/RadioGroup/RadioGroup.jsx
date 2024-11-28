import React from "react";
import { findInputError } from '../../../../utils/findInputError';
import { isFormInvalid } from '../../../../utils/isFormInvalid';
import { useFormContext } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { MdError } from 'react-icons/md';
import {Input, InputError} from "../Input/Input";

import "../Input/Input.css";
import "./RadioGroup.css";
import {Col, Row} from "react-bootstrap";
export const RadioGroup = ({
    name, radioGroupLabel, type, id, validation,
    label_1 = null, label_2 = null,
    passVal = null
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const inputErrors = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputErrors)

    return (
        <div className={"radioBody input__container"}>
            <div className="input__wrap">
                <div className="input__label__container">
                    <label htmlFor={name} className="input__label">
                        {radioGroupLabel}
                    </label>
                </div>
                <div>
                    <AnimatePresence mode="wait" initial={false}>
                        {isInvalid && (
                            <InputError
                                message={inputErrors.error.message}
                                key={inputErrors.error.message}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <Row lg={12} md={12} className={"d-flex"}>
                <Col lg={6} md={6} sm={12}>
                    <label htmlFor="shouldBeInactive">
                        <input
                            type={type}
                            value={"false"}
                            id={`field_${label_1}`}
                            className="overrideWebkitAppearance"
                            defaultChecked={passVal === null ? true : !passVal }
                            {...register(name)}
                        />
                        {label_1 !== null ? label_1 : "Inactive"}
                    </label>
                </Col>
                <Col lg={6} md={6} sm={12}>
                    <label htmlFor="shouldBePublished">
                        <input
                            type={type}
                            value={"true"}
                            id={`field_${label_2}`}
                            defaultChecked={passVal === null ? false : passVal }
                            className="overrideWebkitAppearance"
                            {...register(name)}
                        />
                        {label_2 !== null ? label_2 : "Publish"}
                    </label>
                </Col>
            </Row>
        </div>
    )
}