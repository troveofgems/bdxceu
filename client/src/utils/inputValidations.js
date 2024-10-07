export const first_name_validation = {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    id: 'first_name',
    placeholder: 'Joan',
    validation: {
        required: {
            value: true,
            message: 'First Name Is Required',
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
    placeholder: 'Kern',
    validation: {
        required: {
            value: true,
            message: 'Last Name Is Required',
        },
        maxLength: {
            value: 30,
            message: '30 characters max',
        },
    },
}

export const middle_initial_validation = {
    name: 'middle_initial',
    label: 'Middle Initial',
    type: 'text',
    id: 'middle_initial',
    placeholder: 'R',
    validation: {
        required: {
            value: false,
        },
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
    placeholder: 'joan.kern@gmail.com',
    validation: {
        required: {
            value: true,
            message: 'Email Is Required',
        }
    },
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
            message: 'Password Is Required',
        },
        minLength: {
            value: 6,
            message: 'min 6 characters',
        },
    },
}

export const confirm_password_validation = {
    name: 'confirm_password',
    label: 'Confirm Your Password',
    type: 'password',
    id: 'confirm_password',
    placeholder: '***********',
    validation: {
        required: {
            value: true,
            message: 'Confirm Your Password Is Required',
        },
        minLength: {
            value: 6,
            message: 'min 6 characters',
        },
    },
}
