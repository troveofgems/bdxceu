import React, {useEffect} from 'react';
import {useFieldArray, useFormContext} from "react-hook-form";
import {AnimatePresence} from "framer-motion";
import {InputError} from "../Input/Input";
import {findInputError} from "../../../../utils/findInputError";
import {isFormInvalid} from "../../../../utils/isFormInvalid";
import {Col, Row} from "react-bootstrap";

import "./GenericControllerField.css";

const GenericControllerField = ({ name, label, placeholder, passVal = null, useCheckboxMarker= false, sourceIsUpdatesToExam = false, markedAsCorrect = null }) => {
    const {control, register, formState: { errors }} = useFormContext();

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name,
    });

    const
        sanitizedLabel = label.split("List"),
        labelForButtons = sanitizedLabel[0];

    const inputError = findInputError(errors, name),
        isInvalid = isFormInvalid(inputError);

    useEffect(() => {
        if(!!passVal && fields.length === 0) {
            replace(passVal);
        }
    }, [passVal, append]);

    return (
        <div className="input__container">
            <div className="input__wrap">
                <div className="input__label__container">
                    <label htmlFor={name} className="input__label">
                        {label}
                    </label>
                </div>
                <div>
                    <AnimatePresence mode="wait" initial={false}>
                        {isInvalid && (
                            <InputError
                                message={inputError.error.message}
                                key={inputError.error.message}
                            />
                        )}
                    </AnimatePresence>
                </div>
                <div className={"expandableDiv"}></div>
            </div>
            {passVal === null ? fields.map((field, i) => (
                <Row key={i}>
                    <Col lg={7}>
                        <input
                            className={"w-100"}
                            {...register(`${name}.${i}.name`)}
                            placeholder={placeholder}
                        />
                    </Col>
                    <Col lg={2} className={"checkboxPadding align-self-center"}>
                        {
                            useCheckboxMarker && (
                                <div className="checkbox-wrapper-19 d-flex">
                                    <input
                                        id={`${name}.${i}.markedCorrect`}
                                        type="checkbox"
                                        className={"markCorrectCheckbox"}
                                        {...register(`${name}.${i}.markedCorrect`)}
                                    />
                                    <label htmlFor={`${name}.${i}.markedCorrect`} className="check-box checkBoxLabel"/>
                                    <span className={"check-box-label"}>Mark Correct</span>
                                </div>
                            )
                        }
                    </Col>
                    <Col lg={3} className={"text-center"}>
                        <button className={"button-29-ruby"} type="button"
                                onClick={() => remove(i)}>
                            Remove
                        </button>
                    </Col>
                </Row>
            )) : fields.map((field, i) => (
                <Row key={field.id}>
                    <Col lg={7}>
                        <input
                            className={"w-100"}
                            {...register(`${name}.${i}.name`, {})}
                            placeholder={placeholder}
                            defaultValue={sourceIsUpdatesToExam ? passVal[i] : field.name}
                        />
                    </Col>
                    <Col lg={2} className={"checkboxPadding align-self-center"}>
                        {
                            useCheckboxMarker && (
                                <div className="checkbox-wrapper-19 d-flex">
                                    <input
                                        id={`${name}.${i}.markedCorrect`}
                                        type="checkbox"
                                        className={"markCorrectCheckbox"}
                                        {...register(`${name}.${i}.markedCorrect`)}
                                        defaultChecked={
                                            typeof markedAsCorrect === 'string' ? ((parseInt(markedAsCorrect) - 1) === i) :
                                            typeof markedAsCorrect === 'object' ? markedAsCorrect.includes(i + 1) : false
                                        }
                                    />
                                    <label
                                        htmlFor={`${name}.${i}.markedCorrect`}
                                        className={"check-box checkBoxLabel"}
                                    />
                                    <span className={'check-box-label'}>Mark{
                                        typeof markedAsCorrect === 'string' && ((parseInt(markedAsCorrect) - 1) === i) ? "ed" :
                                        typeof markedAsCorrect === 'object' && markedAsCorrect.includes(i + 1) ? "ed" : ""
                                    } Correct</span>
                                </div>
                            )
                        }
                    </Col>
                    <Col lg={3} className={"text-center"}>
                        <button className={"button-29-ruby"} type="button"
                                onClick={() => remove(i)}>
                            Remove
                        </button>
                    </Col>
                </Row>
            ))}
            <button className={"button-29 mt-5"} type="button"
                    onClick={() => append({name: ''})}
            >
                Add {labelForButtons}
            </button>
        </div>)
};

export default GenericControllerField;