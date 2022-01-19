import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="Header">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink className="nav__link" to="/">
              main
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to="/garage">
              garage
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to="/winners">
              winners
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
