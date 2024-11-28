export const site_settings_address_validation = {
    name: 'address',
    label: '',
    type: 'text',
    id: 'address',
    placeholder: '1011 Rancho Conejo Blvd. Thousand Oaks, CA 91320',
    validation: {
        maxLength: {
            value: 150,
            message: '150 characters max',
        },
    },
}

export const email_validation_readonly = {
    name: 'email',
    label: '',
    type: 'email',
    id: 'email',
    placeholder: 'support@bdxceu.com'
}

export const site_settings_facility_morning_hours_validation = {
    name: 'morningHours',
    label: '',
    type: 'text',
    id: 'morningHours',
    placeholder: '07:00 (7:00 AM)',
    validation: {
        maxLength: {
            value: 100,
            message: '100 characters max',
        },
    },
}

export const site_settings_facility_evening_hours_validation = {
    name: 'eveningHours',
    label: '',
    type: 'text',
    id: 'eveningHours',
    placeholder: '17:00 (5:00 PM)',
    validation: {
        maxLength: {
            value: 100,
            message: '100 characters max',
        },
    },
}

export const site_settings_live_courses_validation = {
    name: 'liveCourses',
    label: '',
    type: 'text',
    id: 'liveCourses',
    placeholder: 'January 1st, 2025',
    validation: {
        maxLength: {
            value: 100,
            message: '100 characters max',
        },
    },
}

export const site_settings_recorded_courses_validation = {
    name: 'recordedCourses',
    label: '',
    type: 'text',
    id: 'recordedCourses',
    placeholder: 'Open Enrollment!',
    validation: {
        maxLength: {
            value: 100,
            message: '100 characters max',
        },
    },
}


export const site_settings_socials_alt_website_validation = {
    name: 'socialsWebsite',
    label: '',
    type: 'text',
    id: 'socialsWebsite',
    placeholder: '',
    validation: {
        maxLength: {
            value: 360,
            message: '360 characters max',
        },
    },
}

export const site_settings_socials_facebook_validation = {
    name: 'socialsFacebook',
    label: '',
    type: 'text',
    id: 'socialsFacebook',
    placeholder: '',
    validation: {
        maxLength: {
            value: 250,
            message: '250 characters max',
        },
    },
}