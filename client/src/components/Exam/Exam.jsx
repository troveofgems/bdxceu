import React, {useEffect, useState} from 'react';
import Quiz from 'react-quiz-component';

import {
    useGetExamByIdQuery,
    useProcessExamResultsForStudentMutation,
    useUpdateExamMutation
} from "../../redux/slices/examSlice";
import {useParams} from "react-router-dom";
import {Preloader} from "../shared/Preloader/Preloader";

import "./Exam.css";
import {useSelector} from "react-redux";
export const ExamPage = () => {
    const {productId} = useParams();
    const [quiz, setQuiz] = useState(null);

    const { user } = useSelector((state) => state.auth);

    const { data: exam, isLoading: isLoadingExam, refetch, error } = useGetExamByIdQuery(productId);
    const [
        processExamResultsForStudent,
        { isLoading: isLoadingProcessExamResultsForStudent }
    ] = useProcessExamResultsForStudentMutation();

    const processResults = async (examResult) => {
        console.log("Results For Exam? ", examResult);
        try {
            const res = await processExamResultsForStudent({
                studentId: user._id,
                examId: exam.data._id,
                updates: examResult
            });
            console.log("Result Was: ", res);
        } catch(err) {
            console.error("Error: ", err);
        }

    };

    useEffect(() => {
        refetch();
        if(!isLoadingExam && !!exam) {
            let questionSubset = [];

            exam.data.questions.map((q, i) => {
                questionSubset.push({
                    question: q.question,
                    answers: q.answers,
                    correctAnswer: q.correctAnswer,
                    messageForCorrectAnswer: q.messageForCorrectAnswer,
                    messageForIncorrectAnswer: q.messageForIncorrectAnswer,
                    explanation: q.explanation,
                    questionType: q.questionType,
                    answerSelectionType: q.answerSelectionType,
                    point: "20"
                })
            });

            setQuiz({
                "quizTitle": exam.data.examTitle,
                "quizSynopsis": "Untimed Exam",
                "progressBarColor": "#9de1f6",
                "nrOfQuestions": `${exam.data.nrOfQuestions}`,
                "questions": questionSubset
            });
            console.log("Quiz set to: ", quiz);
        }
    }, [isLoadingExam]);

    return isLoadingExam ? <Preloader /> : (
        <>
            <section id="blog-header" className="parallax-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-offset-2 col-md-8 col-sm-12 mt-5">
                            <h3 className="wow bounceIn" data-wow-delay="0.9s">Time For An Exam</h3>
                            <h1 className="wow fadeInUp" data-wow-delay="1.6s">{exam.data.examTitle}</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section id="blog" className="parallax-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-7">
                            <div className="blog-content wow fadeInUp" data-wow-delay="1s">
                                <h3 className={"mt-5"}>You Are About To Take the {exam.data.examTitle} Exam</h3>
                                <span className="meta-date"><a href="#">{new Date().toString()}</a></span>
                                <div className="blog-clear mb-5"></div>
                                <p>{exam.data.examSynopsis}</p>
                            </div>
                            <div className="examPanel">
                                {
                                    (quiz !== null) && (
                                        <Quiz
                                            quiz={quiz}
                                            shuffle={exam.data.shuffleQuestions}
                                            shuffleAnswer={exam.data.shuffleAnswers}
                                            continueTillCorrect={exam.data.continueAnsweringUntilCorrect}
                                            onComplete={processResults}
                                        />
                                    )
                                }
                            </div>
                            <blockquote className={"mt-5 w-50 m-auto mb-5"}>
                                If you don’t do your revision properly, you know what’ll happen? YOU SHALL NOT PASS!
                                <small>
                                     <em>actor Sir Ian McKellen, channelling Gandalf from Tolkien’s “The Lord of the
                                         Rings”, speaking to students at a high school in Somerset, England</em>
                                </small>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
