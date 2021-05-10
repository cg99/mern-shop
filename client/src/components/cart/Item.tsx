import Quantity from '../Quantity';
import { IoMdClose } from 'react-icons/io'
import React, { useEffect, useState } from 'react';
import useToken from '../../helpers/useToken';
import ICartProduct from '../../interfaces/ICartProduct';
import { Redirect } from 'react-router-dom';

const Item = (props: any) => {
    const p = props.product;
    const [quantity, setQuantity] = useState<number>(p.quantity);
    const { token } = useToken()

    useEffect(() => {
        if (token) {
            const localCart = localStorage.getItem(token); // user's cart
            if (localCart) {
                props.setCart(JSON.parse(localCart));
            }
        }

    }, [token])

    const saveCart = (cartObj: {}) => {
        const stringified = JSON.stringify(cartObj);

        if (!token) {
            <Redirect to="/signin" />
            return;
        }

        localStorage.setItem(token, stringified);
    }

    const removeFromCart = () => {
        const CART = props.cart.filter((cartItem: ICartProduct) => cartItem.id !== p.id);
        saveCart(CART);
    }

    return (
        <tr>
            <td>
                <img className="mr-3" width="60" src="https://instagram.fktm6-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/108165045_730418197690944_800490400612758439_n.jpg?_nc_ht=instagram.fktm6-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=OQEYYIod7K4AX8TdbFj&tp=1&oh=03facf7cf006cf7d5e1457c64925a78b&oe=60053045" alt="" />
                <span>{p.name}</span>
            </td>
            <td>
                <Quantity stock={p.stock} quantity={quantity} setQuantity={setQuantity} />
            </td>
            <td>Rs {p.price}</td>
            <td><IoMdClose className="product__item--cancel" onClick={removeFromCart} /></td>
        </tr>
    )
}


export default Item
