import React, { useContext, useState,useEffect } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets/'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import { FaSearch, FaShoppingCart, FaUser, FaShoppingBag, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'



function Navbar({setshowLogin}) {

  const [menu,setmenu] = useState('home')
  const {getTotalcartAmount,token,setToken, Product_list,url}=useContext(StoreContext)
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate= useNavigate();
  const logout=()=>{
     localStorage.removeItem("token");
     setToken("");
     navigate("/");
  }
  const handleSearch = (e) => {
  const query = e.target.value;
  setSearchQuery(query);

  if (query.trim() === '') {
    setFilteredResults([]);
    return;
  }

  const filtered = Product_list.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredResults(filtered);
  };
  const [showMobileMenu, setShowMobileMenu] = useState(false);



  return (
    <div className='navbar'>
      <Link to='/'><h1 className='logo1'>JEWEL .</h1></Link>
      <FaBars className='hamburger-icon' onClick={() => setShowMobileMenu(true)} />
      <ul className={`navbar-menu${showMobileMenu ? ' show' : ''}`}>
        <FaTimes className='close-icon' onClick={() => setShowMobileMenu(false)} />
        <Link to='/' onClick={()=>{setmenu("home"); setShowMobileMenu(false);}} className={menu==='home'?'active':" "}>home</Link>
        <a href='#app-download' onClick={()=>{setmenu("mobile-app"); setShowMobileMenu(false);}} className={menu==='mobile-app'?'active':" "}>mobile-app</a>
        <a href='#Explore_menu' onClick={()=>{setmenu("menu"); setShowMobileMenu(false);}} className={menu==='menu'?'active':" "}>menu</a>
        <a href='#footer' onClick={()=>{setmenu("contact us"); setShowMobileMenu(false);}} className={menu==='contact us'?'active':" "}>contact us</a>
        {!token && <button className='mobile-signin-btn' onClick={()=>{setshowLogin(true); setShowMobileMenu(false);}}>sign in</button>}
      </ul>
      <div className="navbar-right">
        <FaSearch className='icon' onClick={() => setShowSearch(!showSearch)} />

      {showSearch && (
        <div className="search-dropdown">
      <input
      type="text"
      value={searchQuery}
      onChange={handleSearch}
      placeholder="Search products..."
      />
      {filteredResults.length > 0 && (
      <ul className="search-results">
        {filteredResults.map(product => (
          <li key={product._id} onClick={() => {
            navigate(`/show/${product._id}`);
            setShowSearch(false); // close search on select
          }}>
            <img src={`${url}/images/${product.image}`} alt={product.name} />
            <span>{product.name}</span>
          </li>
             ))}
            </ul>
          )}
        </div>
        )}

        <div className="navbar-search-icon">
          <Link to='/cart'><FaShoppingCart className='icon'/></Link>
          <div className={getTotalcartAmount()===0?"":"dot"}></div>
        </div>
        {!token && <button className='desktop-signin-btn' onClick={()=>setshowLogin(true)}>sign in</button>}
        {token && <div className='navbar-profile'>
            <FaUser className='icon' />
            <ul className='nav-profile-dropdown'>
                <li onClick={()=>(navigate('/myorders'))}><FaShoppingBag className='icon' /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><FaSignOutAlt className='icon' /><p>Logout</p></li>
            </ul>
          </div>}
        
      </div>
      </div>
  )
}

export default Navbar
