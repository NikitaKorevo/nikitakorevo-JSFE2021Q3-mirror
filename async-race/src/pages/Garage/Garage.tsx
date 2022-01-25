/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useReducer, useState } from 'react';
import './Garage.scss';
import { LIMIT_CARS_ON_GARAGE_PAGE } from '../../constants/constants';
import CarsAPI from '../../API/CarsAPI';
import CarLane from '../../components/CarLane/CarLane';
import GarageSettings from '../../components/GarageSettings/GarageSettings';

interface Iprops {
  currentPageInGarage: number;
  setCurrentPageInGarage: React.Dispatch<React.SetStateAction<number>>;
}

function Garage(props: Iprops): JSX.Element {
  const { currentPageInGarage, setCurrentPageInGarage } = props;

  const [ignored, forceUpdateGarage] = useReducer((x: number) => x + 1, 0);
  const [countCars, setCountCars] = useState('');
  const [carsData, setCarsData] = useState([]);
  const [selectedCarIdForEdited, setSelectedCarIdForEdited] = useState(null);

  useEffect(() => {
    async function fn() {
      setCarsData(await CarsAPI.getCars(currentPageInGarage));
      setCountCars((await CarsAPI.getCarsCount(currentPageInGarage)) || '');
    }
    fn();
  }, [ignored, currentPageInGarage, countCars]);

  const carLanes = carsData.map((car) => {
    const { name, color, id } = car;
    return (
      <CarLane
        carName={name}
        carColor={color}
        id={id}
        countCars={countCars}
        setCountCars={setCountCars}
        setSelectedCarIdForEdited={setSelectedCarIdForEdited}
        key={id}
      />
    );
  });

  function previousPage() {
    if (currentPageInGarage <= 1) return;
    setCurrentPageInGarage(currentPageInGarage - 1);
  }

  function nextPage() {
    const amountPages = Math.ceil(+countCars / LIMIT_CARS_ON_GARAGE_PAGE);
    if (currentPageInGarage >= amountPages) return;
    setCurrentPageInGarage(currentPageInGarage + 1);
  }

  return (
    <main className="main Garage">
      <GarageSettings
        selectedCarIdForEdited={selectedCarIdForEdited}
        setSelectedCarIdForEdited={setSelectedCarIdForEdited}
        forceUpdateGarage={forceUpdateGarage}
      />
      <div className="heading">
        <h2 className="heading__title">Garage</h2>
        <span className="heading__count-cars">({countCars})</span>
      </div>
      {carLanes}
      <div className="pagination">
        <button className="pagination__button-prev" onClick={previousPage} type="button">
          prev page
        </button>
        <span className="pagination__current-page">{currentPageInGarage}</span>
        <button className="pagination__button-next" onClick={nextPage} type="button">
          next page
        </button>
      </div>
    </main>
  );
}

export default Garage;
