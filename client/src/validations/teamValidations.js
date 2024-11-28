export const team_member_description_validation = {
    name: 'teamMemberDescription',
    label: 'Team Member Description',
    type: 'text',
    id: 'teamMemberDescription',
    placeholder: 'Lorem Ipsum...',
    rows: '5',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        maxLength: {
            value: 500,
            message: '500 characters max',
        },
    },
}

export const certification_list_validation = {
    name: 'certificationList',
    label: 'Certification List',
    type: 'text',
    id: 'certificationList',
    placeholder: 'DC, CSCS',
    validation: {
        required: {
            value: false,
        },
        maxLength: {
            value: 500,
            message: '500 characters max',
        },
    },
}

export const show_team_member_on_homepage_validation = {
    name: 'showTeamMemberOnHomepage',
    radioGroupLabel: 'Show Team Member On Homepage',
    type: 'radio',
    id: 'showTeamMemberOnHomepage',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
    label_1: "Hide",
    label_2: "Show"
}

export const role_escalation_validation = {
    name: 'roleEscalation',
    radioGroupLabel: 'User Type',
    type: 'radio',
    id: 'roleEscalation',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
    label_1: "Team Member",
    label_2: "App Administrator & Team Member",
}