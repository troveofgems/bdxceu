import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

// Page Spinner
import { Preloader } from "../../components/shared/Preloader/Preloader";

// Redux Actions
import { useFetchProductByIdQuery } from "../../redux/slices/productSlice";

// CSS Imports
import "../../components/Landing/parallax.css";
import "../../components/Landing/Team/Team.css";
import "./ProductScreen.css";
import { getSiteTeamHeadshots } from "../../utils/user.utils";
const ProductScreen = () => {
  const [courseInstructorProfile, setCourseInstructorProfile] = useState(null);

  const { id: productId } = useParams();
  const {
    data: product,
    isLoading: isLoadingProductById,
    refetch,
    error,
  } = useFetchProductByIdQuery(productId);

  const { user } = useSelector((state) => state.auth),
    isAdmin = user?.authLevel === "admin" || false,
    isLoggedInUser = !!user;

  useEffect(() => {
    if (!!product && !isLoadingProductById) {
      let instructorImageArtifacts = getSiteTeamHeadshots(
        `${product.data.courseInstructor.firstName.toLowerCase()}.${product.data.courseInstructor.lastName.toLowerCase()}`,
      );
      setCourseInstructorProfile(instructorImageArtifacts);
    }
  }, [productId, isLoadingProductById, product]);

  return isLoadingProductById ? (
    <Preloader />
  ) : (
    <section id="product" className="parallax-section productByIdPage">
      <div id="product-header">
        <h3 className="wow bounceIn" data-wow-delay="0.9s">
          Let's Get You Signed Up For The
        </h3>
        <h1 className="wow fadeInUp" data-wow-delay="1.6s">
          {product.data.courseTitle}
        </h1>
      </div>
      <Row className={"productContainer"}>
        <h1 className={"text-center"}>The {product.data.courseTitle}</h1>
        <hr className={"w-75 m-auto mt-3 mb-3"} />
        <Col lg={4} md={4} sm={12}>
          <section id="chiropractic-team" className={"team-style-override"}>
            <div id={"course-instructor"}>
              <h3 className={"instructorHeader mb-0 pb-0"}>
                Course Instructor
              </h3>
              <div className="chiropractic-team-thumb course-instructor-thumb">
                {courseInstructorProfile !== null && (
                  <img
                    src={`${courseInstructorProfile.headshot}`}
                    className={`${courseInstructorProfile.appendCSS}`}
                    alt="chiropractic-team"
                    height={courseInstructorProfile.imgDimensions.height}
                    width={courseInstructorProfile.imgDimensions.width}
                  />
                )}
                <div className="chiropractic-team-overlay">
                  <div className="chiropractic-team-des">
                    <h2>
                      {product.data.courseInstructor.firstName}{" "}
                      {product.data.courseInstructor.lastName}
                    </h2>
                    <h3>
                      {product.data.courseInstructor.certificationList.join(
                        ", ",
                      )}
                    </h3>
                  </div>
                </div>
              </div>
              <p>{product.data.courseInstructor.description}</p>
            </div>
          </section>
        </Col>
        <Col lg={4} md={4} sm={12}>
          <div className="blog-content wow fadeInUp" data-wow-delay="1s">
            <div className="blog-clear"></div>
            <div>
              <h5>Course Description</h5>
              <p>{product.data.courseDescription}</p>
              <h5>What's Offered:</h5>
              <ul>
                {product.data.courseOfferingsList.map((offering, i) => (
                  <li key={offering._id}>{offering.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
        <Col lg={4} md={4} sm={12}>
          <div className="d-flex justify-content-center align-self-center">
            <div className="blog-content wow fadeInUp" data-wow-delay="1s">
              <Link
                to={`/product/${product.data._id}/checkout`}
                className={`btn btn-default ${(!isLoggedInUser || isAdmin) && "disabled"}`}
              >
                Enroll Now For ${product.data.courseCost} USD
              </Link>
              <div className="blog-clear"></div>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ProductScreen;
