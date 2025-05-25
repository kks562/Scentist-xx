import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/i5.jpg';
import logo from '../assets/lo.png';
import Text from './Test';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import './Home.css';

const Home = () => {
  const data = [
    { text1: "Scent Your Story", text2: "With Elegance" },
    { text1: "Unveil Your Essence", text2: "One Spritz at a Time." },
    { text1: "Where Fragrance", text2: "Meets Your Identity" },
  ];

  const [count, setCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data.length]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate('/perfumes', { state: { selectedCategory: category } });
  };

  const handleViewProducts = () => {
    navigate('/perfumes', selectedCategory ? { state: { selectedCategory } } : {});
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const gotoAbout = () => navigate('/about');
  const gotoContact = () => navigate('/contact');
  const gotologin = () => navigate('/');
  const gotocart = () => navigate('/cart');
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
        <div className="navbar">
          <div className="logo glow-logo">
            <img
              src={logo}
              alt="Scentist Logo"
              className="responsive-logo"
            />
          </div>

        <ul className={menuOpen ? 'open' : ''}>
          <li onClick={() => handleCategoryClick('Men')}>Mens</li>
          <li onClick={() => handleCategoryClick('Women')}>Womens</li>
          <li onClick={() => handleCategoryClick('Unisex')}>Unisex</li>
          <li onClick={gotoAbout}>About</li>
          <li onClick={gotoContact}>Contact</li>
        </ul>

        <div className="icon">
          <div className="icon-wrapper" onClick={gotocart}>
            <ShoppingCartIcon />
            <span className="tooltip">Cart</span>
          </div>
          <div className="icon-wrapper" onClick={gotologin}>
            <AccountCircleIcon />
            <span className="tooltip">Account</span>
          </div>
          <div className="icon-wrapper" onClick={logout}>
            <LogoutIcon />
            <span className="tooltip">Logout</span>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}><MenuIcon /></button>
        </div>
      </div>

      <div className="img">
        <img src={img1} alt="Background" className="background-img" />
        <div className="text-overlay">
          <Text data={data[count]} />
          <button className="view-products-button" onClick={handleViewProducts}>
            View Products
          </button>
        </div>
      </div>

        
    </>
  );
};

export default Home;
