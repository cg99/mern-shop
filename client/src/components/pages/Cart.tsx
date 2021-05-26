import { Container, Row, Col } from 'react-bootstrap';
import Items from '../cart/Items'

import '../../sass/cart.scss';
import React from 'react';
import OrderForm from '../cart/OrderForm';



const Cart: React.FC = () => {
    
    return (
        <div className="my-4">
            <Container>
                <Row>
                    <Col md={7} className="pr-4">
                        <h2 className="text-left mb-4">Shopping Cart</h2>
                        <Items />
                    </Col>
                    <Col md={5} style={{
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        padding: "2rem",
                        margin: "auto"
                    }}>
                        <h2 className="text-left mb-3">Order Information</h2>
                        <OrderForm />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default Cart
