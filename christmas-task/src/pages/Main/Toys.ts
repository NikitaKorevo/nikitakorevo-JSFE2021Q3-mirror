import './Toys.scss';
import data from '../../data/data';
import { IData } from '../../data/interfaces';
import Toy from '../../components/Toy';
import FiltersRange from '../../components/FiltersRange/FiltersRange';
import SortingToys from '../../components/SortingToys';

class Toys {
  filtersRange: FiltersRange;
  sortingToys: SortingToys;
  data: IData[];

  static numSelectedToys = 0;
  static howSortingToys = 'nameUp';
  static allToys = document.createElement('div');
  static processedToys = document.createElement('div');
  static limitToys = 20;

  constructor() {
    this.filtersRange = new FiltersRange();
    this.sortingToys = new SortingToys(Toys.getHowSortingToys);
    this.data = data;
  }

  static getHowSortingToys(checkedOption: string) {
    console.log(Toys.howSortingToys);
    Toys.howSortingToys = checkedOption;
    Toys.startFiltersAndSortsToys();
    return Toys.howSortingToys;
  }

  static startFiltersAndSortsToys() {
    console.log('Start filters and sorts');
    const copyAllToys = Toys.allToys.cloneNode(true);
    let arrToys = [];
    while (Toys.processedToys.firstChild) {
      Toys.processedToys.removeChild(Toys.processedToys.firstChild);
    }

    while (copyAllToys.firstChild) {
      arrToys.push(copyAllToys.removeChild(copyAllToys.firstChild));
    }

    arrToys = new SortingToys(Toys.getHowSortingToys).getSortingToys(arrToys, Toys.howSortingToys);

    arrToys.forEach((node) => {
      node.addEventListener('click', (e) => Toys.updateNumSelectedToys(e));
      Toys.processedToys.append(node);
    });
    return Toys.processedToys;
  }

  render() {
    const toysContainer = document.createElement('div');
    toysContainer.classList.add('toys__container');

    const settingsContainer = document.createElement('div');
    settingsContainer.classList.add('settings');
    settingsContainer.append(this.filtersRange.render(), this.sortingToys.render());

    Toys.processedToys.classList.add('toys');

    if (Toys.allToys.childNodes.length === 0) {
      for (let i = 0; i < this.data.length; i++) {
        const toy = new Toy(this.data[i]).render();
        Toys.allToys.append(toy);
        /* toy.addEventListener('click', (e) => this.updateNumSelectedToys(e)); */
      }
    }

    toysContainer.append(settingsContainer, Toys.startFiltersAndSortsToys());
    return toysContainer;
  }

  static updateNumSelectedToys(e: Event) {
    const target = e.target as HTMLElement;
    const amountToys = document.querySelector('.control__amount-toys') as HTMLDivElement;
    let count = 0;

    target.closest('.toy')?.classList.contains('toy--checked') ? count-- : count++;

    for (const toy of Toys.processedToys.children) {
      if (toy.classList.contains('toy--checked')) count++;
    }
    if (count > Toys.limitToys) return this.countToysExceeded(e);

    target.closest('.toy')?.classList.toggle('toy--checked');

    Toys.numSelectedToys = count;
    console.log(Toys.numSelectedToys);
    amountToys.textContent = `${Toys.numSelectedToys}`;
  }

  static countToysExceeded(e: Event) {
    const target = e.target as HTMLElement;
    if (target.closest('.toy')?.classList.contains('toy--warning')) return;

    target.closest('.toy')?.classList.add('toy--warning');
    setTimeout(() => {
      target.closest('.toy')?.classList.remove('toy--warning');
    }, 2000);
  }
}

export default Toys;
