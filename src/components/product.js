import React from "react";
import Display from "./display";

function Product({products, cart}) {
  //  console.log(".......pro",products);
  return products.map((e) => (
    <Display key = {e.ID} e = {e} cart = {cart}/>
  ))
}

export default Product;
