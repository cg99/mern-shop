import React, { useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../../sass/products.scss';

import { useDispatch, useSelector } from 'react-redux';
import { GetProducts } from '../../actions/ProductActions';
import { RootStore } from '../../Store';


const AllProducts: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetProducts());
    }, [dispatch])

    const productsState = useSelector((state: RootStore) => state.products);

    return (
        <Container>
            <Row>

                {productsState.products && productsState.products.map((p, i) => (
                    <Col key={i} className="d-flex justify-content-center">

                        <Card style={{ width: '16rem' }}>
                            <Link to={`/product/${p.code}`}>
                                <Card.Img variant="top" src={`${window.location.origin.toString()}/images/${p.image}`} />
                            </Link>

                            <Card.Body className="text-left">
                                <Link to={`/product/${p.code}`} className="text-dark">

                                    <Card.Title>{p.name}</Card.Title>

                                </Link>

                                <Card.Text>
                                    {p.description}
                                </Card.Text>

                                <div className="d-flex justify-content-between align-items-center">

                                    <small>Rs {p.price}</small>

                                    <Button className="btn__add-to-cart" size={'sm'} variant="danger" style={{
                                        borderRadius: "30px",
                                        padding: "5px 10px",
                                    }}>
                                        <AiOutlineShoppingCart />
                                        <span style={{
                                            fontSize: "11px",
                                            verticalAlign: "text-bottom"
                                        }}> ADD TO CART</span>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </Container>
    )
}

export default AllProducts