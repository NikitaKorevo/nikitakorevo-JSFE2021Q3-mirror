/* eslint-disable object-curly-newline */
import React from 'react';
import CarsAPI from '../../API/CarsAPI';
import Car from '../Car/Car';
import './CarLane.scss';

function CarLane(props: any) {
  const { carName, carColor, countCars, id } = props;
  const { setCountCars, setSelectedCarIdForEdited } = props;

  function selectCar() {
    setSelectedCarIdForEdited(id);
  }

  function removeCar() {
    CarsAPI.deleteCar(id);
    setCountCars(countCars - 1);
  }

  return (
    <div className="CarLane">
      <div>
        <button type="button" onClick={selectCar}>
          select
        </button>
        <button type="button" onClick={removeCar}>
          remove
        </button>
        <span>{carName}</span>
      </div>
      <div>
        <button type="button">A</button>
        <button type="button">B</button>
      </div>
      <Car carColor={carColor} />
    </div>
  );
}

export default CarLane;
