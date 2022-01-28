import './Garage.scss';
import React, { useEffect, useReducer, useState } from 'react';
import { LIMIT_CARS_ON_GARAGE_PAGE } from '../../constants/constants';
import CarsAPI from '../../API/CarsAPI';
import CarLane from '../../components/CarLane/CarLane';
import GarageSettings from '../../components/GarageSettings/GarageSettings';
import WinnerAnnouncement from '../../components/WinnerAnnouncement/WinnerAnnouncement';
import { IWinnerInRace } from '../../types/types';

interface IPropsGarage {
  currentPageInGarage: number;
  setCurrentPageInGarage: React.Dispatch<React.SetStateAction<number>>;
}

function Garage(props: IPropsGarage): JSX.Element {
  const { currentPageInGarage, setCurrentPageInGarage } = props;

  const [ignored, forceUpdateGarage] = useReducer((x: number) => x + 1, 0);
  const [countCars, setCountCars] = useState('');
  const [carsData, setCarsData] = useState([]);
  const [selectedCarIdForEdited, setSelectedCarIdForEdited] = useState<number | null>(null);
  const [isRace, setIsRace] = useState<boolean | null>(null);
  const [winnersInRace, setWinnersInRace] = useState<IWinnerInRace>({
    id: null,
    carName: null,
    time: null
  });
  const [firstWinnerInRace, setFirstWinnerInRace] = useState<IWinnerInRace>({
    id: null,
    carName: null,
    time: null
  });
  const [isWinnerAnnouncementHidden, setIsWinnerAnnouncementHidden] = useState(true);

  useEffect((): void => {
    if (!isRace || !winnersInRace.id || firstWinnerInRace.id) return;
    setFirstWinnerInRace(winnersInRace);
    setIsWinnerAnnouncementHidden(false);

    async function setWinner(): Promise<void> {
      if (!winnersInRace.id || !winnersInRace.time) return;
      const { id, time } = winnersInRace;
      const winnerData = await CarsAPI.getWinner(id);

      if (!winnerData.id) {
        const amountWins = 1;
        CarsAPI.createWinner(id, amountWins, time);
      } else {
        const amountWins = winnerData.wins + 1;
        const newTime = winnerData.time > time ? time : winnerData.time;
        CarsAPI.updateWinner(id, amountWins, newTime);
      }
    }
    setWinner();
  }, [isRace, winnersInRace, firstWinnerInRace]);

  useEffect((): void => {
    if (isRace) return;
    function racePreparation() {
      setIsWinnerAnnouncementHidden(true);
      setWinnersInRace({
        id: null,
        carName: null,
        time: null
      });
      setFirstWinnerInRace({
        id: null,
        carName: null,
        time: null
      });
    }
    racePreparation();
  }, [isRace]);

  useEffect((): void => {
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

  function previousPage(): void {
    if (currentPageInGarage <= 1) return;
    setCurrentPageInGarage(currentPageInGarage - 1);
  }

  function nextPage(): void {
    const amountPages = Math.ceil(+countCars / LIMIT_CARS_ON_GARAGE_PAGE);
    if (currentPageInGarage >= amountPages) return;
    setCurrentPageInGarage(currentPageInGarage + 1);
  }

  return (
    <main className="main Garage">
      {isWinnerAnnouncementHidden ? null : (
        <WinnerAnnouncement firstWinnerInRace={firstWinnerInRace} />
      )}

      <GarageSettings
        selectedCarIdForEdited={selectedCarIdForEdited}
        setSelectedCarIdForEdited={setSelectedCarIdForEdited}
        forceUpdateGarage={forceUpdateGarage}
        isRace={isRace}
        setIsRace={setIsRace}
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
