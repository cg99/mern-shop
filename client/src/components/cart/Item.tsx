import Quantity from '../Quantity';
import { IoMdClose } from 'react-icons/io'
import React, { useEffect, useState } from 'react';
import ICartProduct from '../../interfaces/ICartProduct';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveFromCart, SetCart } from '../../actions/CartActions';

const Item = (props: { product: ICartProduct, cart: Array<ICartProduct> }) => {
    let id: string, name, price, stock, q, image;
    if (props.product) {
        id = props.product.id;
        q = props.product.quantity;
        name = props.product.name;
        price = props.product.price;
        stock = props.product.stock;
        image = props.product.image;
    }
    const [quantity, setQuantity] = useState<number | undefined>(q);
    const dispatch = useDispatch();

    const removeFromCart = () => {
        dispatch(RemoveFromCart(id))
    }

    useEffect(() => {
        const currentCart: Array<ICartProduct> = props.cart.map((item: ICartProduct) => {
            if (id === item?.id) {
                if (item) item.quantity = quantity;
            }
            return item;
        })

        dispatch(SetCart(currentCart))
    }, [quantity])

    const baseURL: string = window.location.origin.toString();

    return (
        <tr>
            <td>
                <img className="mr-3" width="60" src={baseURL + '/images/' + image} alt="" />
                <span>{name}</span>
            </td>
            <td>
                <Quantity stock={stock} quantity={quantity} setQuantity={setQuantity} />
            </td>
            <td>Rs {price}</td>
            <td><IoMdClose className="product__item--cancel" onClick={removeFromCart} /></td>
        </tr>
    )
}


export default Item
