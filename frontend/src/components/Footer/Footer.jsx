import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <h1 className='logo'>JEWEL .</h1>
            <p>Welcome to Jewel – Where Every Gift Tells a Story
At Jewel, we believe gifting is more than just exchanging items — it’s about creating memories. Explore our curated collection of flowers, cakes, candles, hampers, and personalized gifts for every occasion. Whether it's a birthday, anniversary, or a simple gesture of love, Jewel has the perfect gift to make your moments shine.</p>
            <div className='social-icon'>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-9315117694</li>
            <li>altamashkhan9315@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024 © Jewel.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
