import React from 'react'
import { Button, Form } from 'react-bootstrap';

const ContactForm = () => {
    return (
        <Form className="text-left">
            <Form.Group controlId="emailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control placeholder="example@email.com" />
            </Form.Group>

            <Form.Group controlId="phoneNumber">
                <Form.Label>Phone</Form.Label>
                <Form.Control placeholder="9806632772" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
                Continue
            </Button>
        </Form>
    )
}

export default ContactForm
