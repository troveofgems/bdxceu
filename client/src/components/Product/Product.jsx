import NavigationBar from "../shared/Navigation/Navigation";
import SiteFooter from "../shared/Footer/Footer";
import React, {useEffect, useState} from "react";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import "./Product.css";

const stripePromise = loadStripe('pk_test_yymzZfXOt9IWWLhIjwAqXD1X00dVEfYWRQ');
export const Product = () => {
    const [clientSecret, setClientSecret] = useState("");
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "live-course", amount: 125000 }] }),
        })
            .then((res) => {
                console.log("Making Fetch? ");
                return res.json()})
            .then((data) => {
                setClientSecret(data.clientSecret);
                // [DEV] For demo purposes only
                setDpmCheckerLink(data.dpmCheckerLink);
            }).catch(err => console.error(err));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';

    return (<>
        <NavigationBar />
        <section id="blog-header" className="parallax-section">
            <div className="container">
                <div className="row">

                    <div className="col-md-offset-2 col-md-8 col-sm-12">
                        <h3 className="wow bounceIn" data-wow-delay="0.9s">Let's Get You Signed Up!</h3>
                        <h1 className="wow fadeInUp" data-wow-delay="1.6s">Online | Live Course</h1>
                        <p>{new Date().toString()}</p>
                    </div>
                </div>
            </div>
        </section>
        <section id="blog" className="parallax-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <div className="blog-content wow fadeInUp" data-wow-delay="1s">
                            <h3>$750.00 | $1250.00 USD</h3>
                            <div className="blog-clear"></div>
                            <div>
                                <h3>
                                    What's Offered:
                                </h3>
                                <p>Product Description</p>
                                <ul>
                                    <li>List Description Offerings</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="blog-content wow fadeInUp" data-wow-delay="1s">
                            <h3>Pay with Stripe</h3>
                            <div className="blog-clear"></div>
                            <div id={"stripeAnchor"}>
                                {clientSecret && (
                                    <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <SiteFooter />
    </>)
}