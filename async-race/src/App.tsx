/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
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
        <Route path="/" element={<Main />} />
        <Route
          path="/garage"
          element={
            <Garage
              currentPageInGarage={currentPageInGarage}
              setCurrentPageInGarage={setCurrentPageInGarage}
            />
          }
        />
        <Route
          path="/winners"
          element={
            <Winners
              currentPageInWinners={currentPageInWinners}
              setCurrentPageInWinners={setCurrentPageInWinners}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
