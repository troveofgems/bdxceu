import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WOW from "wowjs";

// Associated Components
import { Preloader } from "../../shared/Preloader/Preloader";
import Rating from "../../Rating/Rating";

// Redux Connections
import { useDeleteProductMutation } from "../../../redux/slices/productSlice";
import { useFetchProductsQuery } from "../../../redux/slices/productSlice";
import { useGetUserProfileQuery } from "../../../redux/slices/userSlice";

// Dev Utils
import { formatToUsd } from "../../../assets/js/printing.utils";
import { getUserInfo } from "../../../utils/user.utils";

// Associated Styles
/*import "../parallax.css";*/
import "./Pricing.css";
const Pricing = () => {
  const { user } = useSelector((state) => state.auth),
    { isLoggedIn, isStudent, isAdmin } = getUserInfo(user);

  const {
      // Products
      data: productList,
      isLoading: isLoadingProductList,
      error: errorLoadingProductList,
      refetch: refetchProductList,
    } = useFetchProductsQuery(),
    {
      // User Data
      data: userData,
      isLoading: isLoadingUserData,
      error: errorLoadingUserData,
      refetch: refetchUserData,
    } = useGetUserProfileQuery();

  // Action Mutations
  const [deleteProduct, { isLoading: isLoadingDeleteProduct }] =
    useDeleteProductMutation();
  const handleDeleteProduct = async (productId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this Product? This action cannot be undone.",
      )
    ) {
      try {
        await deleteProduct(productId);
        refetchProductList();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    refetchUserData();
    refetchProductList();
    new WOW.WOW({
      live: false,
    }).init();
  }, []);

  return isLoadingProductList || isLoadingUserData ? (
    <Preloader />
  ) : (
    <section id="pricing" className="parallax-section">
      <Container className="pricingContainer">
        <Row
          className={
            productList?.data?.length === 0 ? "justify-content-center" : ""
          }
        >
          {/* No Products Published Yet - All Users Regardless of Auth Status */}
          {(!isLoggedIn || isLoggedIn) && productList?.data?.length === 0 && (
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="pricing__item pricing__no_items">
                <h3 className="pricing__title">No Product Offerings Yet!</h3>
              </div>
            </div>
          )}

          {/* Not Logged In Product List View */}
          {!isLoggedIn &&
            productList?.data?.length > 0 &&
            productList.data.map((product, i) => (
              <div
                className="wow fadeInUp col-lg-6 col-md-12 col-sm-12  mt-2 mb-2"
                data-wow-delay={1 + parseInt(i) * 0.2 + "s"}
                key={product._id}
              >
                <div className="pricing__item">
                  <h3 className="pricing__title">{product.courseTitle}</h3>
                  <Rating value={5} />
                  <div className="pricing__price">
                    <span className="pricing__currency">
                      {formatToUsd(product.courseCost)}
                    </span>
                  </div>
                  <ul className="pricing__feature-list">
                    {product.courseOfferingsList.map((offering, i) => (
                      <li className="pricing__feature" key={`offering_${i}`}>
                        {offering.name}
                      </li>
                    ))}
                  </ul>
                  <button className="pricing__action">
                    <Link to={`/product/${product._id}`}>Enroll Today!</Link>
                  </button>
                </div>
              </div>
            ))}

          {/* Is Logged In Product List View - All Users*/}
          {isLoggedIn && productList?.data?.length > 0 && (
            <>
              {isStudent &&
                productList.data.map((product, i) => (
                  <div
                    className="wow fadeInUp col-lg-6 col-md-12 col-sm-12  mt-2 mb-2"
                    data-wow-delay={1 + parseInt(i) * 0.2 + "s"}
                    key={product._id}
                  >
                    <div className="pricing__item">
                      <h3 className="pricing__title">{product.courseTitle}</h3>
                      <Rating value={5} />
                      <div className="pricing__price">
                        <span className="pricing__currency">
                          {formatToUsd(product.courseCost)}
                        </span>
                      </div>
                      <ul className="pricing__feature-list">
                        {product.courseOfferingsList.map((offering, i) => (
                          <li
                            className="pricing__feature"
                            key={`offering_${i}`}
                          >
                            {offering.name}
                          </li>
                        ))}
                      </ul>
                      <button className="pricing__action">
                        <Link
                          to={
                            !!userData &&
                            userData.data.subscribedModules.find(
                              (enrolledCourses) =>
                                enrolledCourses.product?._id === product._id,
                            )
                              ? `/classroom/${product._id}`
                              : `/product/${product._id}`
                          }
                        >
                          {!!userData &&
                          userData.data.subscribedModules.find(
                            (enrolledCourses) =>
                              enrolledCourses.product?._id === product._id,
                          )
                            ? "Go To Classroom"
                            : "Enroll Today!"}
                        </Link>
                      </button>
                    </div>
                  </div>
                ))}
              {isAdmin &&
                productList.data.map((product, i) => (
                  <div
                    className="wow fadeInUp col-lg-6 col-md-12 col-sm-12  mt-2 mb-2"
                    key={product._id}
                  >
                    <div className="pricing__item">
                      <h3
                        className={
                          product.courseIsPublished
                            ? "pricing__title published"
                            : "pricing__title inactive"
                        }
                      >
                        {product.courseTitle}
                      </h3>
                      <Rating value={5} />
                      <div className="pricing__price">
                        <span className="pricing__currency">
                          {formatToUsd(product.courseCost)}
                        </span>
                      </div>
                      <ul className="pricing__feature-list">
                        {product.courseOfferingsList.map((offering, i) => (
                          <li
                            className="pricing__feature"
                            key={`offering_${i}`}
                          >
                            {offering.name}
                          </li>
                        ))}
                      </ul>
                      <button className="pricing__action">
                        <Link to={`/product/${product._id}`}>View</Link>
                      </button>
                      <button className="pricing__action mt-2">
                        <Link to={`/admin/products/${product._id}/edit`}>
                          Edit
                        </Link>
                      </button>
                      <button
                        className="pricing__action mt-2"
                        onClick={handleDeleteProduct}
                      >
                        <span>Delete</span>
                      </button>
                      <button className="pricing__action mt-2">
                        <Link to={`/classroom/${product._id}`}>Classroom</Link>
                      </button>
                    </div>
                  </div>
                ))}
            </>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Pricing;
