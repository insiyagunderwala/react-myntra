import React from 'react';
import {Icon} from 'react-icons-kit';
import {plus} from 'react-icons-kit/feather/plus';
import {minus} from 'react-icons-kit/feather/minus';
import {auth, db} from "../firebase";

function SingleCartProduct ({cartProduct, increase, decrease}) {

    function increaseProduct(){
        increase(cartProduct);
    }
    function decreaseProduct(){
        decrease(cartProduct);
    }
    function deleteCartProduct(){
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart ' + user.uid).doc(cartProduct.ID).delete();
            }
        })
    }
    return (
        <div className='product' style={{backgroundColor: "aquamarine"}}>
            <div className='product-img'>
                <img src={cartProduct.img} alt="product-img"/>
            </div>
            <div className='product-text title' style={{ display: "inline-block", width: "200px", whiteSpace: "nowrap",overflow: "hidden", textOverflow:"ellipsis"
             }}>{cartProduct.title}</div>
            <div className='product-text description' style={{ display: "inline-block", width: "200px", whiteSpace: "nowrap",overflow: "hidden", textOverflow:"ellipsis"
            }}>{cartProduct.description}</div>
            <div className='product-text price'>$ {cartProduct.price}</div>
            <span>Quantity</span>
            <div className='product-text quantity-box'>
                <div className='action-btns minus' onClick={decreaseProduct} >
                    <Icon icon={minus} size={20}/>
                </div>                
                <div>{cartProduct.quantity}</div>               
                <div className='action-btns plus' onClick={increaseProduct} >
                    <Icon icon={plus} size={20}/>
                </div>
            </div>
            <div className='product-text cart-price'>$ {cartProduct.TotalPrice}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={deleteCartProduct}>DELETE</div>            
        </div>
    )
}
export default SingleCartProduct;

    