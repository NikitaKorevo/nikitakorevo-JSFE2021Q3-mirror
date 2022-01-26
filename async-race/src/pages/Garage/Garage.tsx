/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useReducer, useState } from 'react';
import './Garage.scss';
import { LIMIT_CARS_ON_GARAGE_PAGE } from '../../constants/constants';
import CarsAPI from '../../API/CarsAPI';
import CarLane from '../../components/CarLane/CarLane';
import GarageSettings from '../../components/GarageSettings/GarageSettings';
import WinnerAnnouncement from '../../components/WinnerAnnouncement/WinnerAnnouncement';

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
  const [isRace, setIsRace] = useState(false);
  const [winnersInRace, setWinnersInRace] = useState(null);
  const [firstWinnerInRace, setFirstWinnerInRace] = useState({
    id: null,
    carName: null,
    time: null
  });
  const [isWinnerAnnouncementHidden, setIsWinnerAnnouncementHidden] = useState(false);

  useEffect(() => {
    if (isRace && winnersInRace && !firstWinnerInRace.id) {
      setFirstWinnerInRace(winnersInRace);
      setIsWinnerAnnouncementHidden(true);
    }
  }, [isRace, winnersInRace, firstWinnerInRace]);

  useEffect(() => {
    if (isRace) return;
    function racePreparation() {
      setIsWinnerAnnouncementHidden(false);
      setWinnersInRace(null);
      setFirstWinnerInRace({
        id: null,
        carName: null,
        time: null
      });
    }
    racePreparation();
  }, [isRace]);

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
        isRace={isRace}
        setWinnersInRace={setWinnersInRace}
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
      {isWinnerAnnouncementHidden ? (
        <WinnerAnnouncement firstWinnerInRace={firstWinnerInRace} />
      ) : null}

      <GarageSettings
        selectedCarIdForEdited={selectedCarIdForEdited}
        setSelectedCarIdForEdited={setSelectedCarIdForEdited}
        forceUpdateGarage={forceUpdateGarage}
        isRace={isRace}
        setIsRace={setIsRace}
        setIsWinnerAnnouncementHidden={setIsWinnerAnnouncementHidden}
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
