import './Main.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../constants/routes';

function Main(): JSX.Element {
  return (
    <main className="main Main">
      <h1 className="title">Async Race</h1>
      <NavLink className="link" to={ROUTES.GARAGE}>
        garage
      </NavLink>
      <NavLink className="link" to={ROUTES.WINNERS}>
        winners
      </NavLink>
    </main>
  );
}

export default Main;
