import React from "react";
import { Link } from "react-router-dom";
import logo from './logo.png';
import {Icon} from 'react-icons-kit';
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart';
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

function Navbar({user, TotalQuantity, totalProducts}) {

  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    })
  }

  return (
    <div className="navbox" style={{backgroundColor: "cornsilk"}}>
        <div className="leftside">
            <img src = {logo} alt= " logo image" />
        </div>
        <div className="rightside">
        {!user && 
          <>
            <Link style={{fontSize: "20px"}} to='/signup' className="navlinks">SIGN UP</Link>
            <Link style={{fontSize: "20px"}} to='/login' className="navlinks">LOGIN</Link>
          </>}

          {user&&<>
            <div><Link style={{ padding:"10px", color:"black", display:"flex"}} className="navlink" to="/">{user}</Link></div>
            <div className="cart-menu-btn">
              <Link className="navlink" to="/cart">
                <Icon style={{margin:"auto", padding:"15px", color:"black", display:"flex"}} icon={shoppingCart} size={20} />
              </Link>
              <span className="cart-indicator" style={{marginRight:"15px", marginTop:"13px"}}>{TotalQuantity}{totalProducts}</span>
            </div>
            <div className="btn btn-danger" style={{ display: "flex", marginLeft:"15px"}}
            onClick={handleLogout}>LOGOUT</div>
          </>}
            
        </div>   
    </div>
    
    
  );
}

export default Navbar;

// import React from 'react'
// import {Link} from 'react-router-dom'
// import logo from './logo.png'
// import {Icon} from 'react-icons-kit'
// import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
// import {auth} from '../firebase'
// import { useNavigate } from 'react-router-dom';

//  const Navbar = ({user}) => {

//   const navigate = useNavigate();

//     const handleLogout=()=>{
//         auth.signOut().then(()=>{
//             navigate('/login');
//         })
//     }

//     return (
//         <div className='navbox' style={{backgroundColor: "cornsilk"}}>
//             <div className='leftside'>
//                 <div className='logo'>
//                     <img src={logo} alt="logo"/>
//                 </div>
//             </div>
//             <div className='rightside'>

//                 {!user&&<>
//                     <div><Link className='navlink' to="signup">SIGN UP</Link></div>
//                     <div><Link className='navlink' to="login">LOGIN</Link></div>
//                 </>} 

//                 {user&&<>
//                     <div><Link className='navlink' to="/">{user}</Link></div>
//                     <div className='cart-menu-btn'>
//                         <Link className='navlink' to="/cart">
//                             <Icon icon={shoppingCart} size={20}/>
//                         </Link>
//                         {/* <span className='cart-indicator'>{totalQty}</span> */}
//                     </div>
//                     <div className='btn btn-danger btn-md'
//                     onClick={handleLogout}>LOGOUT</div>
//                 </>}                     
                                
//             </div>
//         </div>

//     )
// }
// export default Navbar;