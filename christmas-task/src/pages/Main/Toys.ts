import './Toys.scss';
import data from '../../data/data';
import { IData } from '../../data/interfaces';
import Toy from '../../components/Toy';
import SortingToys from '../../components/SortingToys';

class Toys {
  sortingToys: SortingToys;
  data: IData[];
  /* allToys: HTMLDivElement; */
  /* processedToys: HTMLDivElement; */
  limitToys: number;

  static numSelectedToys = 0;
  static howSortingToys = 'nameUp';
  static allToys = document.createElement('div');
  static processedToys = document.createElement('div');

  constructor() {
    this.sortingToys = new SortingToys(Toys.getHowSortingToys);
    this.data = data;
    /* this.allToys = document.createElement('div'); */
    /* this.processedToys = document.createElement('div'); */
    this.limitToys = 20;
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
      Toys.processedToys.append(node);
    });
    return Toys.processedToys;
  }

  render() {
    const toysContainer = document.createElement('div');
    toysContainer.classList.add('toys__container');

    const settingsContainer = document.createElement('div');
    settingsContainer.classList.add('settings');
    settingsContainer.append(this.sortingToys.render());

    Toys.processedToys.classList.add('toys');

    for (let i = 0; i < this.data.length; i++) {
      const toy = new Toy(this.data[i]).render();
      Toys.allToys.append(toy);

      toy.addEventListener('click', (e) => this.updateNumSelectedToys(e));
    }

    toysContainer.append(settingsContainer, Toys.startFiltersAndSortsToys());
    return toysContainer;
  }

  updateNumSelectedToys(e: Event) {
    const target = e.target as HTMLElement;
    const amountToys = document.querySelector('.control__amount-toys') as HTMLDivElement;
    let count = 0;

    target.closest('.toy')?.classList.contains('toy--checked') ? count-- : count++;

    for (const toy of Toys.allToys.children) {
      if (toy.classList.contains('toy--checked')) count++;
    }
    if (count > this.limitToys) return this.countToysExceeded(e);

    target.closest('.toy')?.classList.toggle('toy--checked');

    Toys.numSelectedToys = count;
    amountToys.textContent = `${Toys.numSelectedToys}`;
  }

  countToysExceeded(e: Event) {
    const target = e.target as HTMLElement;
    if (target.closest('.toy')?.classList.contains('toy--warning')) return;

    target.closest('.toy')?.classList.add('toy--warning');
    setTimeout(() => {
      target.closest('.toy')?.classList.remove('toy--warning');
    }, 2000);
  }
}

export default Toys;
