export const first_name_validation = {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    id: 'first_name',
    placeholder: 'Sheila',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        maxLength: {
            value: 30,
            message: '30 characters max',
        },
    },
}

export const last_name_validation = {
    name: 'last_name',
    label: 'Last Name',
    type: 'text',
    id: 'last_name',
    placeholder: 'Jackson',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        maxLength: {
            value: 30,
            message: '30 characters max',
        },
    },
}

export const middle_initial_validation = {
    name: 'middle_initial',
    label: 'Middle',
    type: 'text',
    id: 'middle_initial',
    placeholder: 'R.',
    minLength: 0,
    maxLength: 2,
    validation: {
        maxLength: {
            value: 1,
            message: '1 character max',
        },
    },
}

export const email_validation = {
    name: 'email',
    label: 'email',
    type: 'email',
    id: 'email',
    placeholder: 'sheila.jackson@gmail.com',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
}

export const email_validation_readonly = {
    name: 'email',
    label: 'email',
    type: 'email',
    id: 'email'
}

export const password_validation = {
    name: 'password',
    label: 'password',
    type: 'password',
    id: 'password',
    placeholder: '***********',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        minLength: {
            value: 6,
            message: 'min 6 characters',
        },
    },
}

export const confirm_password_validation = {
    name: 'confirm',
    label: 'Confirm Your Password',
    type: 'password',
    id: 'confirm',
    placeholder: '***********',
    validation: {
        required: {
            value: true,
            message: 'Confirm Your Password',
        }
    },
}

export const phone_validation = {
    name: 'phonenumber',
    label: 'Contact Phone Number',
    type: 'tel',
    id: 'phonenumber',
    placeholder: '+1 (000) 000-0000',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
}