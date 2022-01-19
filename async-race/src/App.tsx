import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Garage from './pages/Garage/Garage';
import Winners from './pages/Winners/Winners';
import Footer from './components/Footer/Footer';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
