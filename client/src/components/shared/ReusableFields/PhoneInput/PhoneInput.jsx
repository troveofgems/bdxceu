import React, { forwardRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import {useFormContext} from "react-hook-form";
import {findInputError} from "../../../../utils/findInputError";
import {isFormInvalid} from "../../../../utils/isFormInvalid";
import {AnimatePresence} from "framer-motion";
import {InputError} from "../Input/Input";
import {phone_validation} from "../../../../validations/inputValidations";

const CustomPhoneInput = forwardRef((props, ref) => {
    const { value: propPassedValue, useLabel = true, showValidationMessage = true, onChange, ...otherProps } = props;
    let value = propPassedValue === undefined ? otherProps.phonenumber : propPassedValue

    let { register, formState: { errors, isDirty, touchedFields } } = useFormContext(),
        inputError = value === undefined ? {} : findInputError(errors, "phonenumber"),
        isInvalid = value === undefined ? false : isFormInvalid(inputError);

    if(!otherProps.phonenumber) {
        isInvalid = true;
    }

    // Create a local state to manage the input value
    const [localValue, setLocalValue] = React.useState(value || otherProps.passVal);

    if(!!otherProps.passVal) {
        inputError = findInputError(errors, "phonenumber");
        isInvalid = isFormInvalid(inputError);
    }

   /* console.log("Touched Fields? ", touchedFields, isDirty)
*/
    // Handle changes separately to maintain the input value
    const handleChange = (inputPhone, countryData) => {
        setLocalValue(inputPhone);
        onChange(inputPhone, countryData);
    };

    return (
        <div className="input__container">
            <div className="input__wrap">
                {
                    useLabel ? (
                        <div className="input__label__container">
                            <label htmlFor={props.id} className="input__label">
                                {phone_validation.label}
                            </label>
                        </div>
                    ) : <></>
                }
                {
                    showValidationMessage && (
                        <div>
                            <AnimatePresence mode="wait" initial={false}>
                                {isInvalid && isDirty && (
                                    <InputError
                                        message={phone_validation.validation.required.message}
                                        key={phone_validation.validation.required.message}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    )
                }
                <div className={"expandableDiv"}></div>
            </div>
            <div className={"input__field__wrapper"}>
                <PhoneInput
                    international={true}
                    defaultCountry={"US"}
                    withCountryCallingCode={true}
                    id={"phonenumber"}
                    name={"phonenumber"}
                    value={localValue}
                    onChange={handleChange}
                    inputextraatrributes={{ref}}
                />
            </div>
        </div>
    );
});

export default CustomPhoneInput;
