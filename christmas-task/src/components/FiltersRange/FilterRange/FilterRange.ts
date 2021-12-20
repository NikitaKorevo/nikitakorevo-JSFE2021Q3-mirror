import './FilterRange.scss';
import Toys from '../../../pages/Main/Toys';

class FilterRange {
  numToysSettingsFrom: string;
  numToysSettingsTo: string;
  title: string;
  rangeMin: string;
  rangeMax: string;
  rangeStep: string;
  firstRangeValue: string;
  secondRangeValue: string;

  constructor(props: { [a: string]: string }) {
    this.numToysSettingsFrom = props.numToysSettingsFrom;
    this.numToysSettingsTo = props.numToysSettingsTo;
    this.title = props.title;
    this.rangeMin = props.rangeMin;
    this.rangeMax = props.rangeMax;
    this.rangeStep = props.rangeStep;
    this.firstRangeValue = props.startFirstRangeValue;
    this.secondRangeValue = props.endSecondRangeValue;
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
    firstOutput.value = this.firstRangeValue;

    const rangeContainer = document.createElement('div');
    rangeContainer.classList.add('inputs__range-container');

    const firstRange = document.createElement('input');
    firstRange.classList.add('inputs__first-range');
    firstRange.type = 'range';
    firstRange.min = this.rangeMin;
    firstRange.max = this.rangeMax;
    firstRange.step = this.rangeStep;
    firstRange.value = this.firstRangeValue;

    const secondRange = document.createElement('input');
    secondRange.classList.add('inputs__second-range');
    secondRange.type = 'range';
    secondRange.min = this.rangeMin;
    secondRange.max = this.rangeMax;
    secondRange.step = this.rangeStep;
    secondRange.value = this.secondRangeValue;

    firstRange.addEventListener('input', () => {
      if (+firstRange.value > +secondRange.value) {
        this.secondRangeValue = firstRange.value;
        secondRange.value = firstRange.value;
      }
      this.firstRangeValue = firstRange.value;
      firstOutput.value = this.firstRangeValue;
      secondOutput.value = this.secondRangeValue;

      Toys.toysSettings[this.numToysSettingsFrom] = this.firstRangeValue;
      Toys.toysSettings[this.numToysSettingsTo] = this.secondRangeValue;
      this.changeRunnableTrack(firstRange, secondRange, rangeContainer);
      Toys.settingsChange();
    });

    secondRange.addEventListener('input', () => {
      if (+firstRange.value > +secondRange.value) {
        this.firstRangeValue = secondRange.value;
        firstRange.value = secondRange.value;
      }
      this.secondRangeValue = secondRange.value;
      firstOutput.value = this.firstRangeValue;
      secondOutput.value = this.secondRangeValue;

      Toys.toysSettings[this.numToysSettingsFrom] = this.firstRangeValue;
      Toys.toysSettings[this.numToysSettingsTo] = this.secondRangeValue;
      this.changeRunnableTrack(firstRange, secondRange, rangeContainer);
      Toys.settingsChange();
    });

    const secondOutput = document.createElement('input');
    secondOutput.classList.add('inputs__second-output');
    secondOutput.type = 'number';
    secondOutput.readOnly = true;
    secondOutput.value = this.secondRangeValue;

    filterRangeContainer.append(title, inputs);
    inputs.append(firstOutput, rangeContainer, secondOutput);
    rangeContainer.append(firstRange, secondRange);

    this.changeRunnableTrack(firstRange, secondRange, rangeContainer);

    return filterRangeContainer;
  }

  changeRunnableTrack(firstRange: HTMLInputElement, secondRange: HTMLInputElement, rangeContainer: HTMLDivElement) {
    // need to specify the width rangeContainer. Wrong value at application start.
    const rangeWidth = firstRange.clientWidth || 129;
    const countAllStep = (+this.rangeMax - +this.rangeMin) / +this.rangeStep;
    const countFirstRange = (+firstRange.value - +this.rangeMin) / +this.rangeStep;
    const countSecondRange = (+secondRange.value - +this.rangeMin) / +this.rangeStep;
    const leftLine = (rangeWidth / countAllStep) * +countFirstRange;
    const startMiddleLine = (rangeWidth / countAllStep) * +countFirstRange;
    const endMiddleLine = (rangeWidth / countAllStep) * +countSecondRange;
    const rightLine = (rangeWidth / countAllStep) * +countSecondRange;

    rangeContainer.style.background = `linear-gradient(to right, #fff ${leftLine}px, #278d9f ${startMiddleLine}px ${endMiddleLine}px, #fff ${rightLine}px)`;
  }
}

export default FilterRange;
