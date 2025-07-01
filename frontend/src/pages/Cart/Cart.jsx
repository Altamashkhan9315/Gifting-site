import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
const cart = () => {

  const {Cartitem,removefromCart,deletefromCart,Product_list,getTotalcartAmount,url}=useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <div className='cart'>
       <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
       <hr />
       <br />
        {Product_list.map((item,index)=>{
          if(Cartitem[item._id]>0){
            return(
              <div key={item._id}>
              <div className='cart-items-title cart-items-item'>
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>&#x20B9;{item.price}</p>
                <p>{Cartitem[item._id]}</p>
                <p>&#x20B9;{item.price*Cartitem[item._id]}</p>
                <p className='cross' onClick={()=>removefromCart(item._id)}>x</p>
              </div>
              <hr />
              </div>
            )
          }
        })}
       </div>
       <div className="cart-bottom">
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
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>if you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
                <input type="text" placeholder='promo code'/>
                <button>Submit</button>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default cart
