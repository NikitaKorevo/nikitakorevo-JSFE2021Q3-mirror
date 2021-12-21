import './FiltersRange.scss';
import FilterRange from './FilterRange/FilterRange';
import Toy from '../Toy/Toy';
import Toys from '../../pages/Main/Toys';
import { IToysSettings } from '../../data/interfaces';

class FiltersRange {
  numInstanceFrom: string;
  numInstanceTo: string;
  purchaseYearFrom: string;
  purchaseYearTo: string;

  constructor(props: IToysSettings) {
    this.numInstanceFrom = props.numInstanceFrom;
    this.numInstanceTo = props.numInstanceTo;
    this.purchaseYearFrom = props.purchaseYearFrom;
    this.purchaseYearTo = props.purchaseYearTo;
  }

  getFilterRange(arrToys: Toy[]): Toy[] {
    return arrToys.filter((node) => {
      if (
        +node.count >= +Toys.toysSettings.numInstanceFrom &&
        +node.count <= +Toys.toysSettings.numInstanceTo &&
        +node.year >= +Toys.toysSettings.purchaseYearFrom &&
        +node.year <= +Toys.toysSettings.purchaseYearTo
      )
        return true;
      return false;
    });
  }

  render(): HTMLDivElement {
    const filtersRangeContainer = document.createElement('div');
    filtersRangeContainer.classList.add('filters-range');

    const title = document.createElement('h3');
    title.classList.add('filters-range__title');
    title.textContent = 'фильтры по диапазону';

    const amountContainer = new FilterRange({
      numToysSettingsFrom: 'numInstanceFrom',
      numToysSettingsTo: 'numInstanceTo',
      title: 'Количество экземпляров:',
      rangeMin: '1',
      rangeMax: '12',
      rangeStep: '1',
      startFirstRangeValue: this.numInstanceFrom,
      endSecondRangeValue: this.numInstanceTo
    }).render();

    const purchaseYearContainer = new FilterRange({
      numToysSettingsFrom: 'purchaseYearFrom',
      numToysSettingsTo: 'purchaseYearTo',
      title: 'Год приобретения:',
      rangeMin: '1940',
      rangeMax: '2020',
      rangeStep: '10',
      startFirstRangeValue: this.purchaseYearFrom,
      endSecondRangeValue: this.purchaseYearTo
    }).render();

    filtersRangeContainer.append(title, amountContainer, purchaseYearContainer);
    return filtersRangeContainer;
  }
}

export default FiltersRange;
