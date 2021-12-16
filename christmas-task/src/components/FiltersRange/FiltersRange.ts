import './FiltersRange.scss';
import FilterRange from './FilterRange/FilterRange';

class FiltersRange {
  static currentFirstRangeValue: string;
  static currentSecondRangeValue: string;

  render() {
    const filtersRangeContainer = document.createElement('div');
    filtersRangeContainer.classList.add('filters-range');

    const title = document.createElement('h3');
    title.classList.add('filters-range__title');
    title.textContent = 'фильтры по диапазону';

    const amountContainer = new FilterRange({
      title: 'Количество экземпляров:',
      rangeMin: '1',
      rangeMax: '12',
      rangeStep: '1',
      startFirstRangeValue: '1',
      endSecondRangeValue: '12'
    }).render();

    const purchaseYearContainer = new FilterRange({
      title: 'Год приобретения:',
      rangeMin: '1940',
      rangeMax: '2020',
      rangeStep: '10',
      startFirstRangeValue: '1940',
      endSecondRangeValue: '2020'
    }).render();

    filtersRangeContainer.append(title, amountContainer, purchaseYearContainer);
    return filtersRangeContainer;
  }
}

export default FiltersRange;

/* import './FiltersRange.scss';

class FiltersRange {
  AmountRangeMin: string;
  AmountRangeMax: string;
  AmountRangeStep: string;
  firstAmountRangeValue: string;
  secondAmountRangeValue: string;

  constructor() {
    this.AmountRangeMin = '1';
    this.AmountRangeMax = '12';
    this.AmountRangeStep = '1';
    this.firstAmountRangeValue = '1';
    this.secondAmountRangeValue = '12';
  }

  render() {
    const filtersRange = document.createElement('div');
    filtersRange.classList.add('filters-range');

    const title = document.createElement('h3');
    title.classList.add('filters-range__title');
    title.textContent = 'фильтры по диапазону';

    const amountContainer = document.createElement('div');
    amountContainer.classList.add('filters-range__amount');

    const amountTitle = document.createElement('h4');
    amountTitle.classList.add('amount__title');
    amountTitle.textContent = 'Количество экземпляров:';

    const amountInputsContainer = document.createElement('div');
    amountInputsContainer.classList.add('amount__inputs-container');

    const firstAmountOutput = document.createElement('input');
    firstAmountOutput.classList.add('amount__first-output');
    firstAmountOutput.type = 'number';
    firstAmountOutput.readOnly = true;
    firstAmountOutput.value = this.firstAmountRangeValue;

    const amountRangeContainer = document.createElement('div');
    amountRangeContainer.classList.add('amount__range-container');

    const firstAmountRange = document.createElement('input');
    firstAmountRange.classList.add('amount__first-range');
    firstAmountRange.type = 'range';
    firstAmountRange.min = this.AmountRangeMin;
    firstAmountRange.max = this.AmountRangeMax;
    firstAmountRange.step = this.AmountRangeStep;
    firstAmountRange.value = this.firstAmountRangeValue;

    const secondAmountRange = document.createElement('input');
    secondAmountRange.classList.add('amount__second-range');
    secondAmountRange.type = 'range';
    secondAmountRange.min = this.AmountRangeMin;
    secondAmountRange.max = this.AmountRangeMax;
    secondAmountRange.step = this.AmountRangeStep;
    secondAmountRange.value = this.secondAmountRangeValue;

    firstAmountRange.addEventListener('input', () => {
      if (+firstAmountRange.value > +secondAmountRange.value) {
        this.secondAmountRangeValue = firstAmountRange.value;
        secondAmountRange.value = firstAmountRange.value;
      }
      this.firstAmountRangeValue = firstAmountRange.value;
      firstAmountOutput.value = this.firstAmountRangeValue;
      secondAmountOutput.value = this.secondAmountRangeValue;

      console.log('this.firstAmountRangeValue ' + this.firstAmountRangeValue);
    });

    secondAmountRange.addEventListener('input', () => {
      if (+firstAmountRange.value > +secondAmountRange.value) {
        this.firstAmountRangeValue = secondAmountRange.value;
        firstAmountRange.value = secondAmountRange.value;
      }
      this.secondAmountRangeValue = secondAmountRange.value;
      firstAmountOutput.value = this.firstAmountRangeValue;
      secondAmountOutput.value = this.secondAmountRangeValue;

      console.log('this.secondAmountRangeValue ' + this.secondAmountRangeValue);
    });

    const secondAmountOutput = document.createElement('input');
    secondAmountOutput.classList.add('amount__second-output');
    secondAmountOutput.type = 'number';
    secondAmountOutput.readOnly = true;
    secondAmountOutput.value = this.secondAmountRangeValue;

    const purchaseYearContainer = document.createElement('div');
    purchaseYearContainer.classList.add('filters-range__purchase-date');

    const purchaseYearTitle = document.createElement('h4');
    purchaseYearTitle.classList.add('purchase-date__title');
    purchaseYearTitle.textContent = 'Год приобретения:';

    filtersRange.append(title, amountContainer, purchaseYearContainer);
    amountContainer.append(amountTitle, amountInputsContainer);
    amountInputsContainer.append(firstAmountOutput, amountRangeContainer, secondAmountOutput);
    purchaseYearContainer.append(purchaseYearTitle);
    amountRangeContainer.append(firstAmountRange, secondAmountRange);

    return filtersRange;
  }
}

export default FiltersRange;
 */
