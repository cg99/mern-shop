import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { TiMinus, TiPlus } from 'react-icons/ti'
import '../../sass/products.scss';
import '../../sass/product.scss';
import { useParams } from 'react-router';
import Axios from 'axios';

interface IProduct {
    code: String,
    name: String,
    description: String,
    weight: String,
    image: String,
    price: Number,
    available: Boolean,
    stock: Number,
    images: Array<string>
}

interface IProductRouteParams {
    id: string;
}


const Product: React.FC = () => {
    const { id } = useParams<IProductRouteParams>();
    const [product, setProduct] = useState<IProduct | null>(null);

    const baseURL: string = window.location.origin.toString();

    useEffect(() => {
        Axios.get(baseURL + '/api/product/' + id)
            .then(res => {
                setProduct(res.data.product[0]);
            })
            .catch(err => console.log(err))
    }, [baseURL, id])

    const [imageBox, setImageBox] = useState<string | null>(null);

    return (
        <Container>
            { product &&
                <Row>
                    <Col className="col-2">
                        {
                            (product.images.length !== 0) &&
                            product.images.map((pic: string, i: number) => (
                                <img key={i} className="my-2 img-fluid product-image"
                                    src={baseURL + '/images/' + pic}
                                    onClick={() => setImageBox(pic)}
                                    alt="product image" />
                            ))
                        }

                        {/* <img className="img-fluid product__image--active" src="https://via.placeholder.com/140" alt="side place" /> */}
                    </Col>

                    <Col className="col-5 d-flex justify-content-center">
                        <Card style={{ height: 'fit-content' }}>
                            <Card.Img variant="top" src={baseURL + '/images/' + (imageBox ? imageBox : product.image)} />
                        </Card>
                    </Col>

                    <Col className="col-5">
                        <Card>
                            <Card.Body className="text-left">

                                <div className="card-title h3">{product.name}</div>

                                <table className="product-table" style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th>Available: </th>
                                            <td>{product.stock > 0 ? 'Yes' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <th>Weight: </th>
                                            <td>{product.weight}</td>
                                        </tr>
                                        <tr>
                                            <th>Calories: </th>
                                            <td>309 kCal</td>
                                        </tr>
                                        <tr>
                                            <th>Ingredients: </th>
                                            <td>
                                                <ul>
                                                    <li>Pumkin</li>
                                                    <li>Butter</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Description: </th>
                                            <td>
                                                <Card.Text>
                                                    {product.description}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Quantity: </th>
                                            <td>
                                                <div>
                                                    <TiMinus className="product__add" />
                                                    <span className="product__quantity"> 2 </span>
                                                    <TiPlus className="product__minus" />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div style={{ color: '#006800', fontSize: '2rem' }}>Rs {product.price}</div>

                                    <Button size={'sm'} variant="primary" style={{
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
                </Row>
            }
        </Container>
    )
}


export default Product
