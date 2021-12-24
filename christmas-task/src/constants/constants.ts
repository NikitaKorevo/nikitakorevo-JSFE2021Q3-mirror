/* ROUTES */
export const PAGE_NOT_FOUND = 'page-not-found';
export const HOME = '';
export const TOYS = 'toys';
export const TREE = 'tree';

export const LIMIT_PICKED_TOYS = 20;

export const DEFAULT_SETTINGS = {
  howSortingToys: 'nameUp',
  numInstanceFrom: '1',
  numInstanceTo: '12',
  purchaseYearFrom: '1940',
  purchaseYearTo: '2020',
  forms: {
    ball: false,
    bell: false,
    cone: false,
    snowflake: false,
    figurine: false
  },
  colors: {
    white: false,
    yellow: false,
    red: false,
    blue: false,
    green: false
  },
  dimensions: {
    big: false,
    average: false,
    small: false
  },
  favorites: {
    favorite: false
  }
};
