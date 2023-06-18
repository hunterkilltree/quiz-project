import React from 'react';
import { useState } from 'react';
import inspiredNt_logo from '../Logo/inspiredNt_logo.png'
import './NavBar.css';
import { useLocation } from 'react-router-dom'

const NavBar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const location = useLocation();
  return (
    <>
    <nav className="navigation">
      <img src={inspiredNt_logo} alt="Logo" className="logo"/>
      <button className="hamburger"
              onClick={() => { setIsNavExpanded(!isNavExpanded);}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }>
        <ul>
          <li>
            <a href="/Home" className={location.pathname === "/Home" ? "nav-active" : "nav-non-active"}>HOME</a>
          </li>
          <li>
          <a href="/Quiz" className={location.pathname === "/Quiz" ? "nav-active" : "nav-non-active"}>QUIZ</a>
          </li>
          <li>
            <a href="/Leaderboard" className={location.pathname === "/Leaderboard" ? "nav-active" : "nav-non-active"}>LEADERBOARD</a>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default NavBar;
