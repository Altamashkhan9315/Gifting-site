import React from 'react'
import './Product.css'
import { useState } from 'react'
import axios from 'axios'
import { assets } from "../../assets/assets";
import { StoreContext } from '../../Context/StoreContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { Cartitem, addtoCart, removefromCart, url } = useContext(StoreContext);
  const { id } = useParams();

  const show = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/product/show?id=${id}`);
      setProduct(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load product. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
 const navigate=useNavigate();
  useEffect(() => {
    show();
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={show}>Retry</button>
      </div>
    );
  }
 

  return (
    <div className="product-container">
      {product ? (
        <div className='container'>
          <div className='container-left'>
            <img src={url + "/images/" + product.image} alt={product.name} className="product-image" />
          </div>
          <div className='container-right'>
            <h1 className="product-name">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="product-rating">
              <img src={assets.rating_starts} alt="Rating" />
              <span>4.5 out of 5</span>
            </div>
            <p className="product-price">&#x20B9;{product.price}</p>
            {!Cartitem[id]
              ? <button className='add-to-cart-button' onClick={() => addtoCart(id)}>Add to Cart</button>
              : <div className='item-counter'>
                <img onClick={() => removefromCart(id)} src={assets.remove_icon_red} alt='Remove' />
                <p>{Cartitem[id]}</p>
                <img onClick={() => addtoCart(id)} src={assets.add_icon_green} alt='Add' />
              </div>
            }
            <button onClick={()=> navigate('/order')} className="buy-now-button">Buy Now</button>
          </div>
        </div>
      ) : (
        <p>No product found.</p>
      )}
    </div>
  )
}

export default Product
