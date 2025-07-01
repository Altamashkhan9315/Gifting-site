import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import { StoreContext } from '../../Context/StoreContext';
import ProductItem from '../ProductItem/ProductItem';
function ProductDisplay({Category}) {
  const {Product_list} =useContext(StoreContext);
  return (
    <div className='Product-Display' id='Product-Display'>
      <h2>Products</h2>
      <div className="Product_item_list">
        {Product_list.map((item,index)=>{
          if(Category==='All'|| Category===item.category){
            return <ProductItem key={index} id={item._id} name={item.name} price={item.price} description={item.description}  image={item.image}/>
          }
          
          })}
      </div>
    </div>
  )
}

export default ProductDisplay
