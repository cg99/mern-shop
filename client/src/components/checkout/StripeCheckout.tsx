/*
this is stripe client only integration
https://stripe.com/docs/js/checkout/redirect_to_checkout
*/

import React from 'react';
import { Button } from 'react-bootstrap';
import { IoBagCheckOutline } from 'react-icons/io5'
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

import axios from 'axios';
import ICartProduct from '../../interfaces/ICartProduct';

const stripePromise = loadStripe('pk_test_51GtmvJLXX9ZK66L1J7Fjp1qubPOUBX0rWA6BsF68dV3qgcA4Z1rAyDh9UeCC6PesuobTODmDLGDKUvXCCiaAo9vM007ULkAsdC');

const StripeCheckout = (props: { cart: Array<ICartProduct> }) => {
    const cart = props.cart;

    const handleClick = async () => {
        const orderedItems = cart.map(
            (cartItem: ICartProduct) => {
                const { name, price, quantity } = cartItem;
                return { name, price, quantity }
            }
        );

        // Get Stripe.js instance
        const stripe = await stripePromise;


        // Call your backend to create the Checkout Session
        const response = await axios.post('/checkout/create-checkout-session', {
            items: JSON.stringify(orderedItems)
        })

        const session = response.data.id;

        console.log(session)

        if (!stripe) return;

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: session,
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
