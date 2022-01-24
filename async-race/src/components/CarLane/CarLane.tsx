/* eslint-disable object-curly-newline */
import React, { useRef, useState } from 'react';
import CarsAPI from '../../API/CarsAPI';
import Car from '../Car/Car';
import './CarLane.scss';

function CarLane(props: any) {
  const { carName, carColor, countCars, id } = props;
  const { setCountCars, setSelectedCarIdForEdited } = props;

  const carLaneEl = useRef(null);
  const [carWidth, setCarWidth] = useState('80');
  const [carHeight, setCarHeight] = useState('100%');
  const [carEngineStatus, setCarEngineStatus] = useState('stopped');
  const [travelTime, setTravelTime] = useState('0');

  function selectCar() {
    setSelectedCarIdForEdited(id);
  }

  function removeCar() {
    CarsAPI.deleteCar(id);
    setCountCars(countCars - 1);
  }
  async function translateCarOnStart() {
    await CarsAPI.startStopCarEngine(id, 'stopped');
    setCarEngineStatus('reverse');
  }

  async function stopCarEngine() {
    setCarEngineStatus('stopped');
  }

  async function startCarEngine() {
    const { velocity, distance } = await CarsAPI.startStopCarEngine(id, 'started');
    setTravelTime((distance / velocity / 1000).toFixed(2));
    setCarEngineStatus('started');

    const { success } = await CarsAPI.switchCarEngineDriveMode(id, 'drive');
    if (!success) stopCarEngine();
  }

  return (
    <div ref={carLaneEl} className="CarLane">
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
        <button type="button" onClick={startCarEngine}>
          A
        </button>
        <button type="button" onClick={translateCarOnStart}>
          B
        </button>
      </div>
      <Car
        carWidth={carWidth}
        carHeight={carHeight}
        carColor={carColor}
        travelTime={travelTime}
        carEngineStatus={carEngineStatus}
        carLaneEl={carLaneEl}
      />
    </div>
  );
}

export default CarLane;
