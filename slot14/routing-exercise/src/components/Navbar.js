import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span>🏪 MyShop</span>
        </div>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              🏠 Trang Chủ
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink 
              to="/san-pham"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              📱 Sản Phẩm
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink 
              to="/lien-he"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              📞 Liên Hệ
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;