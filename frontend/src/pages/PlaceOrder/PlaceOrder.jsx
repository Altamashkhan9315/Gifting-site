import dotenv from "dotenv";
import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
const PlaceOrder = () => {

  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

  const {Cartitem,removefromCart,deletefromCart,Product_list,getTotalcartAmount,url,token}=useContext(StoreContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""

  })
  
  const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
  }

  useEffect(()=>{
    console.log(data);
    
  },[data])

  const placeOrder=async (event) => {
    event.preventDefault();

    const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
    alert("Failed to load Razorpay SDK. Are you online?");
    return;
      }
    let orderItems=[];
    Product_list.map((item)=>{
        if(Cartitem[item._id]>0){
          let itemInfo=item;
          itemInfo["quantity"]=Cartitem[item._id]
          orderItems.push(itemInfo);
        }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalcartAmount()+2,
    }
       try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        // Assume you're using Razorpay now:
        const { orderId, amount, currency,newOrderId } = response.data;
         
        sessionStorage.setItem("newOrderId", newOrderId);
        const options = {
          key: import.meta.env.VITE_APP_RAZORPAY_API_KEY, // use env var
          amount,
          currency,
          name: "Your Store",
          description: "Order Payment",
          order_id: orderId,
          handler: function (response) {
            // Handle success (verify on backend)
            window.location.href = `http://localhost:5173/verify?success=true&orderId=${response.razorpay_order_id}`;
          },
          prefill: {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            contact: data.phone,
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } else {
        alert("Payment initiation failed.");
      }
    } catch (err) {
      console.error("Error placing order", err);
      alert("An error occurred");
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if(getTotalcartAmount()===0){
      navigate('/cart')
    }
    
  },[token])

  return (
    <div>
      <form action="" className="place-order" onSubmit={placeOrder}>
        <div className="place-order-left">
         <p className="title">Delivery Information</p>
         <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name'/>
         </div>
         <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
         <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
         <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
         </div>
         <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
         </div>
         <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone'/>
        </div>
        <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
             <p>Subtotal</p>
             <p>&#x20B9;{getTotalcartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#x20B9;{getTotalcartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>&#x20B9;{getTotalcartAmount()+getTotalcartAmount()===0?0:getTotalcartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
