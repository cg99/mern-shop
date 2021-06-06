import React, { useState, useEffect } from 'react'
import { Col, Form, Button } from 'react-bootstrap';
import { BsCreditCard } from 'react-icons/bs';
import { GrStripe, GrPaypal } from 'react-icons/gr'
import { IoMdCash } from 'react-icons/io'
import StripeCheckout from '../checkout/StripeCheckout';
import { RootStore } from '../../Store';
import { useSelector } from 'react-redux';
import IOrder from '../../interfaces/IOrder';
import useInput from '../../helpers/useInput';
import axios from 'axios';
import ICartProduct from '../../interfaces/ICartProduct';


const OrderForm = () => {
    const cartState = useSelector((state: RootStore) => state.cart);

    const [address1, setAddress1] = useInput('');
    const [address2, setAddress2] = useInput('');
    const [city, setCity] = useInput('');
    const [province, setProvince] = useInput('');
    const [zipCode, setZipCode] = useInput('');
    const [phone, setPhone] = useInput('');
    const [email, setEmail] = useInput('');
    const [paymentMethod, setPaymentMethod] = useInput('');

    const lineItems = cartState.products.map(
        (cartItem: ICartProduct) => {
            return {
                id: cartItem.id,
                quantity: cartItem.quantity
            }
        }
    );

    const checkoutBtn = () => {
        if (paymentMethod === 'stripe') {
            return <StripeCheckout cart={cartState.products} />
        } else if (paymentMethod === 'credit-card') {
            return <div>Credit Card Checkout</div>
        } else if (paymentMethod === 'cash-on-delivery') {
            return <Button type="submit">Order</Button>
        } else {
            return <div>Select a payment method</div>
        }
    }

    const [orderForm, setOrderForm] = useState<IOrder>({
        shipping: {
            address: {
                primary_address: address1,
                secondary_address: address2,
                city: city,
                state: province,
                country: 'Nepal',
                zip_code: zipCode,
            },
            cost: 0
        },
        contact: {
            email: email,
            phone: phone
        },
        billing: {
            payment_method: paymentMethod,
            total_price: 0
        },
        order_date: new Date(),
        items: lineItems
    })

    useEffect(() => {
        setOrderForm({
            shipping: {
                address: {
                    primary_address: address1,
                    secondary_address: address2,
                    city: city,
                    state: province,
                    country: 'Nepal',
                    zip_code: zipCode,
                },
                cost: 0
            },
            contact: {
                email: email,
                phone: phone
            },
            billing: {
                payment_method: paymentMethod,
                total_price: 0
            },
            order_date: new Date(),
            items: lineItems
        })
    }, [address1, address2, city, province, zipCode, phone, email, paymentMethod])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('front data: ', orderForm);

        axios.post('/api/orders', { orderData: JSON.stringify(orderForm) })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

    }

    return (
        <Form className="text-left" onSubmit={handleSubmit}>
            <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control value={address1} type="text" onChange={setAddress1} placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2 (optional)</Form.Label>
                <Form.Control value={address2} type="text" onChange={setAddress2} placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" value={city} onChange={setCity} placeholder="Pokhara" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Province</Form.Label>
                    <Form.Control as="select" value={province} onChange={setProvince}>
                        <option value="1">Province 1</option>
                        <option value="2">Province 2</option>
                        <option value="3">Bagmati Province</option>
                        <option value="4">Gandaki Province</option>
                        <option value="5">Lumbini Province</option>
                        <option value="6">Karnali Province</option>
                        <option value="7">Sudurpashchim Province</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" value={zipCode} onChange={setZipCode} placeholder="33700" />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="emailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" value={email} onChange={setEmail} placeholder="example@email.com" />
            </Form.Group>

            <Form.Group controlId="phoneNumber">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" value={phone} onChange={setPhone} placeholder="9806632772" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Payment Method</Form.Label>

                <Form.Check type="radio" id="creditCardRadio">
                    <Form.Check.Input type="radio" name="paymentMethod" onChange={setPaymentMethod} value="credit-card" />
                    <Form.Check.Label style={paymentLabel}>
                        <BsCreditCard /><span>&nbsp;Credit Card</span>
                    </Form.Check.Label>
                </Form.Check>

                <Form.Check type="radio" id="stripeRadio">
                    <Form.Check.Input type="radio" name="paymentMethod" onChange={setPaymentMethod} value="stripe" />
                    <Form.Check.Label style={paymentLabel}>
                        <GrStripe /><span>&nbsp;Stripe</span>
                    </Form.Check.Label>
                </Form.Check>

                <Form.Check type="radio" id="CoDRadio">
                    <Form.Check.Input type="radio" name="paymentMethod" onChange={setPaymentMethod} value="cash-on-delivery" />
                    <Form.Check.Label style={paymentLabel}>
                        <IoMdCash /><span>&nbsp;Cash On Delivery</span>
                    </Form.Check.Label>
                </Form.Check>
            </Form.Group>

            <div className="w-100">
                {checkoutBtn()}
            </div>
        </Form>
    )
}

const paymentLabel = {
    display: "inline-flex",
    alignItems: "center"
}

export default OrderForm
