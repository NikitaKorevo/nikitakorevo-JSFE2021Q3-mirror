import React, { useEffect, useState } from 'react';
import './Table.scss';
import Car from '../Car/Car';
import CarsAPI from '../../API/CarsAPI';
import { ICar, IWinner } from '../../types/types';

function Table(props: any): JSX.Element {
  const { columnNames, winnersData } = props;

  const theadElements = columnNames.map((name: string) => <td key={name}>{name}</td>);
  const [tbodyElements, setTbodyElements] = useState([]);

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
                <Car carColor={color} />
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

  return (
    <table className="Table-winners">
      <thead>
        <tr>{theadElements}</tr>
      </thead>
      <tbody>{tbodyElements}</tbody>
    </table>
  );
}

export default Table;
