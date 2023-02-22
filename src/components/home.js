import React, {useState, useEffect} from "react";
import Navbar from "./navbar";
import Product from "./product";
import './home.css';
import {auth, db} from "../firebase";
import { useNavigate } from 'react-router-dom';


function Home(props) {
  const navigate = useNavigate();
  function getUid(){
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if(user){
          setUid(user.uid);
        }
      })
    },[])
    return uid;
  }
  var UID = getUid();

  function getCurrentUser(){
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if(user){
          db.collection('Users').doc(user.uid).get().then((e) => {
            setUser(e.data().FullName);
            //  UID= user.uid
          })
        } else {
          setUser(null);
        }
      })
    }, [])
    return user;
  }

  const user = getCurrentUser();
  // console.log(user);

  const [products, setProducts]= useState([]);
  const getProducts = async () => {
    const products = await db.collection('Products').get();
    const productsArray = [];
    for (let e of products.docs){
      let data = e.data();
      data.ID = e.id;
      productsArray.push({
        ...data
      });
      if(productsArray.length === products.docs.length){
        setProducts(productsArray);
      }
    }
  }

  useEffect(() => {
    getProducts();
  },[])

  const [totalProducts, setTotalProducts]=useState(0);
    // getting cart products   
    useEffect(()=>{        
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })       
    },[])  

  // let Product;
  function cart(product){
    var Product;
    if(UID !== null){
       Product = product;
      // console.log("Product....",Product);
      // console.log("product....",product);
      Product['quantity']=1;
      Product['TotalPrice']=Product.quantity*Product.price;
      db.collection('Cart ' + UID).doc(product.ID).set(Product).then(()=>{
        console.log('successfully added to cart');
    }) 
    } else{
      navigate('/login');
    }
    
  }

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />           
      <br></br>
      <div className="row">
        <div className="col-md-12">
          <div className='products-box'>
                <Product products={products} cart = {cart} />
          </div> 
        </div> 
      </div>    
    </>
    
  );
}

export default Home;
