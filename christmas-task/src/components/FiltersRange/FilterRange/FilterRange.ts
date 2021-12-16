import './FilterRange.scss';

class FilterRange {
  title: string;
  rangeMin: string;
  rangeMax: string;
  rangeStep: string;
  startFirstRangeValue: string;
  endSecondRangeValue: string;

  constructor(props: { [a: string]: string }) {
    this.title = props.title;
    this.rangeMin = props.rangeMin;
    this.rangeMax = props.rangeMax;
    this.rangeStep = props.rangeStep;
    this.startFirstRangeValue = props.startFirstRangeValue;
    this.endSecondRangeValue = props.endSecondRangeValue;
  }

  render() {
    const filterRangeContainer = document.createElement('div');
    filterRangeContainer.classList.add('filter-range');

    const title = document.createElement('h4');
    title.classList.add('filter-range__title');
    title.textContent = this.title;

    const inputs = document.createElement('div');
    inputs.classList.add('filter-range__inputs');

    const firstOutput = document.createElement('input');
    firstOutput.classList.add('inputs__first-output');
    firstOutput.type = 'number';
    firstOutput.readOnly = true;
    firstOutput.value = this.startFirstRangeValue;

    const rangeContainer = document.createElement('div');
    rangeContainer.classList.add('inputs__range-container');

    const firstRange = document.createElement('input');
    firstRange.classList.add('inputs__first-range');
    firstRange.type = 'range';
    firstRange.min = this.rangeMin;
    firstRange.max = this.rangeMax;
    firstRange.step = this.rangeStep;
    firstRange.value = this.startFirstRangeValue;

    const secondRange = document.createElement('input');
    secondRange.classList.add('inputs__second-range');
    secondRange.type = 'range';
    secondRange.min = this.rangeMin;
    secondRange.max = this.rangeMax;
    secondRange.step = this.rangeStep;
    secondRange.value = this.endSecondRangeValue;

    firstRange.addEventListener('input', () => {
      if (+firstRange.value > +secondRange.value) {
        this.endSecondRangeValue = firstRange.value;
        secondRange.value = firstRange.value;
      }
      this.startFirstRangeValue = firstRange.value;
      firstOutput.value = this.startFirstRangeValue;
      secondOutput.value = this.endSecondRangeValue;

      console.log('this.startFirstRangeValue ' + this.startFirstRangeValue);
    });

    secondRange.addEventListener('input', () => {
      if (+firstRange.value > +secondRange.value) {
        this.startFirstRangeValue = secondRange.value;
        firstRange.value = secondRange.value;
      }
      this.endSecondRangeValue = secondRange.value;
      firstOutput.value = this.startFirstRangeValue;
      secondOutput.value = this.endSecondRangeValue;

      console.log('this.endSecondRangeValue ' + this.endSecondRangeValue);
    });

    const secondOutput = document.createElement('input');
    secondOutput.classList.add('inputs__second-output');
    secondOutput.type = 'number';
    secondOutput.readOnly = true;
    secondOutput.value = this.endSecondRangeValue;

    filterRangeContainer.append(title, inputs);
    inputs.append(firstOutput, rangeContainer, secondOutput);
    rangeContainer.append(firstRange, secondRange);

    return filterRangeContainer;
  }
}

export default FilterRange;
