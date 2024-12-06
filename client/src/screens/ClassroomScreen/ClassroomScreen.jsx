import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/*import "./CheckoutScreen.css";*/
import {Preloader} from "../../components/shared/Preloader/Preloader";
import "./ClassroomScreen.css"
import {useFetchProductByIdQuery} from "../../redux/slices/productSlice";


import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';

const ClassroomScreen = () => {
    const { productId } = useParams();
    const { data: product, isLoading: isLoadingProductById, refetch, error } = useFetchProductByIdQuery(productId);

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        console.log("Have Product Id? ", productId, product);
    }, [productId, product]);

    return isLoadingProductById ? <Preloader /> : (
        <Container>
            <h2 className={"text-center mt-5 mb-2"}>Welcome To The {product.data.courseTitle} Classroom</h2>
            <h5 className={"text-center mb-5"}>Taught By Our: <em>{product.data.courseInstructor.firstName} {product.data.courseInstructor.lastName}</em></h5>
            <Row>
                <p className={"text-center mb-5"}>
                    {product.data.courseDescription}
                </p>
                <Col lg={6}>
                    <h5 className={"text-start mb-2"}>This Class Provides:</h5>
                    <ul className={"text-start mb-5"}>
                        {product.data.courseOfferingsList.map((offering) => (
                            <li key={offering._id}>{offering.name}</li>
                        ))}
                    </ul>
                </Col>
                <Col lg={6}>
                    <h5 className={"text-start mb-2"}>Course Passing
                        Grade: <strong>{product.data.coursePassingGrade.letterGrade}</strong></h5>
                </Col>
                <Col lg={12} className={"text-center"}>
                    <h5 className={"text-start mb-4"}>Step 1: Watch the Following
                        Video{product.data.courseVideoList.length === 1 ? "" : "s"}</h5>
                    <Carousel activeIndex={index} onSelect={handleSelect} className={"videoCarousel"} data-bs-interval="false" interval={null}>
                        {product.data.courseVideoList.map((video, index) => (
                            <CarouselItem className={"videoCarousel"}>
                                <CarouselItem text={`Video ${video._id}`} className={"videoCarousel"}/>
                                <iframe className={"courseVideo"}
                                        src={video.name}></iframe>
                            </CarouselItem>
                        ))}
                    </Carousel>
                </Col>
                <h5 className={"text-start mt-5 mb-2"}>Step 2: Take the Exam</h5>
                <Col lg={12} md={12} className={"text-center"}>
                    <button className="pricing__action mt-5 mb-5">
                        <Link to={
                            !!product.data.courseExamList[0] ?
                                `/classroom/${(product.data.courseExamList[0].examId)}/exam` :
                                '/error404'
                        }>
                            Take the Exam
                        </Link>
                    </button>
                </Col>
            </Row>
        </Container>);
}

export default ClassroomScreen;