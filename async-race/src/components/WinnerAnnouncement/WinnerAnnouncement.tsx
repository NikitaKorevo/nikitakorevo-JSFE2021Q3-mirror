import React from 'react';
import './WinnerAnnouncement.scss';

function WinnerAnnouncement(props: any) {
  const { firstWinnerInRace } = props;
  const { carName, time } = firstWinnerInRace;
  const announcement = `${carName} went first (${time}sec)`;
  return <span className="WinnerAnnouncement">{announcement}</span>;
}
export default WinnerAnnouncement;
