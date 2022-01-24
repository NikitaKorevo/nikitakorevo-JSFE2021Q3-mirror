/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useReducer, useState } from 'react';
import './Winners.scss';
import { LIMIT_CARS_ON_WINNERS_PAGE } from '../../constants/constants';
import CarsAPI from '../../API/CarsAPI';
import Table from '../../components/Table/Table';

interface Iprops {
  currentPageInWinners: number;
  setCurrentPageInWinners: React.Dispatch<React.SetStateAction<number>>;
}

function Winners(props: Iprops): JSX.Element {
  const { currentPageInWinners, setCurrentPageInWinners } = props;

  const [ignored, forceUpdateWinners] = useReducer((x: number) => x + 1, 0);
  const [countWinners, setCountWinners] = useState('');
  const [winnersData, setWinnersData] = useState([]);
  const columnNames = ['№', 'Car', 'Name', 'Wins', 'Best time(sec)'];

  useEffect(() => {
    async function fn() {
      setWinnersData(await CarsAPI.getWinners(currentPageInWinners));
      setCountWinners((await CarsAPI.getWinnersCount(currentPageInWinners)) || '');
      /* console.log(await CarsAPI.getWinners(currentPageInWinners)); */
    }
    fn();
  }, [currentPageInWinners, countWinners]);

  function previousPage() {
    if (currentPageInWinners <= 1) return;
    setCurrentPageInWinners(currentPageInWinners - 1);
  }

  function nextPage() {
    const amountPages = Math.ceil(+countWinners / LIMIT_CARS_ON_WINNERS_PAGE);
    if (currentPageInWinners >= amountPages) return;
    setCurrentPageInWinners(currentPageInWinners + 1);
  }

  return (
    <main className="main Winners">
      <div className="heading">
        <h2 className="heading__title">Winners</h2>
        <span className="heading__count-winners">({countWinners})</span>
      </div>

      <Table columnNames={columnNames} winnersData={winnersData} />

      <div className="pagination">
        <button className="pagination__button-prev" onClick={previousPage} type="button">
          prev page
        </button>
        <span className="pagination__current-page">{currentPageInWinners}</span>
        <button className="pagination__button-next" onClick={nextPage} type="button">
          next page
        </button>
      </div>
    </main>
  );
}

export default Winners;
