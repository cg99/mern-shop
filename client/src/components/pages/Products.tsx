import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../../sass/products.scss';
import IProduct from '../../interfaces/IProduct';
import Axios from 'axios';



const AllProducts: React.FC = () => {
    const [products, setProducts] = useState<Array<IProduct>>([]);

    useEffect(() => {
        Axios.get('api/products')
            .then(res => {
                setProducts(res.data.products);
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <Container>
            <Row>

                {products && products.map((p, i) => (
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