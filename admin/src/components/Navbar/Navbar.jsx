import React, { useState, useRef } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  const [profileImage, setProfileImage] = useState(assets.profile_image);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='navbar'>
      <h1 className='logo1'>JEWEL .</h1>
      <div className="profile-container">
        <img 
          className='profile' 
          src={profileImage} 
          alt="Profile" 
          onClick={handleImageClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

export default Navbar
