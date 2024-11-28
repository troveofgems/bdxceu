import React, {useState} from "react";
import { findInputError } from '../../../../utils/findInputError';
import { isFormInvalid } from '../../../../utils/isFormInvalid';
import { useFormContext } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { MdError } from 'react-icons/md';
import {InputError} from "../Input/Input";

import "../Input/Input.css";
export const TextArea = ({
                          name,
                          label,
                          type,
                          id,
                          placeholder,
                          validation,
                          className,
                          value,
                          rows
                      }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const inputErrors = findInputError(errors, name);
    const isInvalid = isFormInvalid(inputErrors);

    return (
        <div className={"input__container"} onKeyDown={e => e.stopPropagation()}>
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
            <div className={"input__field__wrapper"}>
                {
                    !!value ? (
                        <textarea
                            id={id}
                            className={"w-100"}
                            placeholder={placeholder}
                            defaultValue={value}
                            rows={rows}
                            {...register(`${name}`, validation)}
                        ></textarea>
                    ) : (
                        <textarea
                            id={id}
                            className={"w-100"}
                            rows={rows}
                            placeholder={placeholder}
                            {...register(`${name}`, validation)}
                        ></textarea>
                    )
                }

            </div>
        </div>
    )
}