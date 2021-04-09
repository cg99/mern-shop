import React from 'react';
import { Button } from 'react-bootstrap';
import { IoBagCheckOutline } from 'react-icons/io5'
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe('pk_test_51GtmvJLXX9ZK66L1J7Fjp1qubPOUBX0rWA6BsF68dV3qgcA4Z1rAyDh9UeCC6PesuobTODmDLGDKUvXCCiaAo9vM007ULkAsdC');

const StripeCheckout = () => {

    const handleClick = async () => {

        // Get Stripe.js instance
        const stripe = await stripePromise;

        // Call your backend to create the Checkout Session
        const response = await fetch('/checkout/create-checkout-session', { method: 'POST' });

        const session = await response.json();

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            console.log(result.error.message);
        }
    };
    return (
        <div>
            <Button role="link" variant="primary" disabled={false}
                onClick={handleClick} className="w-100" style={checkoutBtn}>
                <IoBagCheckOutline /> &nbsp;Checkout
            </Button>
        </div>
    )
}

const checkoutBtn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
}
export default StripeCheckout
