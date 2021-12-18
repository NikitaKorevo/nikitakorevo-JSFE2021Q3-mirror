export interface IToy {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

/* interface ISortings {
  TODO сделать отдельно тип для sorting
} */

interface IForms {
  ball: boolean;
  bell: boolean;
  cone: boolean;
  snowflake: boolean;
  figurine: boolean;
}

interface IColors {
  white: boolean;
  yellow: boolean;
  red: boolean;
  blue: boolean;
  green: boolean;
}

interface IDimensions {
  big: boolean;
  average: boolean;
  small: boolean;
}

export interface IToysSettings {
  [index: string]: string | boolean | IForms | IColors | IDimensions;
  howSortingToys: string;
  numInstanceFrom: string;
  numInstanceTo: string;
  purchaseYearFrom: string;
  purchaseYearTo: string;
  forms: IForms;
  colors: IColors;
  dimensions: IDimensions;
  favorite: boolean;
}

// TODO сделать отдельно тип для sorting

/* export interface IToysSettings {
  [key: string]: string | boolean;
  howSortingToys: string;
  numInstanceFrom: string;
  numInstanceTo: string;
  purchaseYearFrom: string;
  purchaseYearTo: string;
  forms: {
    ball: boolean;
    bell: boolean;
    cone: boolean;
    snowflake: boolean;
    figurine: boolean;
  };
  colors: {
    white: boolean;
    yellow: boolean;
    red: boolean;
    blue: boolean;
    green: boolean;
  };
  dimensions: {
    big: boolean;
    average: boolean;
    small: boolean;
  };
  favorite: boolean;
}
 */
