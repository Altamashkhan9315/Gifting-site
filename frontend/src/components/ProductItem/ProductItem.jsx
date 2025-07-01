import React, { useContext, useState } from 'react'
import './ProductItem.css'
import { assets } from "../../assets/assets";
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom'
const ProductItem = ({id,name,price,description,image}) => {

const {Cartitem , addtoCart, removefromCart,url} =useContext(StoreContext);
  const [show,setShow]=useState(false);

const navigate=useNavigate();
  return (
    <div  className="Product-item  ">
        <div className="Product-item-image-container">
          
              <img onClick={() => navigate(`/show/${id}`)} className="Product-item-image" src={url+"/images/"+image} alt="" />
              {!Cartitem[id]
              ?<img className='add' onClick={()=> addtoCart(id)} src={assets.add_icon_white} alt=''/>
              :<div className='product-item-counter'>
                    <img onClick={()=>removefromCart(id)} src={assets.remove_icon_red} alt=''/>
                    <p>{Cartitem[id]}</p>
                    <img onClick={()=> addtoCart(id)} src={assets.add_icon_green} alt=''/>
                </div>

              }
        </div>
        <div onClick={() => navigate(`/show/${id}`)} className="Product-item-info">
            <div onClick={() => navigate(`/show/${id}`)} className="Product-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            {/* <p className="Product-item-description">{description}</p> */}
            <p className="Product-item-price">&#x20B9;{price}</p>
        </div>
    </div>
  )
}

export default ProductItem
