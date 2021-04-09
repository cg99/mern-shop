import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

interface User {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<User>({ name: '', email: '', password: '', repeatPassword: '' });
    const [agree, setAgree] = useState(false);
    const [alert, setAlert] = useState<string | null>(null);
    const [signUpSuccess, setSignUpSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const key = e.currentTarget.name;
        const value = e.currentTarget.value;

        const data = Object.assign(formData);
        data[key] = value;

        setFormData(data);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const values = Object.values(formData);

        for (let i = 0; i < values.length; i++) {
            if (values[i] === "") {
                console.log('Empty value not allowed');
                return
            }
        }

        if (formData.password !== formData.repeatPassword) { // passwords checker
            console.log('Passwords do not match');
            return;
        }

        if (!agree) { // check if user agree to terms and conditions
            console.log('Agree to terms.');
            return;
        }

        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }

        axios.post("/api/signup", userData)
            .then(res => {
                if (res.data.success === true) {
                    setSignUpSuccess(true);
                }
                if (res.data.success === false && res.data.message === 'duplicate') {
                    setAlert("Email Already Exists!")
                }

            })
            .catch(err => console.log(err));
    }

    if (signUpSuccess) {
        return <Redirect to="/signin" />;
    }

    return (
        <div>
            <Container className="mt-4">
                <h2>Create Your Account</h2>
                {alert !== null && <Alert variant="danger">{alert}</Alert>}
                <Row className="justify-content-center text-left">
                    <Col sm={8}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="fullname">
                                <Form.Label>Your Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Name" name="name" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} required={true} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} required={true} />
                            </Form.Group>

                            <Form.Group controlId="repeatPassword">
                                <Form.Label>Repeat Password</Form.Label>
                                <Form.Control type="password" placeholder="Repeat Password" name="repeatPassword" onChange={handleChange} required={true} />
                            </Form.Group>

                            <Form.Group controlId="formCheckbox">
                                <Form.Check type="checkbox" label="Agree to Terms and Conditions" defaultChecked={agree}
                                    onChange={() => setAgree(!agree)} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <div>
                    Already have an account?
                </div>
                <Link to="/signin">
                    <Button variant="outline-success">Sign In</Button>
                </Link>
            </Container>
        </div>
    )
}

export default SignUp
