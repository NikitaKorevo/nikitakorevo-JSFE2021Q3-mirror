import './Toys.scss';
import data from '../../data/data';
import { IData } from '../../data/interfaces';
import Toy from '../../components/Toy';
import SortingToys from '../../components/SortingToys';

class Toys {
  sortingToys: SortingToys;
  data: IData[];
  allToys: HTMLDivElement;
  processedToys: HTMLDivElement;
  limitToys: number;

  static numSelectedToys = 0;
  static howSortingToys = 'nameUp';

  constructor() {
    this.sortingToys = new SortingToys(this.getHowSortingToys);
    this.data = data;
    this.allToys = document.createElement('div');
    this.processedToys = document.createElement('div');
    this.limitToys = 20;
  }

  getHowSortingToys(checkedOption: string) {
    console.log(Toys.howSortingToys);
    return (Toys.howSortingToys = checkedOption);
  }

  startFiltersAndSortsToys() {
    console.log(Toys.numSelectedToys);
    console.log('Start filters and sorts');
    const copyallToys = this.allToys.cloneNode(true);
    let arrToys = [];

    while (copyallToys.firstChild) {
      arrToys.push(copyallToys.removeChild(copyallToys.firstChild));
    }

    arrToys = this.sortingToys.getSortingToys(arrToys, Toys.howSortingToys);

    arrToys.forEach((node) => {
      this.processedToys.append(node);
    });

    console.log(this.processedToys.children);
    return this.processedToys;

    /*     console.log('Start filters and sorts');
    const copyallToys = this.allToys.cloneNode(true);
    const arrToys = [];

    while (copyallToys.firstChild) {
      arrToys.push(copyallToys.removeChild(copyallToys.firstChild));
    }

    arrToys
      .sort((nodeA, nodeB) => {
        const titleA = nodeA.firstChild?.textContent as string;
        const titleB = nodeB.firstChild?.textContent as string;
        return titleA > titleB ? 1 : -1;
      })
      .forEach((node) => {
        this.processedToys.append(node);
      });

    console.log(this.processedToys.children);
    return this.processedToys; */
  }

  render() {
    const toysContainer = document.createElement('div');
    toysContainer.classList.add('toys__container');

    const settingsContainer = document.createElement('div');
    settingsContainer.classList.add('settings');
    settingsContainer.append(this.sortingToys.render());

    this.processedToys.classList.add('toys');

    for (let i = 0; i < this.data.length; i++) {
      const toy = new Toy(this.data[i]).render();
      this.allToys.append(toy);

      toy.addEventListener('click', (e) => this.updateNumSelectedToys(e));
    }

    toysContainer.append(settingsContainer, this.startFiltersAndSortsToys());
    return toysContainer;
  }

  updateNumSelectedToys(e: Event) {
    const target = e.target as HTMLElement;
    const amountToys = document.querySelector('.control__amount-toys') as HTMLDivElement;
    let count = 0;

    target.closest('.toy')?.classList.contains('toy--checked') ? count-- : count++;

    for (const toy of this.allToys.children) {
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
