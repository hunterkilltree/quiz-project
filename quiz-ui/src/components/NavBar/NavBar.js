import React from 'react';
import { useState } from 'react';
import './NavBar.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const location = useLocation();
  return (
    <>
      <nav className="navigation">
        <img
          src="https://images.squarespace-cdn.com/content/v1/5e7edd655234e75594647807/1586498728796-Q9USRXPO6FFZOCYXAD57/Screen+Shot+2020-04-10+at+3.35.11+pm.png?format=1500w"
          alt="Logo"
        />
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className={isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'}>
          <ul>
            <li>
              <Link
                to="/Home"
                className={location.pathname === '/Home' ? 'nav-active' : 'nav-non-active'}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Quiz"
                className={location.pathname === '/Quiz' ? 'nav-active' : 'nav-non-active'}>
                Quiz
              </Link>
            </li>
            <li>
              <Link
                to="/Leaderboard"
                className={location.pathname === '/Leaderboard' ? 'nav-active' : 'nav-non-active'}>
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
