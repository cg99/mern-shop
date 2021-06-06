import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import '../../sass/products.scss';

import { useDispatch, useSelector } from 'react-redux';
import { GetProducts } from '../../actions/ProductActions';
import { RootStore } from '../../Store';
import ProductCard from './ProductCard';


const AllProducts: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetProducts());
    }, [dispatch])

    const productsState = useSelector((state: RootStore) => state.products);
    const cartState = useSelector((state: RootStore) => state.cart);

    return (
        <Container>
            <Row>

                {productsState.products && productsState.products.map((p, i) => (
                    <ProductCard key={p.code} product={p} />
                ))}
            </Row>

        </Container>
    )
}

export default AllProducts