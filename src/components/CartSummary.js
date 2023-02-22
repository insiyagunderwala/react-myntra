import React from "react";
import { useNavigate } from 'react-router-dom';
import CartProducts from "./CartProducts";


function CartSummary(){
    const navigate = useNavigate();
    function submit(){
        alert("Thank you for shopping with us :) Please visit again soon");
        navigate('/login');
        <CartProducts />
    }
    return (
    <div style={{width: "70%", height:"600px", border:"2px solid black", margin: "100px auto", backgroundColor:"aquamarine", borderRadius:"15px"}}>
        <div className='shade-area'>
            <h4 style={{textAlign:"center", marginTop:"25px", marginBottom:"25px"}}>Please fill out this form in order to complete your purchase</h4>
                <div className='modal-container'>
                    <form className='form-group' style={{margin:"40px"}} > 
                        <div>
                            <label style={{width:"200px", marginBottom:"10px"}}>Enter your name: </label>
                            <input style={{width:"600px"}} type="text" className='form-control' placeholder='Full name' required/>
                        </div>
                        <br></br>
                        <div>
                            <label style={{width:"350px", marginBottom:"10px"}}>Enter your mobile number:  </label>
                            <input style={{width:"600px"}} type="number" className='form-control' placeholder='Cell No' required />                   
                        </div>
                        <br></br>
                        <div>
                            <label style={{width:"350px", marginBottom:"10px"}}>Enter your address:  </label>
                            <input style={{width:"600px"}} type="text" className='form-control' placeholder='Address' required />                   
                        </div>
                        <br></br>
                        <div>
                            <label style={{width:"350px", marginBottom:"10px"}}>Enter your email:  </label>
                            <input style={{width:"600px"}} type="email" className='form-control' placeholder='E-mail' required />                   
                        </div>
                        <br></br>
                        <button type='submit' className='btn btn-success btn-md' onClick={submit}>Submit</button>
                    </form>
                </div>
        </div>
    </div>
    );

}

export default CartSummary;