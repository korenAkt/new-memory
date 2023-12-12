import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  let currentUserRole = localStorage.getItem('role');

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      

      <div className="container">
        <NavLink to="/" className="navbar-brand">
          
        </NavLink>
        
        <div className={`collapse navbar-collapse ${showNavbar ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav"> 

            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={toggleNavbar}>
                Home
              </NavLink>
            </li>

            {(currentUserRole === 'user' || currentUserRole === 'admin') && (
            <li className="nav-item">
              <NavLink to="/memories" className="nav-link" onClick={toggleNavbar}>
                Memories
              </NavLink>
            </li>
            )}

            {(currentUserRole === 'user' || currentUserRole === 'admin') && (
            <li className="nav-item">
              <NavLink to="/favorites" className="nav-link" onClick={toggleNavbar}>
                Favorites
              </NavLink>
            </li>
            )}

            {currentUserRole === 'admin' && (
                <li className="nav-item">
                  <NavLink to="/users" className="nav-link" onClick={toggleNavbar}>
                    Users
                  </NavLink>
                </li>
            )}

            <li className="nav-item">
              <NavLink to="/signup" className="nav-link" onClick={toggleNavbar}>
                Signup
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link" onClick={toggleNavbar}>
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/login" className="nav-link" onClick={toggleNavbar}>
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
