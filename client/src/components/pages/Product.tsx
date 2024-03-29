import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import '../../sass/products.scss';
import '../../sass/product.scss';
import { useParams } from 'react-router';
import Axios from 'axios';
import Quantity from '../Quantity';
import IProduct from '../../interfaces/IProduct';
import ICartProduct from '../../interfaces/ICartProduct';

import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../Store';
import { AddToCart, RemoveFromCart } from '../../actions/CartActions';

interface IProductRouteParams {
    id: string;
}

const Product: React.FC = () => {
    const { id } = useParams<IProductRouteParams>();
    const [imageBox, setImageBox] = useState<string | null>(null);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [added, setAdded] = useState<boolean>(false);

    const baseURL: string = window.location.origin.toString();

    useEffect(() => { // get product details
        Axios.get(baseURL + '/api/product/' + id)
            .then(res => {
                setProduct(res.data.product[0]);
            })
            .catch(err => console.log(err))
    }, [baseURL, id]);

    const cartState = useSelector((state: RootStore) => state.cart);

    useEffect(() => { // checking if the product is already added
        const cart = cartState.products || [];
        const cartSize = cart.length;

        for (let i = 0; i < cartSize; i++) {
            if (cart[i].id === id) {
                setAdded(true);
                break;
            }
        }
    }, [product])

    const dispatch = useDispatch();

    const removeFromCart = () => {
        dispatch(RemoveFromCart(id))
        setAdded(false);
    }

    const addToCart = () => {
        if (added) return;

        let CART = cartState.products;
        if (!CART) CART = [];

        if (product) {
            const newCartItem: ICartProduct = {
                id: product?.code,
                name: product?.name,
                quantity,
                price: product?.price,
                stock: product?.stock,
                image: product?.image
            };

            dispatch(AddToCart(newCartItem));
        }

        setAdded(true);
    }

    return (
        <Container>
            {product &&
                <Row>
                    <Col className="col-2">
                        {
                            (product.images.length !== 0) &&
                            product.images.map((pic: string, i: number) => (
                                <img key={i} className="my-2 img-fluid product__image"
                                    src={baseURL + '/images/' + pic}
                                    onClick={() => setImageBox(pic)}
                                    alt={`product ${i}`} />
                            ))
                        }
                    </Col>

                    <Col className="col-5 d-flex justify-content-center">
                        <Card style={{ height: 'fit-content' }}>
                            <Card.Img variant="top" src={baseURL + '/images/' + (imageBox ? imageBox : product.image)} />
                        </Card>
                    </Col>

                    <Col className="col-5">
                        <Card>
                            <Card.Body className="text-left">

                                <div className="card-title h3">{product?.name}</div>

                                <table className="product__table" style={{ width: '100%' }}>
                                    <tbody>
                                        {product.stock &&
                                            <tr>
                                                <th>Available: </th>
                                                <td>{product.stock > 0 ? 'Yes' : 'No'}</td>
                                            </tr>
                                        }

                                        {product.weight &&
                                            <tr>
                                                <th>Weight: </th>
                                                <td>{product.weight}</td>
                                            </tr>
                                        }

                                        {product.calories &&
                                            <tr>
                                                <th>Calories: </th>
                                                <td>{product.calories}</td>
                                            </tr>
                                        }

                                        {product.ingredients &&
                                            <tr>
                                                <th>Ingredients: </th>
                                                <td>
                                                    <ul>
                                                        {product.ingredients.map((ingredient, idx) => (
                                                            <li key={idx}>{ingredient}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            </tr>
                                        }

                                        <tr>
                                            <th>Description: </th>
                                            <td>
                                                <Card.Text>
                                                    {product?.description}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Quantity: </th>
                                            <td>
                                                <Quantity stock={product.stock} quantity={quantity} setQuantity={setQuantity} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                                <div className="d-flex justify-content-between align-items-center mt-3">

                                    <div style={{ color: '#006800', fontSize: '2rem' }}>
                                        Rs {product?.price}
                                    </div>

                                    <Button size={'sm'} variant="primary"
                                        style={{
                                            borderRadius: "30px",
                                            padding: "5px 10px",
                                        }}
                                        onClick={added ? removeFromCart : addToCart}
                                    >
                                        <AiOutlineShoppingCart />
                                        <span style={{
                                            fontSize: "11px",
                                            verticalAlign: "text-bottom"
                                        }}> {added ? "ADDED TO CART" : "ADD TO CART"} </span>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            }
        </Container >
    )
}


export default Product
