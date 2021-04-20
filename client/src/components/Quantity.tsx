import React, { useState } from 'react'
import { TiMinus, TiPlus } from 'react-icons/ti'

const Quantity = (props: any) => {

    return (
        <div>
            <TiMinus className="product__minus"
                onClick={() => { if (props.quantity > 1) props.setQuantity(props.quantity - 1) }}
            />
            <span className="product__quantity"> {props.quantity} </span>
            <TiPlus className="product__add"
                onClick={() => { if (props.quantity < props.stock) props.setQuantity(props.quantity + 1) }}
            />
        </div>
    )
}

export default Quantity
