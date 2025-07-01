import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'


const ExploreMenu = ({Category,setCategory}) => {
  return (
    <div className='Explore_menu' id='Explore_menu'>
        <h1>Celebrate with Us</h1>
        <p>Explore our curated collection of enchanting gifts, perfect for capturing the essence of their special day. Whether you're a guest or the happy couple, find the perfect expression of love and congratulations at The Quest Studio</p>
        <div className="Explore_menu_list">
            {menu_list.map((item,index)=>{
               return(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="Explore_menu_list_item">
                    <img src={item.menu_image} className={Category===item.menu_name?'active':""} alt='not found'/>
                    <p className='menu_text'>{item.menu_name}</p>
                </div>
               )
            })}
        </div>
      <hr/>
    </div>
  )
}

export default ExploreMenu
