import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';


export default function Footer() {
    return (
        <div>
            <footer className="pt-5 pb-2">
                <Container>
                    <Row>
                        <Col className="text-left">made with 💚️ by aim</Col>
                        <Col className="text-left">@ 2020 vegan dairy nepal</Col>
                        <Col className="text-right">
                            <a href="#facebook" className="text-dark">
                                <FaFacebookF />
                            </a>
                            <a href="#instagram" className="text-dark">
                                <FaInstagram />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
}
