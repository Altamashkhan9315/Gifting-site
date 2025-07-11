import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {

 
 const [list,setList] = useState([]);

 const fetchlist= async()=>{
  const response = await axios.get(`${url}/api/Product/list`);
  if(response.data.success){
    setList(response.data.data);
  }else{
    toast.error("error");
  }
 }

 const removeFood=async (FoodId)=>{
     const response = await axios.post(`${url}/api/Product/remove`,{_id:FoodId});
     await fetchlist();
     if(response.data.success){
      toast.success(response.data.message);
     }else{
      toast.error(response.data.message);
     }
 }

 useEffect(()=>{
   fetchlist();
 },[])

  return (
    <div className='list add flex-col'>
      <p>All Product List</p>
      <div className="list-table">
        <div className="list-table-format title">
           <b>Image</b>
           <b>Name</b>
           <b>Category</b>
           <b>Price</b>
           <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>&#8377;{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>


            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
