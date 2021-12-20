import './Toys.scss';
import toyData from '../../data/toyData';
import { defaultSettings } from '../../constans/constans';
import { IToysSettings } from '../../data/interfaces';
import Toy from '../../components/Toy';
import FiltersValue from '../../components/filtersValue/FiltersValue';
import FiltersRange from '../../components/FiltersRange/FiltersRange';
import SortingToys from '../../components/SortingToys';

class Toys {
  /* static toyData = toyData; */
  static toysSettings: IToysSettings = Toys.#pullLocalStorage('toysSettings');
  static allToys: Toy[] = [];
  static processedToys = document.createElement('div');
  /* static pickedToys: Set<number> = new Set(); */
  static pickedToys: Set<number> = Toys.#pullLocalStorage('pickedToys');
  static limitToys = 20;
  static filtersValue = new FiltersValue();
  static filtersRange = new FiltersRange(Toys.toysSettings);
  static sortingToys = new SortingToys(Toys.toysSettings.howSortingToys);
  /* static toysSettings: IToysSettings = Object.assign(defaultSettings); */
  /* static toysSettings: IToysSettings = {
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
  }; */

  static #pullLocalStorage(key: string) {
    const korevo_toysSettings = localStorage.getItem('korevo_toysSettings');
    const korevo_pickedToys = localStorage.getItem('korevo_pickedToys');

    switch (key) {
      case 'toysSettings':
        if (korevo_toysSettings) {
          return JSON.parse(korevo_toysSettings);
        } else {
          localStorage.setItem('korevo_toysSettings', JSON.stringify(defaultSettings));
          return JSON.parse(JSON.stringify(defaultSettings));
        }

      case 'pickedToys':
        if (korevo_pickedToys) {
          return new Set(JSON.parse(korevo_pickedToys));
        } else {
          return new Set();
        }

      default:
        break;
    }
  }

  static #pushLocalStorage() {
    console.log(Toys.pickedToys);
    localStorage.setItem('korevo_toysSettings', JSON.stringify(Toys.toysSettings));

    const objPickedToys: number[] = [];
    Toys.pickedToys.forEach((num) => objPickedToys.push(num));
    localStorage.setItem('korevo_pickedToys', JSON.stringify(objPickedToys));
  }

  static settingsChange() {
    Toys.#pushLocalStorage();
    Toys.#startFiltersAndSortsToys();
  }

  static #startFiltersAndSortsToys() {
    console.log('Start filters and sorts');
    let arrToys = Toys.allToys.slice();
    arrToys = Toys.sortingToys.getSortingToys(arrToys);
    arrToys = Toys.filtersRange.getFilterRange(arrToys);
    arrToys = Toys.filtersValue.getFiltersValue(arrToys);

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
    /* setInterval(() => {
      console.log(Toys.pickedToys);
    }, 2000); */

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

  static #updateCountSelectedToys(e: Event) {
    const amountToys = document.querySelector('.control__amount-toys') as HTMLDivElement;
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

    amountToys.textContent = `${Toys.pickedToys.size}`;
  }

  static #countToysExceeded(toy: HTMLDivElement) {
    if (toy.classList.contains('toy--warning')) return;

    toy.classList.add('toy--warning');
    setTimeout(() => {
      toy.classList.remove('toy--warning');
    }, 2000);
  }
}

export default Toys;
