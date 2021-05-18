import Quantity from '../Quantity';
import { IoMdClose } from 'react-icons/io'
import React, { useEffect, useState } from 'react';
import ICartProduct from '../../interfaces/ICartProduct';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveFromCart, SetCart } from '../../actions/CartActions';

const Item = (props: { product: ICartProduct, cart: Array<ICartProduct> }) => {
    let id: string, name, price, stock, q;
    if (props.product) {
        id = props.product.id;
        q = props.product.quantity;
        name = props.product.name
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

    return (
        <tr>
            <td>
                <img className="mr-3" width="60" src="https://instagram.fktm6-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/108165045_730418197690944_800490400612758439_n.jpg?_nc_ht=instagram.fktm6-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=OQEYYIod7K4AX8TdbFj&tp=1&oh=03facf7cf006cf7d5e1457c64925a78b&oe=60053045" alt="" />
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
