import React from 'react';
import './Main.scss';
import { NavLink } from 'react-router-dom';

function Main() {
  return (
    <main className="main Main">
      <h1 className="title">Async Race</h1>
      <NavLink className="link" to="/garage">
        garage
      </NavLink>
      <NavLink className="link" to="/winners">
        winners
      </NavLink>
    </main>
  );
}

export default Main;
