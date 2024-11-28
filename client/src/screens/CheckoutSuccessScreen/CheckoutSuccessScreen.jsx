import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

/*import "./CheckoutScreen.css";*/
import {Preloader} from "../../components/shared/Preloader/Preloader";
import {formatToUsd} from "../../assets/js/printing.utils";
const CheckoutSuccessScreen = () => {
    const {state} = useLocation();
    const { _id, createdAt, isPaid, itemPrice, paymentMethod, paymentResult, productName } = state;

    useEffect(() => {}, []);

    return (
        <Container>
            <hr/>
            <h2 className={"text-center"}>Print this Page For Your Records</h2>
            <hr className={"mb-3"}/>

            <h1 className={"mt-3"}>Your Order Has Been Successfully Processed!</h1>
            <h3 className={"mt-3"}>{productName} - {formatToUsd(itemPrice)}</h3>
            <h5 className={"mt-3 mb-3 text-decoration-underline"}>Order Details</h5>
            <Row>
                <Col lg={2} md={12}>
                    <p>Order Id:</p>
                    <p>Purchase For:</p>
                    <p>Placed On:</p>
                    <p>Payment Method:</p>
                    <p>Payer Id:</p>
                    <p>Processor Id:</p>
                    <p>Processor Status:</p>
                    <p>Processed At:</p>
                    <p>Total Charges:</p>
                </Col>
                <Col lg={3} md={12}>
                    <p><strong>{_id}</strong></p>
                    <p><strong>{productName}</strong></p>
                    <p><strong>{new Date(createdAt).toLocaleString()}</strong></p>
                    <p><strong>{paymentMethod}</strong></p>
                    <p><strong>{paymentResult.payerId}</strong></p>
                    <p><strong>{paymentResult.orderId}</strong></p>
                    <p><strong>{paymentResult.status}</strong></p>
                    <p><strong>{new Date(paymentResult.updateTime).toLocaleString()}</strong></p>
                    <p><strong>{formatToUsd(itemPrice)}</strong></p>
                </Col>
                <Col lg={7} md={12}>
                    <p>Go To Classroom Panel Goes Here</p>
                </Col>
            </Row>
        </Container>);
}

export default CheckoutSuccessScreen;