import './SortingToys.scss';
import Toy from './Toy';
import Toys from '../pages/Main/Toys';

class SortingToys {
  howSortingToys: string;

  constructor() {
    this.howSortingToys = 'nameUp';
  }

  getSortingToys(arrToys: Toy[]): Toy[] {
    console.log('Start getSortingToys');

    arrToys.sort((nodeA, nodeB) => {
      const titleA = nodeA.name;
      const titleB = nodeB.name;
      const yearA = +nodeA.year;
      const yearB = +nodeB.year;

      if (this.howSortingToys === 'nameUp') return titleA > titleB ? 1 : -1;
      if (this.howSortingToys === 'nameDown') return titleA < titleB ? 1 : -1;
      if (this.howSortingToys === 'yearUp') return yearA > yearB ? 1 : -1;
      if (this.howSortingToys === 'yearDown') return yearA < yearB ? 1 : -1;
      return 1;
    });

    return arrToys;
  }

  render() {
    const sortingToys = document.createElement('div');
    sortingToys.classList.add('sorting-toys');

    const title = document.createElement('h3');
    title.classList.add('sorting-toys__title');
    title.textContent = 'сортировка';

    const select = document.createElement('select');
    select.classList.add('sorting-toys__select');
    const options = [
      'По названию от "А" до "Я"',
      'По названию от "Я" до "А"',
      'По возрастанию года выпуска',
      'По убыванию года выпуска'
    ];
    const values = ['nameUp', 'nameDown', 'yearUp', 'yearDown'];
    options.forEach((option, i) => {
      select[i] = new Option(option, values[i]);
    });

    const buttonResetFilters = document.createElement('button');
    buttonResetFilters.classList.add('sorting-toys__button-reset-filters', 'button');
    buttonResetFilters.textContent = 'Сброс фильтров';

    select.addEventListener('change', () => {
      this.howSortingToys = select.value;
      Toys.toysSettings.howSortingToys = select.value;
      Toys.settingsChange();
    });
    buttonResetFilters.addEventListener('click', () => {
      console.log('сбросить фильтры (dont work)');
    });

    sortingToys.append(title, select, buttonResetFilters);
    return sortingToys;
  }
}

export default SortingToys;
