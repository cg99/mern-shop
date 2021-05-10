import { Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io'
import Item from './Item';
import { useEffect, useState } from 'react';
import ICartProduct from '../../interfaces/ICartProduct';
import useToken from '../../helpers/useToken';

const Items = () => {
    const { token } = useToken();
    const [cart, setCart] = useState<Array<ICartProduct>>([]);

    useEffect(() => {
        if(token) {
            const localCart = localStorage.getItem(token); // cart of user
            if (localCart) {
                setCart(JSON.parse(localCart));
            }
        }
        
    }, [token])

    return (
        <div>
            <Table className="shopping__cart--table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.length >= 1 && cart.map(item =>
                        <Item key={item.id} product={item} cart={cart} setCart={setCart} />
                    )}
                </tbody>
            </Table>
            <Row>
                <Col className="text-left d-flex" style={{ alignItems: "flex-end" }}>
                    <Link to="/products" style={boldStyle}> <IoIosArrowBack style={{ marginTop: "1px" }} /> Continue Shopping </Link>
                </Col>
                <Col className="mr-3">
                    <Row>
                        <Col className="text-right" style={{ fontSize: "14px", color: "#6c757d" }}>Subtotal: </Col>
                        <Col className="text-left">Rs 3999</Col>
                    </Row>
                    <Row>
                        <Col className="text-right" style={{ fontSize: "14px", color: "#6c757d" }}>Shipping: </Col>
                        <Col className="text-left">Free</Col>
                    </Row>
                    <Row style={{ borderTop: "2px solid #dae0e5", marginTop: "5px" }}>
                        <Col className="text-right"><div style={boldStyle}>Total: </div></Col>
                        <Col className="text-left"><div style={boldStyle}>Rs. 3999 </div></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

const boldStyle = {
    color: "#333",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center"
}

export default Items
