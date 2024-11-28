import React, {useEffect, useState} from "react";
import {findInputError} from '../../../../utils/findInputError';
import {isFormInvalid} from '../../../../utils/isFormInvalid';
import {useFormContext} from 'react-hook-form';
import {AnimatePresence, motion} from 'framer-motion';
import {MdError} from 'react-icons/md';
import {InputError} from "../Input/Input";

export const Selector = ({
    name,
    label,
    id,
    validation,
    data,
    selectorType = undefined,
    passVal = undefined
}) => {
    const {
        register,
        formState: {errors},
    } = useFormContext();

    const inputErrors = findInputError(errors, name);
    const isInvalid = isFormInvalid(inputErrors);

    return (
        <div className={"input__container"}>
            <div className="input__wrap">
                <div className="input__label__container">
                    <label htmlFor={id} className="input__label">
                        {label}
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
            {
                passVal === undefined ? (
                    <div className={"input__field__wrapper"}>
                        <select {...register(`${name}`, validation)} id={name} className={"w-100"}>
                            {selectorType.includes("team-member") && data.map(teamMember => (
                                <option
                                    id={teamMember._id}
                                    key={teamMember._id}
                                    value={teamMember._id}
                                >
                                    {teamMember.lastName}, {teamMember.firstName.charAt(0)}. {teamMember.certificationList.length === 0 ? "" : `- ${teamMember.certificationList.join(", ")}`}
                                </option>
                            ))}
                            {selectorType.includes("passing-grade") && data.map(grade => (
                                <option
                                    id={grade._id}
                                    key={grade._id}
                                    value={grade._id}>
                                    [{grade.gradeRange.min} - {grade.gradeRange.max}] {grade.letterGrade}
                                </option>
                            ))}
                            {selectorType.includes("product-link") && data.map(product => (
                                <option
                                    id={product._id}
                                    key={product._id}
                                    value={product._id}>
                                    {product.courseTitle}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div className={"input__field__wrapper"}>
                        <select {...register(`${name}`, validation)} defaultValue={passVal}>
                            {selectorType.includes("team-member") && data.map(teamMember => (
                                <option
                                    id={teamMember._id}
                                    key={teamMember._id}
                                    value={teamMember._id}
                                    selected={(passVal === teamMember._id)}
                                >
                                    {teamMember.lastName}, {teamMember.firstName.charAt(0)}. {teamMember.certificationList.length === 0 ? "" : `- ${teamMember.certificationList.join(", ")}`}
                                </option>
                            ))}
                            {selectorType.includes("passing-grade") && data.map(grade => (
                                <option
                                    id={grade._id}
                                    key={grade._id}
                                    value={grade._id}
                                    selected={(passVal === grade._id)}
                                >
                                    [{grade.gradeRange.min} - {grade.gradeRange.max}] {grade.letterGrade}
                                </option>
                            ))}
                        </select>
                    </div>
                )
            }
        </div>
    )
}

