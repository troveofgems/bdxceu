import React, {useState} from "react";
import { findInputError } from '../../../../utils/findInputError';
import { isFormInvalid } from '../../../../utils/isFormInvalid';
import { useFormContext } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { MdError } from 'react-icons/md';

import "./Input.css";
import {DynamicIcon} from "../DynamicIcon/DynamicIcon";
export const Input = ({
                          label, type, id, placeholder, validation,
                          name, iconName,
                          value = undefined, disabled = false,
                          useOnChange = false, onChangeHandler = null
}) => {
    const
        { register, formState: { errors, touchedFields, dirtyFields } } = useFormContext(),
        inputError = findInputError(errors, name),
        isInvalid = isFormInvalid(inputError);

    const handleChange = (id, evt) => {
        console.log("Change? ", id, evt);
    }

    return <div className="input__container">
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
                            message={inputError.error.message}
                            key={inputError.error.message}
                        />
                    )}
                </AnimatePresence>
            </div>
            <div className={"expandableDiv"}></div>
        </div>
        <div className={"input__field__wrapper"}>
            <DynamicIcon icon={iconName}/>
            { value === undefined ? (<input
                aria-autocomplete={"none"}
                id={id}
                type={type}
                className="input__field"
                placeholder={placeholder}
                {...register(name, validation)}
            />) : (<input
                autoComplete={"off"}
                aria-autocomplete={"none"}
                id={id}
                type={type}
                className={`input__field ${disabled ? "disabled" : ""}`}
                defaultValue={value}
                disabled={disabled}
                {...register(name, validation)}
            />)}
        </div>
    </div>;
}
export const InputError = ({message}) => {
    return (
        <motion.p
            className="input__error"
            {...{
                initial: {opacity: 0, y: 10},
                animate: {opacity: 1, y: 0},
                exit: {opacity: 0, y: 10},
                transition: {duration: 0.2}
            }}
        >
            <MdError/>
            <span className={"spanSpacer"}>{message}</span>
        </motion.p>
    );
};