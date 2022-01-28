import './Header.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../constants/routes';

function Header(): JSX.Element {
  return (
    <header className="Header">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink className="nav__link" to={ROUTES.MAIN}>
              main
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to={ROUTES.GARAGE}>
              garage
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to={ROUTES.WINNERS}>
              winners
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
