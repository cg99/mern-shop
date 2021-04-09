import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import StripeCheckout from '../checkout/StripeCheckout';
// import { BsCreditCard } from 'react-icons/bs';
import { GrStripe, GrPaypal } from 'react-icons/gr'

const BillingForm = () => {
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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
        <div>
            <Form className="text-left">
                <Form.Group>
                    <Form.Label>Payment Method</Form.Label>

                    <Form.Check type="radio" id="creditCardRadio">
                        <Form.Check.Input type="radio" name="paymentMethod" onChange={handleChange} value="paypal"/>
                        <Form.Check.Label style={paymentLabel}>
                            <GrPaypal /><span>&nbsp;PayPal</span>
                        </Form.Check.Label>
                    </Form.Check>

                    <Form.Check type="radio" id="stripeRadio">
                        <Form.Check.Input type="radio" name="paymentMethod" onChange={handleChange} value="stripe"/>
                        <Form.Check.Label style={paymentLabel}>
                            <GrStripe /><span>&nbsp;Stripe</span>
                        </Form.Check.Label>
                    </Form.Check>
                </Form.Group>

                {/* <Form.Group controlId="cardOwnerName">
                    <Form.Label>Name On Card</Form.Label>
                    <Form.Control type="text" placeholder="Umesh GM" />
                </Form.Group>

                <Form.Group controlId="creditCardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" placeholder="123223432" />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="expiryDate">
                        <Form.Label>Exipration Date</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="CVV">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control type="text" placeholder="245" />
                    </Form.Group>
                </Form.Row> */}
            </Form>
            {checkoutBtn()}
        </div>
    )
}

const paymentLabel = {
    display: "inline-flex",
    alignItems: "center"
}

export default BillingForm
