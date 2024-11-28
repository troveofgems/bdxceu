export const exam_title_validation = {
    name: 'examTitle',
    label: 'Exam Title',
    type: 'text',
    id: 'examTitle',
    placeholder: 'NBCE Part I Exam',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        maxLength: {
            value: 2000,
            message: '2000 characters max',
        },
    },
}

export const exam_synopsis_validation = {
    name: 'examSynopsis',
    label: 'Exam Synopsis',
    type: 'text',
    id: 'examSynopsis',
    placeholder: 'Lorem Ipsum...',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        maxLength: {
            value: 2000,
            message: '2000 characters max',
        },
    },
}

export const number_of_questions_validation = {
    name: 'nrOfQuestions',
    label: 'Number Of Questions',
    type: 'Number',
    id: 'nrOfQuestions',
    min: 1,
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        minValue: 1
    },
}

export const exam_question_validation = {
    name: 'question_',
    label: 'Exam Question',
    id: 'question_',
    placeholder: 'How often are chiropractors generally required to complete continuing education to maintain their license?',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        maxLength: {
            value: 2000,
            message: '2000 characters max',
        },
    },
}

export const exam_correct_answer_message_validation = {
    name: 'examCorrectAnswerMessage',
    label: 'Correct Answer Message',
    id: 'examCorrectAnswerMessage',
    placeholder: 'Correct!',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        maxLength: {
            value: 2000,
            message: '2000 characters max',
        },
    },
}

export const exam_incorrect_answer_message_validation = {
    name: 'examIncorrectAnswerMessage',
    label: 'Incorrect Answer Message',
    id: 'examIncorrectAnswerMessage',
    placeholder: 'Your answer is incorrect.',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        maxLength: {
            value: 2000,
            message: '2000 characters max',
        },
    },
}

export const exam_answer_explanation_message_validation = {
    name: 'examAnswerExplanationMessage',
    label: 'Explanation For Answer Message',
    id: 'examAnswerExplanationMessage',
    placeholder: 'Chiropractic Continuing Education Requirements are determined by State. ' +
        'Generally Chiropractors are required to complete continuing education every two years.\n\n' +
        'For detailed information visit: https://chirohrs.com/chiropractic-continuing-education-requirements-blog/',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        },
        maxLength: {
            value: 2000,
            message: '2000 characters max',
        },
    },
}

export const shuffle_questions_validation = {
    name: 'options.shuffleQuestions',
    radioGroupLabel: 'Shuffle Questions',
    type: 'radio',
    id: 'shuffleQuestions',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
    default: false,
    label_1: "Do Not Shuffle",
    label_2: "Shuffle Questions"
}

export const shuffle_answers_validation = {
    name: 'options.shuffleAnswers',
    radioGroupLabel: 'Shuffle Answers',
    type: 'radio',
    id: 'shuffleAnswers',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
    default: false,
    label_1: "Do Not Shuffle",
    label_2: "Shuffle Answers"
}

export const continue_until_correct_validation = {
    name: 'options.continueAnsweringUntilCorrect',
    radioGroupLabel: 'Continue Until Correct',
    type: 'radio',
    id: 'continueTillCorrect',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
    default: false,
    label_1: "Do Not Continue",
    label_2: "Continue"
}

export const product_link_validation = {
    name: 'productLink',
    label: 'Associated Product',
    id: 'productLink',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
}

export const exam_passing_grade_validation = {
    name: 'examPassingGrade',
    label: 'Exam Passing Grade',
    id: 'examPassingGrade',
    validation: {
        required: {
            value: true,
            message: 'Is Required',
        }
    },
}

/*





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
        /!*        required: {
                    value: true,
                    message: 'Is Required',
                }*!/
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
}*/
