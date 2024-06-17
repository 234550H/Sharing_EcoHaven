import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import '../src/assets/style/backend/sidebar.css';

const SidebarDropdown = () => {
  const [accountDropdownActive, setAccountDropdownActive] = useState(false);
  const [rewardDropdownActive, setRewardDropdownActive] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const location = useLocation(); 

  const toggleAccountDropdown = () => {
    setAccountDropdownActive(!accountDropdownActive);
    setRewardDropdownActive(false);
  };

  const toggleRewardDropdown = () => {
    setRewardDropdownActive(!rewardDropdownActive);
    setAccountDropdownActive(false);
  };


  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="sidenav">
      <div className="ecohaven-background">
        <a href="/">Eco<span style={{ color: 'black' }}>Haven</span></a>
      </div>
      <Link to="/overview" className={location.pathname === '/overview' ? 'active' : ''} onClick={() => handleLinkClick('/overview')}>
      <img src='../src/assets/icons/overview.png' alt='overviewIcon' width={'35px'} height={'30px'} className='icon'/>
        Overview
      </Link>
      <button className={`dropdown-btn ${accountDropdownActive ? 'active' : ''}`} onClick={toggleAccountDropdown}>
      <img src='../src/assets/icons/Account.png' alt='overviewIcon' width={'30px'} height={'30px'} className='icon'/>
        Account ˅
        <i className="fa fa-caret-down"></i>
      </button>
      <div className={`dropdown-container ${accountDropdownActive ? 'show' : ''}`}>
        <a href="#">Users</a>
        <a href="#">Staff</a>
      </div>
      <Link to="/events" className={location.pathname === '/events' ? 'active' : ''} onClick={() => handleLinkClick('/events')}>
      <img src='../src/assets/icons/events.png' alt='overviewIcon' width={'30px'} height={'30px'} className='icon'/>
        Events
      </Link>
      <Link to="/bookings" className={location.pathname === '/bookings' ? 'active' : ''} onClick={() => handleLinkClick('/bookings')}>
      <img src='../src/assets/icons/bookings.png' alt='overviewIcon' width={'30px'} height={'30px'} className='icon'/>
        Bookings
      </Link>
      <Link to="/points" className={location.pathname === '/points' ? 'active' : ''} onClick={() => handleLinkClick('/points')}>
      <img src='../src/assets/icons/points.png' alt='overviewIcon' width={'30px'} height={'30px'} className='icon'/>
        Points
      </Link>
      <button className={`dropdown-btn ${rewardDropdownActive ? 'active' : ''}`} onClick={toggleRewardDropdown}>
      <img src='../src/assets/icons/reward.png' alt='overviewIcon' width={'30px'} height={'30px'} className='icon'/>
        Reward ˅
      </button>
      <div className={`dropdown-container ${rewardDropdownActive ? 'show' : ''}`}>
        <a href="#">Collection</a>
      </div>
      <Link to="/payment" className={location.pathname === '/payment' ? 'active' : ''} onClick={() => handleLinkClick('/payment')}>
       <img src='../src/assets/icons/payment.png' alt='overviewIcon' width={'30px'} height={'30px'} className='icon'/>
        Payment
      </Link>
      <Link to="/refund" className={location.pathname === '/refund' ? 'active' : ''} onClick={() => handleLinkClick('/refund')}>
 <img src='../src/assets/icons/refund.png' alt='overviewIcon' width={'30px'} height={'30px'} className='icon'/>
        Refund
      </Link>
      <Link to="/mailing-list" className={location.pathname === '/mailing-list' ? 'active' : ''} onClick={() => handleLinkClick('/mailing-list')}>
 <img src='../src/assets/icons/mailing.png' alt='overviewIcon' width={'30px'} height={'30px'} className='icon'/>
        Mailing List
      </Link>
      <Link to="/review" className={location.pathname === '/review' ? 'active' : ''} onClick={() => handleLinkClick('/review')}>
       <img src='../src/assets/icons/review.png' alt='overviewIcon' width={'30px'} height={'30px'} className='icon'/>
        Review
      </Link>
    </div>
  );
};

export default SidebarDropdown;
