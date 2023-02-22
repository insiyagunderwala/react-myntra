import React from "react";
import SingleCartProduct from "./SingleCartProduct";

 const CartProducts = ({cartProducts, increase, decrease}) => {
    return cartProducts.map((cartProduct)=>(
        <SingleCartProduct key={cartProduct.ID} cartProduct={cartProduct} increase = {increase} decrease = {decrease}/>
    ))
}



export default CartProducts;