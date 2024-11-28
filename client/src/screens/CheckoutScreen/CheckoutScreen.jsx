import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import {FormProvider, useForm} from "react-hook-form";

import {Form} from "react-bootstrap";

import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {useGetPaypalClientIdQuery, useCreateBDXCEUOrderMutation} from "../../redux/slices/orderSlice";
import { toast } from "react-toastify";

import {useFetchProductByIdQuery} from "../../redux/slices/productSlice";

import "./CheckoutScreen.css";
import {Preloader} from "../../components/shared/Preloader/Preloader";
import {formatToUsd} from "../../assets/js/printing.utils";
const CheckoutScreen = () => {
    const { id: productId } = useParams();

    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const methods = useForm();
    const paymentMethods = useForm();
    const navigate = useNavigate();

    const [createBDXCEUOrder, {isLoading: isLoadingProcessOrder}] = useCreateBDXCEUOrderMutation();
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();

    const {data: paypal, isLoading: isLoadingFetchPaypalClientId, error: paypalError} = useGetPaypalClientIdQuery();
    const {data: product, isLoading: isLoadingProductById, refetch, error: productError} = useFetchProductByIdQuery(productId);

    const handleFormChange = evt => setPaymentMethod(evt.target.value);

    useEffect(() => {
        if(!paypalError && !isLoadingFetchPaypalClientId && paypal.data.client_id) {
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.data.client_id,
                        currency: 'USD'
                    }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            }
            if(!window.paypal) {
                loadPaypalScript().then(data => console.log("Data? ", data));
            }
        } else if(paymentMethod === "Stripe") {
            // Check to see if this is a redirect back from Checkout
            const query = new URLSearchParams(window.location.search);

            if (query.get("success")) {
                setMessage("Order placed! You will receive an email confirmation.");
            }

            if (query.get("canceled")) {
                setMessage(
                    "Order canceled -- continue to shop around and checkout when you're ready."
                );
            }
        }
    }, [paypal, paypalError, paypalDispatch, isLoadingFetchPaypalClientId, productId]);

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: product.data.courseCost
                    }
                }
            ]
        }).then((orderId) => {
            return orderId;
        });

    }
    function onApprove(data, actions) {
        return actions.order.capture().then(async function(orderId, details) {
            try {
                const res = await createBDXCEUOrder({orderId, details, productId, paymentMethod}).unwrap();
                console.log("Response for order was: ", res);
                toast.success("Payment Successful...");
                return navigate(`/checkout-success/${res.data._id}`, { state: { ...res.data } });
            } catch(err) {
                console.error(err);
                toast.error(err?.data?.message || err.message);
            }
        });
    }
    function onError(err) {
        toast.error(err.message);
    }

    const [message, setMessage] = useState("");
    const Message = ({ message }) => (
        <section>
            <p>{message}</p>
        </section>
    );



    return (isLoadingFetchPaypalClientId || isLoadingProductById) ? <Preloader /> : (
        <Container>
            <h1 className={"mt-3"}>Almost There!</h1>
            <h3 className={"mt-3"}>{product.data.courseTitle}</h3>
            <h4 className={"mt-3"}>{formatToUsd(product.data.courseCost)}</h4>
            <Row>
                <Col md={6}>
                    <FormProvider {...paymentMethods}>
                        <Form
                            onSubmit={e => e.preventDefault()}
                            noValidate
                            className="payment-methods-form"
                            autoComplete="off"
                        >
                            <h4 className={"mb-2"}>Payment Methods</h4>
                            <h6 className={"mb-3"}>Select Your Payment Method Option:</h6>
                            <Form.Check
                                type={"radio"}
                                label={"PayPal or Credit Card"}
                                id={"PayPal"}
                                name={"paymentMethod"}
                                className={"align-content-center mb-3"}
                                value={"PayPal"}
                                defaultChecked={paymentMethod === "PayPal"}
                                onClick={handleFormChange}
                            />
                            <Form.Check
                                type={"radio"}
                                label={"Stripe"}
                                id={"Stripe"}
                                className={"align-content-center"}
                                name={"paymentMethod"}
                                value={"Stripe"}
                                onClick={handleFormChange}
                            ></Form.Check>
                        </Form>
                    </FormProvider>
                </Col>
                <Col md={6}>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={e => e.preventDefault()}
                            noValidate
                            className="payment-method-form"
                            autoComplete="off"
                        >
                            <h4>{paymentMethod} Payment Form</h4>
                            {
                                (paymentMethod === "PayPal" && !isLoadingFetchPaypalClientId) && (
                                    <ListGroup.Item>
                                        <div>
                                            <PayPalButtons
                                                createOrder={createOrder}
                                                onApprove={onApprove}
                                                onError={onError}
                                            ></PayPalButtons>
                                        </div>
                                    </ListGroup.Item>
                                )
                            }
                            {
                                (paymentMethod === "Stripe" && !isLoadingFetchPaypalClientId) && (
                                    <section>
                                        <div className="product">
                                            <img
                                                src="https://i.imgur.com/EHyR2nP.png"
                                                alt="The cover of Stubborn Attachments"
                                            />
                                            <div className="description">
                                                <h3>{product.data.courseTitle}</h3>
                                                <h5>{formatToUsd(product.data.courseCost)}</h5>
                                            </div>
                                        </div>
                                        <form action="/payment-method/stripe/create-checkout-session" method="POST">
                                            <button type="submit" className={"modalButtonAuth buttonAuthLogin modalButtonSubmit"}>
                                                Checkout
                                            </button>
                                        </form>
                                    </section>
                                )
                            }
                        </form>
                    </FormProvider>
                </Col>
            </Row>
        </Container>);
}

export default CheckoutScreen;