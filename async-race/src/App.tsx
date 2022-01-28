import './App.scss';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ROUTES from './constants/routes';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Garage from './pages/Garage/Garage';
import Winners from './pages/Winners/Winners';
import Footer from './components/Footer/Footer';

function App(): JSX.Element {
  const [currentPageInGarage, setCurrentPageInGarage] = useState(1);
  const [currentPageInWinners, setCurrentPageInWinners] = useState(1);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route
          path={ROUTES.GARAGE}
          element={
            <Garage
              currentPageInGarage={currentPageInGarage}
              setCurrentPageInGarage={setCurrentPageInGarage}
            />
          }
        />
        <Route
          path={ROUTES.WINNERS}
          element={
            <Winners
              currentPageInWinners={currentPageInWinners}
              setCurrentPageInWinners={setCurrentPageInWinners}
            />
          }
        />
        <Route path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
