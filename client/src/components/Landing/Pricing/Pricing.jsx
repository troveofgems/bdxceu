import React, {useEffect} from "react";

// Associated Styles
import "../parallax.css";
import "./Pricing.css"
import Rating from "../../Rating/Rating";
import {Link} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import {useDeleteProductMutation} from "../../../redux/slices/productSlice";
import {useFetchProductsQuery} from "../../../redux/slices/productSlice";
import {Preloader} from "../../shared/Preloader/Preloader";
import {formatToUsd} from "../../../assets/js/printing.utils";
import WOW from "wowjs";
import {useGetUserProfileQuery} from "../../../redux/slices/userSlice";
import {useSelector} from "react-redux";
import {getUserInfo} from "../../../utils/user.utils";

const Pricing = () => {
    const
        { user } = useSelector((state) => state.auth),
        { isLoggedIn, isStudent, isTeamMember, isAuditor, isAdmin } = getUserInfo(user);

    const
        { // Products
            data: productList,
            isLoading: isLoadingProductList,
            error: errorLoadingProductList,
            refetch: refetchProductList
        } = useFetchProductsQuery(),
        { // User Data
            data: userData,
            isLoading: isLoadingUserData,
            error: errorLoadingUserData,
            refetch: refetchUserData
        } = useGetUserProfileQuery();

    // Action Mutations
    const [deleteProduct, { isLoading: isLoadingDeleteProduct }] = useDeleteProductMutation();
    const handleDeleteProduct = async (productId) => {
        if(window.confirm("Are you sure you want to delete this Product? This action cannot be undone.")) {
            try {
                await deleteProduct(productId);
                refetchProductList();
            } catch(err) {
                console.error(err);
            }
        }
    }

    useEffect(() => {
        refetchUserData();
        refetchProductList();
        new WOW.WOW({
            live: false
        }).init();
        if(!!productList) {
            console.log("Product List? ", productList);
        }
        if(!!userData) {
            console.log("User Data? ", userData);
        }
    }, []);

    return (isLoadingProductList || isLoadingUserData) ? <Preloader /> : (
        <section id="pricing" className="parallax-section">
            <Container className="pricingContainer">
                <Row className={productList?.data?.length === 0 ? "justify-content-center" : ""}>

                    {/* No Products Published Yet - All Users Regardless of Auth Status */}
                    {(!isLoggedIn || isLoggedIn) && productList?.data?.length === 0 && (
                        <div className="col-md-6 col-sm-6">
                            <div className="pricing__item pricing__no_items">
                                <h3 className="pricing__title">No Product Offerings Yet!</h3>
                            </div>
                        </div>
                    )}

                    {/* Not Logged In Product List View */}
                    {
                        (!isLoggedIn && productList.data.length > 0) && productList.data.map((product, i) => (
                            <div
                                className="wow fadeInUp col-md-6 col-sm-6  mt-2 mb-2"
                                data-wow-delay={((1 + (parseInt(i) * 0.2))) + "s"}
                                key={product._id}
                            >
                                <div className="pricing__item">
                                    <h3 className="pricing__title">{product.courseTitle}</h3>
                                    <Rating value={5}/>
                                    <div className="pricing__price">
                                        <span className="pricing__currency">{formatToUsd(product.courseCost)}</span>
                                    </div>
                                    <ul className="pricing__feature-list">
                                        {
                                            product.courseOfferingsList.map((offering, i) => (
                                                <li className="pricing__feature"
                                                    key={`offering_${i}`}>{offering.name}</li>
                                            ))
                                        }
                                    </ul>
                                    <button className="pricing__action">
                                        <Link to={`/product/${product._id}`}>
                                            Enroll Today!
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        ))
                    }

                    {/* Is Logged In Product List View - All Users*/}
                    {
                        (isLoggedIn && productList?.data?.length > 0) && (
                            <>
                                {isStudent && productList.data.map((product, i) => (
                                    <div
                                        className="wow fadeInUp col-md-6 col-sm-6  mt-2 mb-2"
                                        data-wow-delay={((1 + (parseInt(i) * 0.2))) + "s"}
                                        key={product._id}
                                    >
                                        <div className="pricing__item">
                                            <h3 className="pricing__title">{product.courseTitle}</h3>
                                            <Rating value={5}/>
                                            <div className="pricing__price">
                                                <span
                                                    className="pricing__currency">{formatToUsd(product.courseCost)}</span>
                                            </div>
                                            <ul className="pricing__feature-list">
                                                {
                                                    product.courseOfferingsList.map((offering, i) => (
                                                        <li className="pricing__feature"
                                                            key={`offering_${i}`}>{offering.name}</li>
                                                    ))
                                                }
                                            </ul>
                                            <button className="pricing__action">
                                                <Link to={(!!userData && userData.data.subscribedModules.find(enrolledCourses => enrolledCourses.product?._id === product._id)) ? `/classroom/${product._id}` : `/product/${product._id}`}>
                                                    {
                                                        (!!userData && userData.data.subscribedModules.find(enrolledCourses => enrolledCourses.product?._id === product._id)) ? "Go To Classroom" : "Enroll Today!"
                                                    }
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {isAdmin && productList.data.map((product, i) => (
                                    <div
                                        className="wow fadeInUp col-md-6 col-sm-6  mt-2 mb-2"
                                        key={product._id}
                                    >
                                        <div className="pricing__item">
                                            <h3 className={product.courseIsPublished ? "pricing__title published" : "pricing__title inactive"}>{product.courseTitle}</h3>
                                            <Rating value={5}/>
                                            <div className="pricing__price">
                                                <span
                                                    className="pricing__currency">{formatToUsd(product.courseCost)}</span>
                                            </div>
                                            <ul className="pricing__feature-list">
                                                {
                                                    product.courseOfferingsList.map((offering, i) => (
                                                        <li className="pricing__feature"
                                                            key={`offering_${i}`}>{offering.name}</li>
                                                    ))
                                                }
                                            </ul>
                                            <button className="pricing__action">
                                                <Link to={`/product/${product._id}`}>
                                                    View
                                                </Link>
                                            </button>
                                            <button className="pricing__action mt-2">
                                                <Link to={`/admin/products/${product._id}/edit`}>
                                                    Edit
                                                </Link>
                                            </button>
                                            <button className="pricing__action mt-2" onClick={handleDeleteProduct}>
                                                <span>
                                                    Delete
                                                </span>
                                            </button>
                                            <button className="pricing__action mt-2">
                                                <Link to={`/classroom/${product._id}`}>
                                                    Classroom
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                    }
                </Row>
            </Container>
        </section>
    );
}

export default Pricing;