import React, { useState } from 'react'
import './Add.css'
// import '../../index.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {


  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"For Her"

  });

  const onChangehandler = (event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
  }


  const onSubmitHandler = async(event)=>{
      event.preventDefault();
      const formData = new FormData();
      formData.append("name",data.name);
      formData.append("description",data.description);
      formData.append("price",Number(data.price));
      formData.append("category",data.category);
      formData.append("image",image);
      const response = await axios.post(`${url}/api/Product/add`,formData);
      if(response.data.success){
        setData({
          description:"",
          name:"",
          category:"For Her",
          price:"",
  })
        setImage(false);
        toast.success(response.data.message);
      }else{
         toast.error(response.data.message);
      }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
          </div>
          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangehandler} value={data.name} type="text" name='name' placeholder='Type here'/>
          </div>
          <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangehandler} value={data.description} name="description" rows="6" placeholder='write content here' required></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select onChange={onChangehandler} name="category" >
                <option value="For Her">For Her</option>
                <option value="For Him">For Him</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Evening Gaze">Evening Gaze</option>
                <option value="Flower">Flower</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Chocolate">Chocolate</option>
              </select>
            </div>
            <div className="add-price flex-box">
               <p>Product price</p>
               <input onChange={onChangehandler} value={data.price} type="number" name='price' placeholder='Enter price' />
            </div>
          </div>
          <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
