
// import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import Cart from "./components/cart";
import CartSummary from "./components/CartSummary";
// import { ProductsContextProvider } from "./context/ProductsContext";

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/CartSummary" element={<CartSummary />} /> 
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
