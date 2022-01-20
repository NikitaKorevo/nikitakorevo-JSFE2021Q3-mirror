/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import './Garage.scss';
import CarsAPI from '../../API/CarsAPI';
import CarLane from '../../components/CarLane/CarLane';

interface Iprops {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function Garage(props: Iprops): JSX.Element {
  const { currentPage, setCurrentPage } = props;

  const [countCars, setCountCars] = useState('');
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    async function getCarsData() {
      setCarsData(await CarsAPI.getCars(currentPage));
      setCountCars((await CarsAPI.getCarsCount()) || '');
    }
    getCarsData();
  }, [currentPage, countCars]);

  return (
    <main className="main Garage">
      <div className="heading">
        <h2 className="heading__title">Garage</h2>
        <span className="heading__count-cars">({countCars})</span>
      </div>

      <CarLane />
      <div className="pagination">
        <button className="pagination__button-prev" onClick={() => setCurrentPage(currentPage - 1)} type="button">
          prev page
        </button>
        <span className="pagination__current-page">{currentPage}</span>
        <button className="pagination__button-next" onClick={() => setCurrentPage(currentPage + 1)} type="button">
          next page
        </button>
      </div>
    </main>
  );
}

export default Garage;
