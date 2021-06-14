import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import useInput from '../../helpers/useInput';
import useToken from '../../helpers/useToken';


interface User {
    email: string;
    password: string;
}

const SignIn = () => {
    const [formData, setFormData] = useState<User>({ email: '', password: '' });
    const [signInSuccess, setSignInSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const key = e.currentTarget.name;
        const value = e.currentTarget.value;

        const data = Object.assign(formData);
        data[key] = value;

        setFormData(data);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = formData.email;
        const password = formData.password;

        if (email === '' || password === '') {
            console.log('Cannot leave input field blank.')
        }

        const userData: User = { email, password }

        Axios.post('api/signin', userData)
            .then(res => {
                if (res.data.success === true) {
                    localStorage.setItem('ecomAccessToken', JSON.stringify(res.data.accessToken));
                    setSignInSuccess(true);

                } else setSignInSuccess(false);
            })
            .catch(err => console.log(err))

    }


    const { token, } = useToken();

    useEffect(() => {
        if (token) {
            <Redirect to="/profile" />
        }
    }, [token])


    if (signInSuccess) {
        return <Redirect to="/" />;
    }


    return (
        <div>
            <Container className="mt-4">
                <h2>Sign in to your account</h2>
                <Row className="justify-content-center text-left">
                    <Col sm={8}><Form onSubmit={handleSubmit} >

                        <Form.Group controlId="formEmail" >
                            <Form.Label>Email or Phone Number</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form></Col>
                </Row>

                <div>
                    Don't have an account?
                </div>
                <Link to="/signup">
                    <Button variant="outline-success">Create New Account</Button>
                </Link>
            </Container>
        </div>
    )
}

export default SignIn
