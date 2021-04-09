import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Intro from '../Intro';
import Featured from '../Featured';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import '../../sass/main.scss';
import { Link } from 'react-router-dom';
import featuredPic from '../../images/pumpkin.jpg';


function Main() {
    return (
        <Container style={{ height: "68vh" }}>
            <Row>
                <Col className="mt-4">
                    <Intro />
                </Col>
                <Col>
                    <div className="product__card">
                        <img alt="product detail" width="100" src={featuredPic} />
                        <Container className="py-4">
                            <Row className="product_desc">
                                <Col className="col-8">
                                    <h4>Pumkin Seed Butter</h4>
                                </Col>
                                <Col className="col-4" style={{fontSize: "12px", color: "#6c757d"}}>
                                    <span>280 g</span>
                                </Col>
                            </Row>
                            <Row className="product_desc">
                                <Col className="col-8" style={{fontSize: "12px", color: "#6c757d"}}>
                                    <div>great source of zinc and magnesium </div>
                                </Col>
                                <Col className="col-4" style={{fontSize: "12px", fontWeight: "bold"}}>
                                    <span>Rs. 500</span>
                                </Col>

                            </Row>
                        </Container>
                        <Link to="/cart" className="product__cart--cta text-dark">
                            <AiOutlineShoppingCart />
                        </Link>
                    </div>
                    <Featured />
                </Col>
            </Row>
        </Container>
    )
}

export default Main
