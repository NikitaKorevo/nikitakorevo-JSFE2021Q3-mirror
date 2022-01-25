import React from 'react';
import './PageNotFound.scss';

function PageNotFound() {
  return (
    <main className="main Page-not-found">
      <span className="error-number">404</span>
      <p className="error-text">Page not found</p>
    </main>
  );
}

export default PageNotFound;
