import React from 'react';



const Product = (props) => {
    return (
        <div className="product">
            <p onClick={props.link}>Buy the {props.name} with price {props.price}$: {props.qty} pcs</p>
        </div>
    )
}



export default Product;