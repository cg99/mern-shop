import React, { useState } from 'react'
import { Col, Form, Button } from 'react-bootstrap';
import StripeCheckout from '../checkout/StripeCheckout';
// import { BsCreditCard } from 'react-icons/bs';
import { GrStripe, GrPaypal } from 'react-icons/gr'

const OrderForm = () => {
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value)
    }

    const checkoutBtn = () => {
        if (paymentMethod === 'stripe') {
            return <StripeCheckout />
        } else if (paymentMethod === 'paypal') {
            return <div>PayPal Checkout</div>
        } else {
            return <div>Select a payment method</div>
        }
    }

    return (
        <Form className="text-left">
            <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="emailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control placeholder="example@email.com" />
            </Form.Group>

            <Form.Group controlId="phoneNumber">
                <Form.Label>Phone</Form.Label>
                <Form.Control placeholder="9806632772" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Payment Method</Form.Label>

                <Form.Check type="radio" id="creditCardRadio">
                    <Form.Check.Input type="radio" name="paymentMethod" onChange={handleChange} value="paypal" />
                    <Form.Check.Label style={paymentLabel}>
                        <GrPaypal /><span>&nbsp;PayPal</span>
                    </Form.Check.Label>
                </Form.Check>

                <Form.Check type="radio" id="stripeRadio">
                    <Form.Check.Input type="radio" name="paymentMethod" onChange={handleChange} value="stripe" />
                    <Form.Check.Label style={paymentLabel}>
                        <GrStripe /><span>&nbsp;Stripe</span>
                    </Form.Check.Label>
                </Form.Check>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
                Checkout
            </Button>
        </Form>
    )
}

const paymentLabel = {
    display: "inline-flex",
    alignItems: "center"
}

export default OrderForm
