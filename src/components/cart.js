import {auth, db} from "../firebase";
import React, {useState, useEffect} from "react";
import Navbar from "./navbar";
import CartProducts from "./CartProducts";
import { useNavigate } from 'react-router-dom';
function Cart(){

    function getCurrentUser(){
        const [user, setUser] = useState(null);
        useEffect(() => {
          auth.onAuthStateChanged((user) => {
            if(user){
              db.collection('Users').doc(user.uid).get().then((snapshot) => {
                setUser(snapshot.data().FullName);
              })
            } else {
              setUser(null);
            }
          })
        }, [])
        return user;
      }
    
      const user = getCurrentUser();
      const [cartProducts, setCartProducts] = useState([]);

      useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])
    // console.log(cartProducts);
    
    function increase(cartProduct){
        // console.log(cartProduct);
        let Product=cartProduct;
        Product.quantity=Product.quantity+1;
        Product.TotalPrice=Product.quantity*Product.price;
        // updating in database
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product);
               
            }
        })
    }

    function decrease(cartProduct){
        // console.log(cartProduct);
        let Product=cartProduct;
        if(Product.quantity > 1){
            Product.quantity=Product.quantity - 1;
            Product.TotalPrice=Product.quantity*Product.price;
            // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product);
                   
                }
            })
        }    
    }

    function totalQuantity(){
        let qty = 0;
        cartProducts.map((e) => {
            qty = qty + e.quantity;
        })
        // console.log("...................", qty)
        return qty;
    }
    var TotalQuantity = totalQuantity();

    function totalCartPrice(){
        let price = 0;
        cartProducts.map((e) => {
            price = price + e.TotalPrice;
        })
        console.log("...................", price)
        return price;
    }
    var TotalCartPrice = totalCartPrice();

    let navigate = useNavigate();
    const routeToProducts = () =>{ 
        navigate('/home');
      }
    
    const routeToSummary = () =>{ 
    navigate('/CartSummary');
    }
    return(
    <>
    <Navbar user={user} TotalQuantity={TotalQuantity} />           
    <br></br>
    {cartProducts.length > 0 && (
                <div>
                    <h1 className='text-center'>My Cart</h1>
                    <hr style={{color:"red", width:"95%", margin:"auto"}}></hr>
                    <div className="row">
                        <div className="col-md-12">
                            <div className='products-box'>
                                <CartProducts cartProducts={cartProducts} increase = {increase} decrease = {decrease}/>                             
                            </div>
                        </div>
                    </div>
                    <div className="summary-box" style = {{border:"none", width:"100%"}}>
                        <hr style={{color:"red", width:"100%", marginTop:"0px"}}></hr>
                        <div>
                            <button className="btn btn-primary" style = {{width:"250px", marginLeft:"32%", marginTop:"15px"}}>Total Cart Price: ${TotalCartPrice}</button>
                            <button className="btn btn-success" onClick={routeToSummary} style={{width:"250px", marginRight:"32%", marginTop:"15px"}}>Cash on Delivery</button>
                        </div>
                        <br></br>
                    </div>
                </div>
    )}
    {cartProducts.length < 1 && (
        <div>
        <div className="card" style={{border:"none"}}> 
            <h4 className="card-title" style={{textAlign: "center", fontSize: "large"}}>My Cart</h4>
        </div> 
        <div className="center" style={{marginTop:"40px", textAlign:"center"}}>
            <img className="center" src="https://th.bing.com/th/id/OIP.NKslwJXiWTyG4aVb_fcL3QHaE8?w=286&h=191&c=7&r=0&o=5&pid=1.7" alt=""/>
            <br></br>
            <h4 style={{fontWeight: "400", fontSize: "large"}}>Cart is Empty!</h4>
            <h5 style={{fontWeight: "400", fontSize: "large"}}>Let's fill it now!!!!</h5>
            <br></br>
            <button className="btn btn-primary" onClick={routeToProducts}>Shop Now</button>
        </div>
        </div>    ) } 
    </>
    
    );
}

export default Cart;
