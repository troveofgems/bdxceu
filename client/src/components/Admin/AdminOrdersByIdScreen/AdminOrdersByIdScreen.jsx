import React, {useEffect} from "react";
import {useFetchOrderByIdForAdminQuery} from "../../../redux/slices/orderSlice";
import {Preloader} from "../../shared/Preloader/Preloader";
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {formatDate} from "../../../utils/field.formatters";
import {formatToUsd} from "../../../assets/js/printing.utils";

import "./AdminOrdersByIdScreen.css";
const AdminOrderByIdScreen = () => {
    const {orderId} = useParams();
    const { data: order, isLoading: loadingOrder, refetch, error: orderError } = useFetchOrderByIdForAdminQuery(orderId);

    useEffect(() => {
        console.log("Order? ", order);
        refetch();
    }, [loadingOrder]);

    return (
        <>
            {loadingOrder ? <Preloader/> : (
                <div className={"userScreenContent orderScreenContent"}>
                    <Container>
                        <div className={"text-center"}>
                            <h1 className={"text-center"}>Order Id</h1>
                            <h3 className={"lead"}># {order.data._id}</h3>
                        </div>
                        <hr className={"hrStyle"} />
                        <Row>
                            <Col lg={4}>
                                <Row>
                                    <h4 className={"text-decoration-underline"}>Order Details</h4>
                                    <Col lg={5}>
                                        <p className={"lead"}>Student:</p>
                                    </Col>
                                    <Col lg={5}>
                                        <p className={"lead"}><strong>{order.data.user.firstName} {order.data.user.lastName}</strong></p>
                                    </Col>
                                    <Col lg={5}>
                                        <p className={"lead"}>Order Accepted:</p>
                                    </Col>
                                    <Col lg={5}>
                                        <p className={"lead"}><strong>{formatDate(order.data.createdAt)}</strong></p>
                                    </Col>
                                    <Col lg={5}>
                                        <p className={"lead"}>
                                            Product:
                                        </p>
                                    </Col>
                                    <Col lg={5}>
                                        <p className={"lead"}><strong>{order.data.productName}</strong></p>
                                    </Col>
                                    <Col lg={5}>
                                        <p className={"lead"}>
                                            Payment Status:
                                        </p>
                                    </Col>
                                    <Col lg={5}>
                                        <p className={"lead"}><strong>{order.data.paymentResult.status === "COMPLETED" ? "PAID" : "NOT PAID"}</strong></p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={4}>
                                <Row>
                                    <h4 className={"text-decoration-underline"}>Payment Details</h4>
                                    <Col lg={5}>
                                        <p className={"lead"}>Method:</p>
                                    </Col>
                                    <Col lg={6}>
                                        <p className={"lead"}><strong>{order.data.paymentMethod}</strong></p>
                                    </Col>
                                    <Col lg={5}>
                                        <p className={"lead"}>Payer Id:</p>
                                    </Col>
                                    <Col lg={6}>
                                        <p className={"lead"}><strong>{order.data.paymentResult.payerId}</strong></p>
                                    </Col>
                                    <Col lg={5}>
                                        <p className={"lead"}>Processor Id:</p>
                                    </Col>
                                    <Col lg={6}>
                                        <p className={"lead"}><strong>{order.data.paymentResult.orderId}</strong></p>
                                    </Col>
                                    <Col lg={5}>
                                        <p className={"lead"}>Processed On:</p>
                                    </Col>
                                    <Col lg={6}>
                                        <p className={"lead"}><strong>{formatDate(order.data.paymentResult.updateTime)}</strong></p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={4}>
                                <Row>
                                    <h4 className={"text-decoration-underline"}>Pricing Details</h4>
                                    <Col lg={5}>
                                        <p className={"lead"}>Course Cost:</p>
                                    </Col>
                                    <Col lg={6}>
                                        <p className={"lead"}><strong>{formatToUsd(order.data.itemPrice)}</strong></p>
                                    </Col>
                                    <Col lg={5}>
                                        <p className={"lead"}>Taxes Applied:</p>
                                    </Col>
                                    <Col lg={6}>
                                        <p className={"lead"}><strong>{formatToUsd(order.data.taxPrice)}</strong></p>
                                    </Col>
                                    <Col lg={5}>
                                        <p className={"lead"}>Total Charged:</p>
                                    </Col>
                                    <Col lg={6}>
                                        <p className={"lead"}><strong>{formatToUsd(order.data.totalPrice)}</strong></p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </>

    );
}

export default AdminOrderByIdScreen;