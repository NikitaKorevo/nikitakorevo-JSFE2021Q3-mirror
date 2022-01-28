export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface IWinner {
  time: number;
  wins: number;
  id: number;
}

export interface IWinnerInRace {
  id: number | null;
  carName: string | null;
  time: number | null;
}
