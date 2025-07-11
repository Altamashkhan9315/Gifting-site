import React from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useEffect } from 'react'
import axios from 'axios'
const Verify = () => {
  const [searchParams,setSearchParams] = useSearchParams()
  const success=searchParams.get("success")
  const orderId=searchParams.get("orderId")
  const {url} =useContext(StoreContext);
  const navigate = useNavigate()
  
  const verifyPayment = async() => {
    const newOrderId = sessionStorage.getItem("newOrderId"); 
    const response= await axios.post(url+"/api/order/verify",{success,newOrderId,});
    if(response.data.success){
       navigate("/myorders");
    }else{
       navigate("/");
    }
  }
  useEffect(()=>{
    verifyPayment();
  },[])

  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}   

export default Verify
