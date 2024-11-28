import React, {useState} from "react";
import {FormProvider, useForm, useWatch, useFormContext} from "react-hook-form";
import {Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { Stepper, Step } from 'react-form-stepper';

// Page Loader
import {Preloader} from "../../shared/Preloader/Preloader";

// Redux Slices
import {useCreateExamMutation} from "../../../redux/slices/examSlice";
import {useGetUSGSQuery} from "../../../redux/slices/feDataSlice";
import {useFetchProductsQuery} from "../../../redux/slices/productSlice";

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
import "./CreateExamForm.css";
export const CreateExamForm = () => {
    // Fetch Form Data
    const {data: usgsData, isLoading: isLoadingUSGS, error: usgsError, refetch: refetchUSGS} = useGetUSGSQuery();
    const { data: productList, isLoading: isLoadingProductList, error: productListError, refetch: refetchProductList } = useFetchProductsQuery();

    // Fetch Form Actions
    const [createExam, {isLoading: isLoadingCreateExam}] = useCreateExamMutation();
    const methods = useForm();
    const {watch} = methods;

    const watchNrOfQuestions = watch("nrOfQuestions", 0);

    const navigate = useNavigate();

    const [serverError, setServerError] = useState(null);

    // Watch Changes to the Number of Questions Field To Update Stepper Dynamically
    const [examQuestionCount, setExamQuestionCount] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState([]);

    const handleNewExamSubmission = async (data) => {
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

        let exam = {
            examTitle: data.examTitle,
            examSynopsis: data.examSynopsis,
            nrOfQuestions: numOfQuestionsToProcess,
            examPassingGrade: data.examPassingGrade,
            questions: processedQuestions,
            options: {
                shuffleQuestions: data.shuffleQuestions === "true",
                shuffleAnswers: data.shuffleAnswers === "true",
                continueAnsweringUntilCorrect: data.continueAnsweringUntilCorrect === "true"
            },
            productLink: data.productLink
        };
        console.log(exam, data);
        try {
            const res = await createExam(exam).unwrap();
            console.log("Response was: ", res);
            //return navigate("/admin/exams");
        } catch (err) {
            console.log(err);
            if (err.status === 400 && !!err.data[0].msg) setServerError(err.data[0].msg);
        }
    };

    React.useEffect(() => {
        const subscription = watch((value, {name, type}) =>
            console.log(value, name, type)
        )
        return () => subscription.unsubscribe();
    }, [watch]);

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

    function generateQuestionBlocks(numberOfQuestions) {
        let questionBlocks = [];

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
                                      label={`Exam Question ${i + 1}`}/>
                        </Col>
                        <hr className={"form-section-separator w-75 text-center m-auto mt-5 mb-5"}/>
                        <Col lg={12}>
                            <GenericControllerField
                                name={`question_${i + 1}.answers`}
                                label={`Answers For Question ${i + 1}`}
                                placeholder={"Every two years"}
                                useCheckboxMarker={true}
                            />
                        </Col>
                        <hr className={"form-section-separator w-75 text-center m-auto mt-5 mb-5"}/>
                        <Col lg={6}>
                            <TextArea {...exam_correct_answer_message_validation} rows={8}
                                      name={`question_${i + 1}.messageForCorrectAnswer`}
                                      id={`examCorrectAnswerMessage_${i + 1}`}
                                      label={`Exam Correct Answer Message ${i + 1}`}/>
                        </Col>
                        <Col lg={6}>
                            <TextArea {...exam_incorrect_answer_message_validation} rows={8}
                                      name={`question_${i + 1}.messageForIncorrectAnswer`}
                                      id={`examIncorrectAnswerMessage_${i + 1}`}
                                      label={`Exam Incorrect Answer Message ${i + 1}`}/>
                        </Col>
                        <hr className={"form-section-separator w-75 text-center m-auto mt-5 mb-5"}/>
                        <Col lg={12}>
                            <TextArea {...exam_answer_explanation_message_validation} rows={8}
                                      name={`question_${i + 1}.explanation`}
                                      id={`examAnswerExplanationMessage_${i + 1}`}
                                      label={`Exam Answer Explanation ${i + 1}`}/>
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


    return (isLoadingCreateExam || isLoadingUSGS || isLoadingProductList) ? <Preloader/> : (
        <Container lg={4} md={6} sm={12}>
            <Row>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleNewExamSubmission)}
                          noValidate
                          className="new-exam-form"
                          autoComplete="off"
                    >
                        <h2 className={"productFormHeader"}>Create New <span>BodyDynamix Exam</span></h2>
                        <h5 className={"productLead mb-5"}>Create and Link a new BDXCEU Exam To An Existing Product</h5>
                        <>
                            <Row className={"productBlock"}>
                                <Col lg={6} md={12} sm={12}>
                                    <Input {...exam_title_validation} />
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
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                    <TextArea {...exam_synopsis_validation} rows={10}/>
                                </Col>
                                <hr className={"form-section-separator"}/>
                                <Col lg={12} md={12} sm={12}>
                                    <Row lg={12}>
                                        <Col lg={2}>
                                            <h4>Question Set ({<NumberOfQuestionsWatched/>})</h4>
                                        </Col>
                                        <Col lg={2}>
                                            <Input {...number_of_questions_validation} />
                                        </Col>
                                    </Row>

                                    {
                                        watchNrOfQuestions === 0 ?
                                            <h4 className={"text-center mt-3"}>No Questions Yet</h4>
                                            :
                                            generateQuestionStepper(watchNrOfQuestions)
                                    }
                                    {
                                        watchNrOfQuestions > 0 && (
                                            generateQuestionBlocks(watchNrOfQuestions)
                                        )
                                    }
                                </Col>
                                <hr className={"form-section-separator mt-5"}/>
                                <Col lg={12} md={12} sm={12}>
                                    <h4>Exam Settings</h4>
                                    <Row lg={12}>
                                        <Col lg={6} md={12} sm={12}>
                                            <div>
                                                <RadioGroup {...shuffle_questions_validation} />
                                                <RadioGroup {...shuffle_answers_validation} />
                                                <RadioGroup {...continue_until_correct_validation} />
                                            </div>
                                        </Col>
                                        <Col lg={6} md={12} sm={12}>
                                            <button className={"button-29"}
                                                    onClick={() => {}}
                                            >
                                                Preview Exam
                                            </button>
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
                                    Create Exam
                                </button>
                            </Col>
                        </Row>
                    </form>
                </FormProvider>
            </Row>
        </Container>
    );
}

export default CreateExamForm;

function NumberOfQuestionsWatched() {
    return useWatch({
        name: "nrOfQuestions", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
        defaultValue: 0, // default value before the render
    });
}