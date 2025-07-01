import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {
  const[Category,setCategory]=useState("All");
  return (
    <div className='home'>
      <Header/>
      <ExploreMenu Category={Category} setCategory={setCategory}/>
      <ProductDisplay Category={Category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
