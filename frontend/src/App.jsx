import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'; 
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import Myorders from './pages/Myorders/Myorders';
import Product from './components/Products/Product';

function App() {
  const [showLogin, setshowLogin] = useState(false);

  return (
    <div>
      {showLogin?<LoginPopup setshowLogin={setshowLogin}/>:<></>}
      <div className="app-content">
        <Navbar setshowLogin={setshowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />}/>
          <Route path='/myorders' element={<Myorders/>}/>
          <Route path="/show/:id" element={<Product />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
