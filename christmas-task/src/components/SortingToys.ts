import './SortingToys.scss';
import Toy from './Toy';
import Toys from '../pages/Main/Toys';
import { defaultSettings } from '../constants/constants';

class SortingToys {
  howSortingToys: string;

  constructor(howSortingToys: string) {
    this.howSortingToys = howSortingToys;
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

    const buttonResetSettings = document.createElement('button');
    buttonResetSettings.classList.add('sorting-toys__button-reset-settings', 'button');
    buttonResetSettings.textContent = 'Сброс настроек';

    select.addEventListener('change', () => {
      this.howSortingToys = select.value;
      Toys.toysSettings.howSortingToys = select.value;
      Toys.settingsChange();
    });
    buttonResetFilters.addEventListener('click', () => {
      const copyHowSortingToys = Toys.toysSettings.howSortingToys;
      Toys.toysSettings = JSON.parse(JSON.stringify(defaultSettings));
      Toys.toysSettings.howSortingToys = copyHowSortingToys;
      Toys.settingsChange();
      location.reload();
      console.log(defaultSettings);
    });
    buttonResetSettings.addEventListener('click', () => {
      localStorage.clear();
      location.reload();
    });
    select.value = this.howSortingToys;

    sortingToys.append(title, select, buttonResetFilters, buttonResetSettings);
    return sortingToys;
  }
}

export default SortingToys;
