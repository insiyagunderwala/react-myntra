import React from "react";
import '../index.css';

const Display = ({e, cart}) => {
// console.log("......",e);
    function addedToCart(){
        cart(e);
    }

    return(
            <div className='product' style={{marginLeft:"50px", marginRight:"50px"}}>
                <div className='product-img'>
                    <img src={e.img} style={{width: "150px", height: "150px"}} alt="product-img"/>
                </div>
                <div className='product-text title'>{e.title}</div>
                <div className='product-text description' style={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100ch"}}>{e.description}</div>
                <div className='product-text price'>$ {e.price}</div>
                <div className='btn btn-danger btn-md cart-btn' onClick = {addedToCart}>ADD TO CART</div>
            </div>            
    );
}

export default Display;