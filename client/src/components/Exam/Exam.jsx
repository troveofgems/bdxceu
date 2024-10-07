import React from 'react';

import Quiz from 'react-quiz-component';

import "./Exam.css";
import NavigationBar from "../shared/Navigation/Navigation";
import SiteFooter from "../shared/Footer/Footer";
export const ExamPage = () => {
    return (
        <>
            <NavigationBar />
            <section id="blog-header" className="parallax-section">
                <div className="container">
                    <div className="row">

                        <div className="col-md-offset-2 col-md-8 col-sm-12">
                            <h3 className="wow bounceIn" data-wow-delay="0.9s">Time For An Exam</h3>
                            <h1 className="wow fadeInUp" data-wow-delay="1.6s">NBCE Part II exam</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section id="blog" className="parallax-section">
                <div className="container">
                    <div className="row">

                        <div className="col-md-12 col-sm-7">

                            <div className="blog-content wow fadeInUp" data-wow-delay="1s">
                                <h3>You Are About To Take the NBCE Part II exam</h3>
                                <span className="meta-date"><a href="#">{new Date().toString()}</a></span>
                                <div className="blog-clear"></div>
                                <p>Part II is a computer-based test, covering clinical sciences. It consists of 255
                                    questions across six domains.</p>
                                <p>The administration of Part II is divided into two sessions; each session consists of
                                    three domains.</p>
                                <p>Session 1: General Diagnosis, Neuromusculoskeletal Diagnosis, and Diagnostic
                                    Imaging</p>
                                <p>Session 2: Principles of Chiropractic, Chiropractic Practice, and Associated Clinical
                                    Sciences</p>
                                <p>You are allotted 3 hours and 26 minutes of total testing time for Part II. Testing
                                    appointments are 4 hours with a tutorial, end of exam survey, and an optional
                                    15-minute break after the first session.</p>
                            </div>
                            <div className="blog-image wow fadeInUp examPanel" data-wow-delay="0.9s">
                                <Quiz quiz={quiz}/>
                            </div>

                            <blockquote>
                                If you don’t do your revision properly, you know what’ll happen? YOU SHALL NOT PASS!
                                <small>
                                    actor Sir Ian McKellen, channelling Gandalf from Tolkien’s “The Lord of the
                                    Rings”, speaking to students at a high school in Somerset, England
                                </small>
                            </blockquote>

                        </div>
                    </div>
                </div>
            </section>
            <SiteFooter />
        </>
    );
}


const quiz = {
    "quizTitle": "NBCE Part II Practice Exam",
    "quizSynopsis": "Untimed Practice Exam",
    "progressBarColor": "#9de1f6",
    "nrOfQuestions": "4",
    "questions": [
        {
            "question": "How often are chiropractors generally required to complete continuing education to maintain their licensure?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "Every two years",
                "Once, at the beginning of their career",
                "Every year",
                "Every five years"
            ],
            "correctAnswer": "1",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            "question": "What role does the NBCE certification play in the chiropractic licensing process?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "It directly grants chiropractic licenses to practitioners",
                "It is used to verify continuing education credits for license renewal",
                "It provides a certification that is used by state licensing boards to assess eligibility",
                "It offers malpractice insurance coverage for chiropractors"
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
        },
        {
            "question": "What is the purpose of the NBCE’s \"specialty\" exams?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "To determine the need for remedial training",
                "To evaluate the validity of chiropractic research studies",
                "To provide additional certification for specialized chiropractic techniques",
                "To assess eligibility for state board examinations"
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "The NBCE offers specialty exams to provide additional certification in specific areas of chiropractic practice. These exams help chiropractors demonstrate advanced knowledge and skills in particular specialties, enhancing their qualifications and practice capabilities.",
            "point": "10"
        },
        {
            "question": "Which NBCE exam part is typically required for initial licensure in most states?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "Part I",
                "Part II",
                "Part III",
                "Part IV",
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Part I of the NBCE exams, which covers basic sciences, is usually a prerequisite for initial licensure in many states. This part establishes a foundation of essential medical knowledge necessary for further clinical training.",
            "point": "30"
        },
        {
            "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
            "questionType": "photo",
            "answerSelectionType": "single",
            "answers": [
                "https://dummyimage.com/600x400/000/fff&text=A",
                "https://dummyimage.com/600x400/000/fff&text=B",
                "https://dummyimage.com/600x400/000/fff&text=C",
                "https://dummyimage.com/600x400/000/fff&text=D"
            ],
            "correctAnswer": "1",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
        },
        {
            "question": "What are the advantages of React JS?",
            "questionType": "text",
            "answerSelectionType": "multiple",
            "answers": [
                "React can be used on client and as well as server side too",
                "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
                "React components have lifecycle events that fall into State/Property Updates",
                "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer"
            ],
            "correctAnswer": [1, 2, 4],
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
        },
    ]
}
