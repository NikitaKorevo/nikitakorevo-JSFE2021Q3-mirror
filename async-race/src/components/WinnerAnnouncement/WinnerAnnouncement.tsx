import './WinnerAnnouncement.scss';
import React from 'react';
import { IWinnerInRace } from '../../types/types';

interface IPropsWinnerAnnouncement {
  firstWinnerInRace: IWinnerInRace;
}

function WinnerAnnouncement(props: IPropsWinnerAnnouncement): JSX.Element {
  const { firstWinnerInRace } = props;
  const { carName, time } = firstWinnerInRace;
  const announcement = `${carName} went first (${time}sec)`;
  return <span className="WinnerAnnouncement">{announcement}</span>;
}
export default WinnerAnnouncement;
