import React, {useState} from "react";
import {FormProvider, useForm, useWatch} from "react-hook-form";
import {Col, Container, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import { Stepper } from 'react-form-stepper';

// Page Loader
import {Preloader} from "../../shared/Preloader/Preloader";

// Redux Slices
import {useGetUSGSQuery} from "../../../redux/slices/feDataSlice";
import {useFetchProductsForAdminQuery} from "../../../redux/slices/productSlice";
import {useGetExamByIdQuery, useUpdateExamMutation} from "../../../redux/slices/examSlice";

// Form Validations
import {
    continue_until_correct_validation, exam_answer_explanation_message_validation,
    exam_correct_answer_message_validation,
    exam_incorrect_answer_message_validation, exam_passing_grade_validation,
    exam_question_validation,
    exam_synopsis_validation,
    exam_title_validation,
    number_of_questions_validation, product_link_validation,
    shuffle_answers_validation,
    shuffle_questions_validation
} from "../../../validations/examValidations";

// Reusable Form Fields
import {Input, InputError} from "../../shared/ReusableFields/Input/Input";
import {TextArea} from "../../shared/ReusableFields/TextArea/TextArea";
import {Selector} from "../../shared/ReusableFields/Selector/Selector";
import {RadioGroup} from "../../shared/ReusableFields/RadioGroup/RadioGroup";
import GenericControllerField from "../../shared/ReusableFields/GenericContollerField/GenericControllerField";

// Component CSS
import "./UpdateExamForm.css";
export const UpdateExamForm = () => {
    const {examId} = useParams();

    // Fetch Form Data
    const { data: usgsData, isLoading: isLoadingUSGS, error: usgsError, refetch: refetchUSGS } = useGetUSGSQuery();
    const { data: productList, isLoading: isLoadingProductList, error: productListError, refetch: refetchProductList } = useFetchProductsForAdminQuery();
    const { data: exam, isLoading: isLoadingExam, error: examError, refetch: refetchExam } = useGetExamByIdQuery(examId);

    // Fetch Form Actions
    const [updateExam, {isLoading: isLoadingUpdateExam}] = useUpdateExamMutation();
    const methods = useForm();
    const {watch} = methods;

    let watchNrOfQuestions = watch("nrOfQuestions", 0);
    const navigate = useNavigate();
    const [serverError, setServerError] = useState(null);

    // Watch Changes to the Number of Questions Field To Update Stepper Dynamically
    const [examQuestionCount, setExamQuestionCount] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState([]);

    const handleUpdateExamSubmission = async (data) => {
        console.log("Form Submitted...", data);
        setServerError(null);
        let
            numOfQuestionsToProcess = parseInt(data.nrOfQuestions),
            processedQuestions = [];

        for(let i = 0; i < numOfQuestionsToProcess; i += 1) {
            let question = {...data[`question_${i + 1}`]};
            console.log("Question: ", question);

            // Determine:
            // QuestionType ["text" || "photo"] and
            // Points ["20"]
            question.questionType = "text"; // Hardcoded for now.
            question.point = "20";

            let possibleCorrectAnswers = [];
            question.answers.map((answer, index) => {
                if(answer.markedCorrect) {
                    possibleCorrectAnswers.push((index + 1));
                }
            });

            // AnswerSelectionType ["single" || "multiple"]
            // Correct Answer
            if(possibleCorrectAnswers.length > 1) {
                question.answerSelectionType = "multiple";
                question.correctAnswer = possibleCorrectAnswers;
            } else {
                question.answerSelectionType = "single";
                question.correctAnswer = `${possibleCorrectAnswers[0]}`;
            }

            question.answers = question.answers.map((answer) => answer.name);

            processedQuestions.push(question);
        }

        let updates = {
            examTitle: data.examTitle,
            examSynopsis: data.examSynopsis,
            nrOfQuestions: numOfQuestionsToProcess,
            examPassingGrade: data.examPassingGrade,
            questions: processedQuestions,
            options: {
                shuffleQuestions: data.options.shuffleQuestions === "true",
                shuffleAnswers: data.options.shuffleAnswers === "true",
                continueAnsweringUntilCorrect: data.options.continueAnsweringUntilCorrect === "true"
            },
            productLink: data.productLink
        };
        console.log("To Pass Over: ", updates);
        try {
            const res = await updateExam({ examId, updates }).unwrap();
            console.log("Response was: ", res);
            return navigate("/admin/exams");
        } catch (err) {
            console.log(err);
            if (err.status === 400 && !!err.data[0].msg) setServerError(err.data[0].msg);
        }
    };

    React.useEffect(() => {
        console.log("Exam: ", exam);
        const subscription = watch((value, {name, type}) =>
            console.log(value, name, type)
        )
        return () => subscription.unsubscribe();
    }, [watch, isLoadingExam]);

    function goToQuestion(i) {
        setActiveStep(i);
    }

    function generateQuestionStepper(numberOfQuestions) {
        let questionSet = [];
        for (let i = 0; i < numberOfQuestions; i += 1) {
            questionSet.push({
                label: `Question ${i + 1}`,
                onClick: () => goToQuestion(i)
            });
        }

        return (
            <Stepper
                activeStep={activeStep}
                steps={questionSet}
                nonLinear={true}
            ></Stepper>
        )
    }

    function generateQuestionBlocks(numberOfQuestions, useExam) {
        let questionBlocks = [];

        if(useExam) {
            console.log("Use Exam to Prefill Form Data...", exam);
        }

        for(let i = 0; i < numberOfQuestions; i += 1) {
            questionBlocks.push(
                <div id={`question_${i}`} className={activeStep === i ? 'visible' : 'collapse'}>
                    <h5 className={"mt-5 mb-5 text-decoration-underline"}>Question {i + 1}</h5>
                    <Row>
                        <Col lg={12}>
                            <TextArea {...exam_question_validation}
                                      rows={5}
                                      name={`question_${i + 1}.question`}
                                      id={`examQuestion_${i + 1}`}
                                      label={`Exam Question ${i + 1}`}
                                      value={exam.data.questions[i].question}
                            />
                        </Col>
                        <hr className={"form-section-separator w-75 text-center m-auto mt-5 mb-5"}/>
                        <Col lg={12}>
                            <GenericControllerField
                                name={`question_${i + 1}.answers`}
                                label={`Answers For Question ${i + 1}`}
                                placeholder={"Every two years"}
                                useCheckboxMarker={true}
                                passVal={exam.data.questions[i].answers}
                                markedAsCorrect={exam.data.questions[i].correctAnswer}
                                sourceIsUpdatesToExam={true}
                            />
                        </Col>
                        <hr className={"form-section-separator w-75 text-center m-auto mt-5 mb-5"}/>
                        <Col lg={6}>
                            <TextArea {...exam_correct_answer_message_validation} rows={8}
                                      name={`question_${i + 1}.messageForCorrectAnswer`}
                                      id={`examCorrectAnswerMessage_${i + 1}`}
                                      label={`Exam Correct Answer Message ${i + 1}`}
                                      value={exam.data.questions[i].messageForCorrectAnswer}
                            />
                        </Col>
                        <Col lg={6}>
                            <TextArea {...exam_incorrect_answer_message_validation} rows={8}
                                      name={`question_${i + 1}.messageForIncorrectAnswer`}
                                      id={`examIncorrectAnswerMessage_${i + 1}`}
                                      label={`Exam Incorrect Answer Message ${i + 1}`}
                                      value={exam.data.questions[i].messageForIncorrectAnswer}
                            />
                        </Col>
                        <hr className={"form-section-separator w-75 text-center m-auto mt-5 mb-5"}/>
                        <Col lg={12}>
                            <TextArea {...exam_answer_explanation_message_validation} rows={8}
                                      name={`question_${i + 1}.explanation`}
                                      id={`examAnswerExplanationMessage_${i + 1}`}
                                      label={`Exam Answer Explanation ${i + 1}`}
                                      value={exam.data.questions[i].explanation}
                            />
                        </Col>
                        <hr className={"form-section-separator w-75 m-auto mt-5"}/>
                    </Row>
                </div>
            );
        }

        return (
            <>
                {questionBlocks}
                <div className={"prevNextBtnBlock d-flex w-25 mt-5"}>
                    {!(activeStep === 0)
                        &&
                        <button className={"button-29-ruby"}
                                onClick={() => setActiveStep(activeStep - 1)}
                        >
                            Previous
                        </button>
                    }
                    <span className={"spacer"}></span>
                    {(numberOfQuestions !== 1 && activeStep < (numberOfQuestions - 1))
                        && <button className={"button-29"}
                                   onClick={() => setActiveStep(activeStep + 1)}
                        >
                            Next
                        </button>
                    }
                </div>
            </>
        );
    }

    function NumberOfQuestionsWatched() {
        return useWatch({
            name: "nrOfQuestions", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
            defaultValue: (exam?.data?.nrOfQuestions || 0), // default value before the render
        });
    }

    // Preview Actions
    const handlePreviewClassroom = () => {
        return navigate(`/classroom/${exam.data.associatedProduct.productId}`);
    }
    const handlePreviewExam = () => {
        return navigate(`/classroom/${exam.data._id}/exam`);
    }
    const updateQuestionStepper = evt => {
        console.log("Update Question Stepper?", evt);
    }

    return (isLoadingUpdateExam || isLoadingUSGS || isLoadingProductList || isLoadingExam) ? <Preloader/> : (
        <Container lg={4} md={6} sm={12}>
            <Row>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleUpdateExamSubmission)}
                          noValidate
                          className="new-exam-form"
                          autoComplete="off"
                    >
                        <h2 className={"productFormHeader"}>Update <span>BodyDynamix Exam</span></h2>
                        <h5 className={"productLead mb-5"}>Updating a BDXCEU Exam!</h5>
                        <>
                            <Row className={"productBlock"}>
                                <Col lg={6} md={12} sm={12}>
                                    <Input {...exam_title_validation} value={exam.data.examTitle} />
                                    <Row lg={12} className={"mt-5"}>
                                        <Col lg={6}>
                                            <Selector
                                                {...product_link_validation}
                                                selectorType={"product-link"}
                                                data={productList.data}
                                            />
                                        </Col>
                                        <Col lg={6} className={"mb-5"}>
                                            <Selector
                                                {...exam_passing_grade_validation}
                                                selectorType={"passing-grade"}
                                                data={usgsData.data}
                                                passVal={exam.data.examPassingGrade}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                    <TextArea {...exam_synopsis_validation} rows={10} value={exam.data.examSynopsis}/>
                                </Col>
                                <hr className={"form-section-separator"}/>
                                <Col lg={12} md={12} sm={12}>
                                    <Row lg={12}>
                                        <Col lg={2}>
                                            <h4>Question Set ({<NumberOfQuestionsWatched/>})</h4>
                                        </Col>
                                        <Col lg={2}>
                                            <Input {...number_of_questions_validation} value={exam.data.nrOfQuestions} onChange={() => updateQuestionStepper}/>
                                        </Col>
                                    </Row>

                                    {
                                        (!!exam && exam?.data?.nrOfQuestions === 0) ?
                                            <h4 className={"text-center mt-3"}>No Questions Yet</h4>
                                            :
                                            generateQuestionStepper((exam?.data?.nrOfQuestions > 0) ? parseInt(exam.data.nrOfQuestions) : parseInt(watchNrOfQuestions))
                                    }
                                    {
                                        (watchNrOfQuestions > 0 || exam?.data?.nrOfQuestions > 0) && (
                                            generateQuestionBlocks(
                                                (exam?.data?.nrOfQuestions || watchNrOfQuestions),
                                                true
                                            )
                                        )
                                    }
                                </Col>
                                <hr className={"form-section-separator mt-5"}/>
                                <Col lg={12} md={12} sm={12}>
                                    <h4>Exam Settings</h4>
                                    <Row lg={12}>
                                        <Col lg={6} md={12} sm={12}>
                                            <div>
                                                <RadioGroup {...shuffle_questions_validation} passVal={exam.data.shuffleQuestions}/>
                                                <RadioGroup {...shuffle_answers_validation} passVal={exam.data.shuffleAnswers}/>
                                                <RadioGroup {...continue_until_correct_validation} passVal={exam.data.continueAnsweringUntilCorrect}/>
                                            </div>
                                        </Col>
                                        <Col lg={6} md={12} sm={12}>
                                            <Col lg={6}>
                                                <button className={"button-29"}
                                                        onClick={handlePreviewExam}
                                                >
                                                    Preview Exam
                                                </button>
                                            </Col>
                                            <Col lg={6} className={"mt-5"}>
                                                <button className={"button-29"}
                                                        onClick={handlePreviewClassroom}
                                                >
                                                    Preview Classroom
                                                </button>
                                            </Col>
                                        </Col>
                                    </Row>
                                </Col>
                                <hr className={"form-section-separator mt-5"}/>
                            </Row>
                        </>
                        {serverError && (
                            <div className={"formSubmissionError"}>
                                <InputError message={serverError}/>
                            </div>)
                        }
                        <Row lg={12} className={"w-100 text-center mt-5 mb-5"}>
                            <Col lg={6}>
                                <button
                                    className={"modalButtonAuth buttonAuthLogin"}
                                    type="button"
                                    onClick={() => {}}
                                >
                                    Save & Exit
                                </button>
                            </Col>
                            <Col lg={6}>
                                <button
                                    className={"modalButtonAuth buttonAuthLogin"}
                                    type="submit"
                                >
                                    Update Exam
                                </button>
                            </Col>
                        </Row>
                    </form>
                </FormProvider>
            </Row>
        </Container>
    );
}

export default UpdateExamForm;