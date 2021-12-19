import './Toys.scss';
import toyData from '../../data/toyData';
import { IToy, IToysSettings } from '../../data/interfaces';
import Toy from '../../components/Toy';
import FiltersValue from '../../components/filtersValue/FiltersValue';
import FiltersRange from '../../components/FiltersRange/FiltersRange';
import SortingToys from '../../components/SortingToys';

class Toys {
  static numSelectedToys = 0;
  static allToys: Toy[] = [];
  static processedToys = document.createElement('div');
  static limitToys = 20;
  static toysSettings: IToysSettings = {
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
  static filtersRange = new FiltersRange();
  static sortingToys = new SortingToys();
  static filtersValue = new FiltersValue();
  static toyData = toyData;

  static settingsChange() {
    console.log(Toys.toysSettings);
    Toys.startFiltersAndSortsToys();
  }

  static startFiltersAndSortsToys() {
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
      renderNode.addEventListener('click', (e) => Toys.#updateNumSelectedToys(e));
      Toys.processedToys.append(renderNode);
    });
  }

  render() {
    /*     setInterval(() => {
      console.log(Toys.toysSettings);
    }, 1000); */
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
    Toys.startFiltersAndSortsToys();

    toysContainer.append(settingsContainer, Toys.processedToys);
    return toysContainer;
  }

  static #updateNumSelectedToys(e: Event) {
    const target = e.target as HTMLElement;
    const amountToys = document.querySelector('.control__amount-toys') as HTMLDivElement;
    let count = 0;

    target.closest('.toy')?.classList.contains('toy--checked') ? count-- : count++;

    for (const toy of Toys.processedToys.children) {
      if (toy.classList.contains('toy--checked')) count++;
    }
    if (count > Toys.limitToys) return Toys.#countToysExceeded(e);

    target.closest('.toy')?.classList.toggle('toy--checked');

    Toys.numSelectedToys = count;
    console.log(Toys.numSelectedToys);
    amountToys.textContent = `${Toys.numSelectedToys}`;
  }

  static #countToysExceeded(e: Event) {
    const target = e.target as HTMLElement;
    if (target.closest('.toy')?.classList.contains('toy--warning')) return;

    target.closest('.toy')?.classList.add('toy--warning');
    setTimeout(() => {
      target.closest('.toy')?.classList.remove('toy--warning');
    }, 2000);
  }
}

export default Toys;
