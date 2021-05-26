import { Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io'
import Item from './Item';
import { useEffect, useState } from 'react';
import ICartProduct from '../../interfaces/ICartProduct';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../Store';
import totalPriceCalculator from '../../helpers/CalculateTotal';
import { ClearCart } from '../../actions/CartActions';

const Items = () => {

    const cartState = useSelector((state: RootStore) => state.cart);
    const cart: Array<ICartProduct> = cartState.products;

    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const total: number = totalPriceCalculator(cart);
        setTotalAmount(total)
    }, [cart])

    const dispatch = useDispatch()

    const handleClearCart = () => {
        dispatch(ClearCart());
    }

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
                    {cart.length > 0 ? cart.map((item) =>
                        <Item key={item?.id} product={item} cart={cart} />
                    ) : (<tr><td>Add items to the cart</td><td></td><td></td><td></td></tr>)}
                </tbody>
            </Table>
            
            <Row>
                <Col className="text-left d-flex justify-content-between" style={{ alignItems: "flex-start", flexDirection: "column", }}>
                    {cart.length > 0 && <Button className="ml-2 btn-danger" onClick={handleClearCart}>Clear Cart</Button>}

                    <Link to="/products" style={boldStyle}> <IoIosArrowBack style={{ marginTop: "1px" }} /> Continue Shopping </Link>
                </Col>
                <Col className="mr-3">
                    <Row>
                        <Col className="text-right" style={{ fontSize: "14px", color: "#6c757d" }}>Subtotal: </Col>
                        <Col className="text-left">Rs {totalAmount}</Col>
                    </Row>
                    <Row>
                        <Col className="text-right" style={{ fontSize: "14px", color: "#6c757d" }}>Shipping: </Col>
                        <Col className="text-left">Free</Col>
                    </Row>
                    <Row style={{ borderTop: "2px solid #dae0e5", marginTop: "5px" }}>
                        <Col className="text-right"><div style={boldStyle}>Total: </div></Col>
                        <Col className="text-left"><div style={boldStyle}>Rs. {totalAmount} </div></Col>
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
