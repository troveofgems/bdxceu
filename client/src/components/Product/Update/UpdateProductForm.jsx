import React, {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Col, Container, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

// Page Loader
import {Preloader} from "../../shared/Preloader/Preloader";

// Redux Slices
import {useGetTeamForAdminQuery} from "../../../redux/slices/userSlice";
import {useGetUSGSQuery} from "../../../redux/slices/feDataSlice";
import {useUpdateProductMutation, useFetchProductByIdQuery} from "../../../redux/slices/productSlice";

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
import "./UpdateProductForm.css";
export const UpdateProductForm = () => {
    const {pid: productId} = useParams();

    // Form State
    const [product, setProduct] = useState(null);
    const [serverError, setServerError] = useState(null);

    // Fetch Form Data
    const {data, isLoading: isLoadingProductById, refetch: refetchProductById, error: productByIdError} = useFetchProductByIdQuery(productId);
    const {data: teamData, isLoading: isLoadingTeam, error: teamError, refetch: refetchTeam} = useGetTeamForAdminQuery();
    const {data: usgsData, isLoading: isLoadingUSGS, error: usgsError, refetch: refetchUSGS} = useGetUSGSQuery();

    // Form Actions
    const navigate = useNavigate();
    const methods = useForm();
    const [updateProduct, {isLoading: isLoadingUpdateProduct}] = useUpdateProductMutation();

    const handleUpdateProductSubmission = methods.handleSubmit(async (updates) => {
        let productUpdates = {...updates};

        try {
            const res = await updateProduct({ productId: productId, updates: productUpdates }).unwrap();
            if(res.success) {
                console.log("Try to navigate?")
                refetchProductById();
                return navigate("/products");
            } else {
                console.log("Something else happened...")
                // Toastify Error?
            }
        } catch(err) {
            console.log(err);
        }
    });

    useEffect(() => {
        console.log("Fetch product by id: ", productId);
        if(productId !== undefined) {
            console.log("Product Id", productId);
            console.log("Product Data? ", data);
        } else {

        }
    }, [productId, data]);

    return (isLoadingProductById || isLoadingTeam || isLoadingUSGS) ? <Preloader/> : (
        <Container lg={4} md={6} sm={12}>
            <Row>
                <FormProvider {...methods}>
                    <form onSubmit={e => e.preventDefault()}
                          noValidate
                          className="update-product-form"
                          autoComplete="off"
                    >
                        <h4 className={"productFormHeader"}>Update A <span>BodyDynamix Product</span></h4>
                        <p className={"productLead"}>Update BDXCEU Course: {data.data.courseTitle}</p>
                        <>
                            <Row className={"productBlock"}>
                                <Col lg={8} md={12} sm={12}>
                                    <Input {...course_title_validation} value={data.data.courseTitle}/>
                                </Col>
                                <Col lg={4} md={12} sm={12}>
                                    <RadioGroup {...course_status_validation} passVal={data.data.courseIsPublished} />
                                </Col>
                                <hr className={"form-section-separator"}/>
                                <Col lg={8}>
                                    <TextArea {...course_description_validation} value={data.data.courseDescription} rows={5}/>
                                </Col>
                                <Col lg={4} md={12}>
                                    <Selector
                                        {...course_instructor_validation}
                                        selectorType={"team-member"}
                                        data={teamData?.data || []}
                                        passVal={data.data.courseInstructor._id}
                                    />
                                    <Row>
                                        <Col lg={6} md={12} sm={12}>
                                            <Input {...course_cost_validation} value={data.data.courseCost.toFixed(2)} />
                                        </Col>
                                        <Col lg={6} md={12} sm={12}>
                                            <Selector
                                                {...course_passing_grade_validation}
                                                selectorType={"passing-grade"}
                                                data={usgsData?.data || []}
                                                passVal={data.data.coursePassingGrade}
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
                                        passVal={data.data.courseOfferingsList}
                                    />
                                </Col>
                                <Col lg={6}>
                                    <GenericControllerField
                                        name={"courseVideoList"}
                                        label={"Video List"}
                                        placeholder={"https://www.youtube.com"}
                                        passVal={data.data.courseVideoList}
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
                        {
                            !isLoadingUpdateProduct && (
                                <button className={"modalButtonAuth buttonAuthLogin"} type="submit"
                                        onClick={handleUpdateProductSubmission}>Update Product
                                </button>
                            )
                        }
                    </form>
                </FormProvider>
            </Row>
        </Container>
    );
}

export default UpdateProductForm;