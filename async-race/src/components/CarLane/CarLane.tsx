/* eslint-disable object-curly-newline */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CarsAPI from '../../API/CarsAPI';
import Car from '../Car/Car';
import './CarLane.scss';

function CarLane(props: any) {
  const {
    id,
    carName,
    carColor,
    countCars,
    setCountCars,
    isRace,
    setSelectedCarIdForEdited,
    setWinnersInRace
  } = props;

  const carLaneEl = useRef(null);

  const [isButtonADisabled, setIsButtonADisabled] = useState(false);
  const [isButtonBDisabled, setIsButtonBDisabled] = useState(true);
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

  const translateCarOnStart = useCallback(async () => {
    setIsButtonBDisabled(true);

    await CarsAPI.startStopCarEngine(id, 'stopped');
    setCarEngineStatus('reverse');
    setIsButtonADisabled(false);
  }, [id]);

  async function stopCarEngine() {
    setCarEngineStatus('stopped');
  }

  const startCarEngine = useCallback(async () => {
    setIsButtonADisabled(true);
    let isCarOk = true;

    const date1 = Date.now();
    const { velocity, distance } = await CarsAPI.startStopCarEngine(id, 'started');
    const date2 = Date.now();
    const delayBeforeStart = date2 - date1;

    const travelTimeMs = distance / velocity;
    setTravelTime((travelTimeMs / 1000).toFixed(2));
    const time = ((delayBeforeStart + travelTimeMs) / 1000).toFixed(2);
    /* setTravelTime((distance / velocity / 1000).toFixed(2)); */

    setCarEngineStatus('started');
    setIsButtonBDisabled(false);

    setTimeout(() => {
      if (!isCarOk) return;
      setWinnersInRace({ id, carName, time });
    }, travelTimeMs);

    const { success } = await CarsAPI.switchCarEngineDriveMode(id, 'drive');
    if (!success) {
      isCarOk = false;
      stopCarEngine();
    }
  }, [id, carName, setWinnersInRace]);

  useEffect(() => {
    if (isRace) startCarEngine();
    if (!isRace) translateCarOnStart();
  }, [isRace, startCarEngine, translateCarOnStart]);

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
        <button type="button" onClick={startCarEngine} disabled={isButtonADisabled}>
          A
        </button>
        <button type="button" onClick={translateCarOnStart} disabled={isButtonBDisabled}>
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
