import './Winners.scss';
import React, { useEffect, useState } from 'react';
import { LIMIT_CARS_ON_WINNERS_PAGE } from '../../constants/constants';
import CarsAPI from '../../API/CarsAPI';
import { IWinner } from '../../types/types';
import Table from '../../components/Table/Table';

interface IPropsWinners {
  currentPageInWinners: number;
  setCurrentPageInWinners: React.Dispatch<React.SetStateAction<number>>;
}

function Winners(props: IPropsWinners): JSX.Element {
  const { currentPageInWinners, setCurrentPageInWinners } = props;

  const [countWinners, setCountWinners] = useState('');
  const [winnersData, setWinnersData] = useState<Array<IWinner>>([]);
  const [sortOptions, setSortOptions] = useState('');

  useEffect((): void => {
    async function getDataWinners() {
      setWinnersData(await CarsAPI.getWinners(currentPageInWinners, sortOptions));
      setCountWinners((await CarsAPI.getWinnersCount(currentPageInWinners)) || '');
    }
    getDataWinners();
  }, [currentPageInWinners, countWinners, sortOptions]);

  function previousPage(): void {
    if (currentPageInWinners <= 1) return;
    setCurrentPageInWinners(currentPageInWinners - 1);
  }

  function nextPage(): void {
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

      <Table winnersData={winnersData} sortOptions={sortOptions} setSortOptions={setSortOptions} />

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
