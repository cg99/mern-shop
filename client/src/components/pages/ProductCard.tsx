import React, { useState, useEffect } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../../sass/products.scss';

import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from '../../actions/CartActions';
import { RootStore } from '../../Store';
import ICartProduct from '../../interfaces/ICartProduct';
import IProduct from '../../interfaces/IProduct';


const ProductCard = (props: { product: IProduct }) => {

    const cartState = useSelector((state: RootStore) => state.cart);

    const dispatch = useDispatch();

    const { product } = props;

    const [added, setAdded] = useState<boolean>(false);

    useEffect(() => { // checking if the product is already added
        const cart = cartState.products || [];
        const cartSize = cart.length;

        for (let i = 0; i < cartSize; i++) {
            if (cart[i].id === product.code) {
                setAdded(true);
                break;
            }
        }
    }, [product])

    return (

        <Col className="d-flex justify-content-center" style={{ height: "max-content" }}>

            <Card style={{ width: '16rem' }}>
                <Link to={`/product/${product.code}`}>
                    <Card.Img variant="top" src={`${window.location.origin.toString()}/images/${product.image}`} />
                </Link>

                <Card.Body className="text-left">
                    <Link to={`/product/${product.code}`} className="text-dark">

                        <Card.Title>{product.name}</Card.Title>

                    </Link>

                    <Card.Text>
                        {product.description}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center">

                        <small>Rs {product.price}</small>

                        <Button className="btn__add-to-cart" size={'sm'} variant="danger"
                            style={{
                                borderRadius: "30px",
                                padding: "5px 10px",
                            }}
                            onClick={() => {
                                if (added) return;

                                let CART = cartState.products;
                                if (!CART) CART = [];

                                if (product) {
                                    const newCartItem: ICartProduct = {
                                        id: product?.code,
                                        name: product?.name,
                                        quantity: 1,
                                        price: product?.price,
                                        stock: product?.stock,
                                        image: product?.image
                                    };

                                    dispatch(AddToCart(newCartItem));
                                }

                                setAdded(true);
                            }}>
                            <AiOutlineShoppingCart />
                            <span style={{
                                fontSize: "11px",
                                verticalAlign: "text-bottom"
                            }}> {added ? 'ADDED TO CART' : 'ADD TO CART'} </span>
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard