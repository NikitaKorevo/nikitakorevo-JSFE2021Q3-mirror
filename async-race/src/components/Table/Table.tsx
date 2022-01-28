import React, { useEffect, useState } from 'react';
import './Table.scss';
import Car from '../Car/Car';
import CarsAPI from '../../API/CarsAPI';
import { IWinner } from '../../types/types';

interface IPropsTable {
  winnersData: Array<IWinner>;
  sortOptions: string;
  setSortOptions: React.Dispatch<React.SetStateAction<string>>;
}

function Table(props: IPropsTable): JSX.Element {
  const { winnersData, sortOptions, setSortOptions } = props;

  const [columnNames, setColumnNames] = useState(['№', 'Car', 'Name', 'Wins', 'Best time(sec)']);
  const [tbodyElements, setTbodyElements] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    async function getCarsData(): Promise<void> {
      const promisesCarsData = winnersData.map((winner: IWinner) => CarsAPI.getCar(winner.id));
      const carsData = await Promise.all(promisesCarsData);

      if (carsData.length === 0) return;

      setTbodyElements(
        winnersData.map((winner: IWinner, i: number) => {
          const { name, color } = carsData[i];
          return (
            <tr key={winner.id}>
              <td>{i + 1}</td>
              <td>
                <Car carWidth="35" carHeight="100%" carColor={color} />
              </td>
              <td>{name}</td>
              <td>{winner.wins}</td>
              <td>{winner.time}</td>
            </tr>
          );
        })
      );
    }
    getCarsData();
  }, [winnersData]);

  function sortByWinners() {
    return sortOptions === '&_sort=wins&_order=DESC'
      ? setSortOptions('&_sort=wins&_order=ASC')
      : setSortOptions('&_sort=wins&_order=DESC');
  }

  function sortByBestTime() {
    return sortOptions === '&_sort=time&_order=ASC'
      ? setSortOptions('&_sort=time&_order=DESC')
      : setSortOptions('&_sort=time&_order=ASC');
  }

  return (
    <table className="Table-winners">
      <thead>
        <tr>
          <td>{columnNames[0]}</td>
          <td>{columnNames[1]}</td>
          <td>{columnNames[2]}</td>
          <td>
            <button style={{ cursor: 'pointer' }} type="button" onClick={sortByWinners}>
              {columnNames[3]}
            </button>
          </td>
          <td>
            <button style={{ cursor: 'pointer' }} type="button" onClick={sortByBestTime}>
              {columnNames[4]}
            </button>
          </td>
        </tr>
      </thead>
      <tbody>{tbodyElements}</tbody>
    </table>
  );
}

export default Table;
