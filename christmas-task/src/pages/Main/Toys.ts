import './Toys.scss';
import toyData from '../../data/toyData';
import { DEFAULT_SETTINGS } from '../../constants/constants';
import { IToysSettings } from '../../data/interfaces';
import Header from '../Header/Header';
import Toy from '../../components/Toy/Toy';
import FiltersValue from '../../components/filtersValue/FiltersValue';
import FiltersRange from '../../components/FiltersRange/FiltersRange';
import SortingToys from '../../components/SortingToys/SortingToys';

class Toys {
  static toysSettings: IToysSettings = Toys.#pullLocalStorage('toysSettings');
  static allToys: Toy[] = [];
  static processedToys = document.createElement('div');
  static pickedToys: Set<number> = Toys.#pullLocalStorage('pickedToys');
  static limitToys = 20;
  static filtersValue = new FiltersValue();
  static filtersRange = new FiltersRange(Toys.toysSettings);
  static sortingToys = new SortingToys(Toys.toysSettings.howSortingToys);

  static #pullLocalStorage(key: string) {
    const korEvo_toysSettings = localStorage.getItem('korEvo_toysSettings');
    const korEvo_pickedToys = localStorage.getItem('korEvo_pickedToys');

    switch (key) {
      case 'toysSettings':
        if (korEvo_toysSettings) {
          return JSON.parse(korEvo_toysSettings);
        } else {
          localStorage.setItem('korEvo_toysSettings', JSON.stringify(DEFAULT_SETTINGS));
          return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
        }

      case 'pickedToys':
        if (korEvo_pickedToys) {
          return new Set(JSON.parse(korEvo_pickedToys));
        } else {
          return new Set();
        }

      default:
        break;
    }
  }

  static #pushLocalStorage(): void {
    localStorage.setItem('korEvo_toysSettings', JSON.stringify(Toys.toysSettings));

    const objPickedToys: number[] = [];
    Toys.pickedToys.forEach((num) => objPickedToys.push(num));
    localStorage.setItem('korEvo_pickedToys', JSON.stringify(objPickedToys));
  }

  static settingsChange(): void {
    Toys.#pushLocalStorage();
    Toys.#startFiltersAndSortsToys();
  }

  static #startFiltersAndSortsToys(): void {
    let arrToys = Toys.allToys.slice();
    arrToys = Toys.sortingToys.getSortingToys(arrToys);
    arrToys = Toys.filtersRange.getFilterRange(arrToys);
    arrToys = Toys.filtersValue.getFiltersValue(arrToys);
    arrToys = new Header().getSearchSort(arrToys);

    while (Toys.processedToys.firstChild) {
      Toys.processedToys.removeChild(Toys.processedToys.firstChild);
    }

    arrToys.forEach((node) => {
      const renderNode = node.render();

      renderNode.addEventListener('click', (e) => {
        Toys.#updateCountSelectedToys(e);
        Toys.#pushLocalStorage();
      });
      if (Toys.pickedToys.has(+node.num)) renderNode.classList.add('toy--checked');
      Toys.processedToys.append(renderNode);
    });

    if (Toys.processedToys.children.length === 0) {
      const zeroToys = new Toy(toyData[0]).renderZeroToys();
      Toys.processedToys.append(zeroToys);
    }
  }

  static render(): HTMLDivElement {
    const toysContainer = document.createElement('div');
    toysContainer.classList.add('toys__container');

    const settingsContainer = document.createElement('div');
    settingsContainer.classList.add('settings');
    settingsContainer.append(Toys.filtersValue.render(), Toys.filtersRange.render(), Toys.sortingToys.render());

    Toys.processedToys.classList.add('toys');

    if (Toys.allToys.length === 0) {
      for (let i = 0; i < toyData.length; i++) {
        const toy = new Toy(toyData[i]);
        Toys.allToys.push(toy);
      }
    }
    Toys.#startFiltersAndSortsToys();

    toysContainer.append(settingsContainer, Toys.processedToys);
    return toysContainer;
  }

  static #updateCountSelectedToys(e: Event): void {
    const target = e.target as HTMLElement;
    const toy = target.closest('.toy') as HTMLDivElement;
    const numToy = toy.dataset.num;
    let countPickedToys = Toys.pickedToys.size;

    toy.classList.contains('toy--checked') ? countPickedToys-- : countPickedToys++;

    if (countPickedToys > Toys.limitToys) return Toys.#countToysExceeded(toy);

    toy.classList.toggle('toy--checked');
    if (numToy) {
      toy.classList.contains('toy--checked') ? Toys.pickedToys.add(+numToy) : Toys.pickedToys.delete(+numToy);
    }

    Header.amountToys.value = `${Toys.pickedToys.size}`;
  }

  static #countToysExceeded(toy: HTMLDivElement): void {
    if (toy.classList.contains('toy--warning')) return;

    toy.classList.add('toy--warning');
    setTimeout(() => {
      toy.classList.remove('toy--warning');
    }, 2000);
  }
}

export default Toys;
