export const course_title_validation = {
    name: 'courseTitle',
    label: 'Course Title',
    type: 'text',
    id: 'courseTitle',
    placeholder: 'NBCE Part I',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        maxLength: {
            value: 100,
            message: '100 characters max',
        },
    },
}

export const course_description_validation = {
    name: 'courseDescription',
    label: 'Course Description',
    type: 'text',
    id: 'courseDescription',
    placeholder: 'Lorem Ipsum...',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        maxLength: {
            value: 1000,
            message: '1000 characters max',
        },
    },
}

export const course_cost_validation = {
    name: 'courseCost',
    label: 'Course Cost $USD',
    type: 'Number',
    id: 'courseCost',
    placeholder: '$175.00',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
}

export const course_status_validation = {
    name: 'courseStatus',
    radioGroupLabel: 'Publish Course',
    type: 'radio',
    id: 'courseStatus',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
    label_1: "Inactive",
    label_2: "Publish"
}

export const course_instructor_validation = {
    name: 'courseInstructor',
    label: 'Course Instructor',
    id: 'courseInstructor',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
    },
}

export const course_passing_grade_validation = {
    name: 'coursePassingGrade',
    label: 'Course Passing Grade',
    type: 'number',
    id: 'coursePassingGrade',
    placeholder: '0.75',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
}

export const course_certificate_link_validation = {
    name: 'course_certificate_link',
    label: 'Contact Phone Number',
    type: 'tel',
    id: 'course_certificate_link',
    placeholder: 'https://www.bdxceu.com/:courseId/certificate',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
}

export const course_video_list_validation = {
    name: 'courseVideoList',
    label: 'Course Video List',
    type: 'text',
    id: 'courseVideoList',
    placeholder: 'https://www.youtube.com/:pathToVideo',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
}

export const course_exam_list_validation = {
    name: 'courseExamList',
    label: 'Course Exam List',
    type: 'text',
    id: 'courseExamList',
    validation: {
/*        required: {
            value: true,
            message: 'Is Required',
        }*/
    },
}

export const publish_course_validation = {
    name: 'publishCourse',
    label: 'Publish Course',
    type: 'radio',
    id: 'publishCourse',
    validation: {
                required: {
                    value: true,
                    message: 'Is Required',
                    default: false
                }
    },
}