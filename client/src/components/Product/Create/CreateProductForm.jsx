import React, {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

// Page Loader
import {Preloader} from "../../shared/Preloader/Preloader";

// Redux Slices
import {useGetTeamForAdminQuery} from "../../../redux/slices/userSlice";
import {useGetUSGSQuery} from "../../../redux/slices/feDataSlice";
import {useCreateProductMutation} from "../../../redux/slices/productSlice";

// Form Validations
import {
    course_cost_validation,
    course_description_validation, course_exam_list_validation,
    course_instructor_validation,
    course_passing_grade_validation, course_status_validation,
    course_title_validation, course_video_list_validation,
} from "../../../validations/productValidations";

// Reusable Form Fields
import {Input, InputError} from "../../shared/ReusableFields/Input/Input";
import {TextArea} from "../../shared/ReusableFields/TextArea/TextArea";
import {Selector} from "../../shared/ReusableFields/Selector/Selector";
import {RadioGroup} from "../../shared/ReusableFields/RadioGroup/RadioGroup";
import GenericControllerField from "../../shared/ReusableFields/GenericContollerField/GenericControllerField";

// Component CSS
import "./CreateProductForm.css";
export const CreateProductForm = () => {
    // Form State
    const [serverError, setServerError] = useState(null);

    // Fetch Form Data
    const {data: teamData, isLoading: isLoadingTeam, error: teamError, refetch: refetchTeam} = useGetTeamForAdminQuery();
    const {data: usgsData, isLoading: isLoadingUSGS, error: usgsError, refetch: refetchUSGS} = useGetUSGSQuery();

    // Fetch Form Actions
    const [createProduct, {isLoading: isLoadingCreateProduct}] = useCreateProductMutation();
    const methods = useForm();

    const navigate = useNavigate();

    const handleNewProductSubmission = async (data) => {
        setServerError(null);
        let product = {...data};
        try {
            const res = await createProduct(product).unwrap();
            console.log("Response was: ", res);
            return navigate("/products");
        } catch(err) {
            console.log(err);
            if(err.status === 400 && !!err.data[0].msg) setServerError(err.data[0].msg);
        }
    };
    return (isLoadingCreateProduct || isLoadingTeam || isLoadingUSGS) ? <Preloader/> : (
        <Container lg={4} md={6} sm={12}>
            <Row>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleNewProductSubmission)}
                          noValidate
                          className="new-product-form"
                          autoComplete="off"
                    >
                        <h2 className={"productFormHeader"}>Add New <span>BodyDynamix Product</span></h2>
                        <h5 className={"productLead"}>Create and Publish a new BDXCEU Course</h5>
                        <>
                            <Row className={"productBlock"}>
                                <Col lg={8} md={12} sm={12}>
                                    <Input {...course_title_validation} />
                                </Col>
                                <Col lg={4} md={12} sm={12}>
                                    <RadioGroup {...course_status_validation} />
                                </Col>
                                <hr className={"form-section-separator"}/>
                                <Col lg={8} md={12} sm={12}>
                                    <TextArea {...course_description_validation} rows={5}/>
                                </Col>
                                <Col lg={4} md={12}>
                                    <Selector
                                        {...course_instructor_validation}
                                        selectorType={"team-member"}
                                        data={teamData.data}
                                    />
                                    <Row>
                                        <Col lg={6} md={12} sm={12}>
                                            <Input {...course_cost_validation} />
                                        </Col>
                                        <Col lg={6} md={12} sm={12}>
                                            <Selector
                                                {...course_passing_grade_validation}
                                                selectorType={"passing-grade"}
                                                data={usgsData.data}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <hr className={"form-section-separator"}/>
                                <Col lg={6} md={12} className={"border__right"}>
                                    <GenericControllerField
                                        name={"courseOfferingsList"}
                                        label={"Course Offering List"}
                                        placeholder={"12 CEUs Ethic & Law"}
                                    />
                                </Col>
                                <Col lg={6}>
                                    <GenericControllerField
                                        name={"courseVideoList"}
                                        label={"Video List"}
                                        placeholder={"https://www.youtube.com"}
                                    />
                                </Col>
                                <hr className={"form-section-separator"}/>
                            </Row>
                        </>
                        {
                            serverError && <div className={"formSubmissionError"}>
                                <InputError message={serverError}/>
                            </div>
                        }
                        <button className={"modalButtonAuth buttonAuthLogin"} type="submit">
                            Create Product
                        </button>
                    </form>
                </FormProvider>
            </Row>
        </Container>
    );
}

export default CreateProductForm;