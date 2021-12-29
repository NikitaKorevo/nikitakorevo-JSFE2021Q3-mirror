import './GarlandsSelection.scss';
import GarlandButton from './GarlandButton/GarlandButton';
import ChristmasTree from '../../pages/Main/ChristmasTree';

class GarlandsSelection {
  colors: string[];
  arrGarlandInstances: GarlandButton[];
  garlandsSelection: HTMLDivElement;
  arrGarlandElements: HTMLButtonElement[];
  garlandButtons: HTMLDivElement;
  arrLightBulbsContainer: HTMLDivElement[];

  constructor() {
    this.colors = ['red', 'blue', 'yellow', 'green'];
    this.arrGarlandInstances = [];
    this.arrGarlandElements = [];
    this.arrLightBulbsContainer = [];

    this.garlandsSelection = document.createElement('div');
    this.garlandsSelection.classList.add('garlands-selection');

    const title = document.createElement('h3');
    title.classList.add('garlands-selection__title');
    title.textContent = 'Гирлянда';

    this.garlandButtons = document.createElement('div');
    this.garlandButtons.classList.add('garlands-selection__garlands');

    this.colors.forEach((color) => {
      this.createGarlandButtons(color);
    });

    this.garlandsSelection.append(title, this.garlandButtons);
  }

  createGarlandButtons(color: string) {
    const garlandInstance = new GarlandButton(color);
    this.arrGarlandInstances.push(garlandInstance);

    const garlandElement = garlandInstance.garland;
    this.arrGarlandElements.push(garlandElement);

    garlandElement.addEventListener('click', () => {
      this.arrGarlandElements.forEach((garland) => {
        if (garland !== garlandElement) return garland.classList.remove('garland-button--active');
        for (const child of ChristmasTree.christmasTreePictureContainer.children) {
          if (child.classList.contains('light-bulbs-container')) {
            setTimeout(() => {
              ChristmasTree.christmasTreePictureContainer.removeChild(child);
            }, 0);
          }
        }
        this.arrLightBulbsContainer.length = 0;
        if (garlandElement.classList.contains('garland-button--active')) {
          garlandElement.classList.remove('garland-button--active');
        } else {
          garlandElement.classList.add('garland-button--active');
          this.addGarlandToChristmasTree(color);
        }
      });
    });
    this.garlandButtons.append(garlandElement);
  }

  addGarlandToChristmasTree(color: string) {
    const widthChristmasTree = ChristmasTree.christmasTreePictureContainer.getBoundingClientRect().width;
    const heightChristmasTree = ChristmasTree.christmasTreePictureContainer.getBoundingClientRect().height;

    for (let i = 0.1; i < 1; i += 0.1) {
      const lightBulbsContainer = document.createElement('div');
      this.arrLightBulbsContainer.push(lightBulbsContainer);
      let amountLightBulbs = Math.round((widthChristmasTree * i) / 15);
      if (amountLightBulbs % 2 === 0) amountLightBulbs++;
      const middleLightBulb = Math.ceil(amountLightBulbs / 2);

      lightBulbsContainer.classList.add('light-bulbs-container');
      lightBulbsContainer.style.top = heightChristmasTree * i + 'px';
      lightBulbsContainer.style.left = (widthChristmasTree - widthChristmasTree * i * 0.9) / 2 + 'px';
      lightBulbsContainer.style.width = widthChristmasTree * i * 0.9 + 'px';

      for (let j = 1; j <= amountLightBulbs; j++) {
        const lightBulbs = document.createElement('div');
        lightBulbs.classList.add('light-bulbs');
        lightBulbs.style.backgroundColor = color;
        lightBulbs.style.animationName = `blinking-${color}`;
        lightBulbs.style.animationDuration = '2s';
        lightBulbs.style.animationIterationCount = 'infinite';
        lightBulbs.style.animationDelay = Math.random() * 3 + 's';

        if (j < middleLightBulb) lightBulbs.style.marginBottom = (middleLightBulb - j) * 6 + 'px';
        if (j === middleLightBulb) lightBulbs.style.marginBottom = 4 + 'px';
        if (j > middleLightBulb) lightBulbs.style.marginBottom = (j - middleLightBulb) * 6 + 'px';
        lightBulbsContainer.append(lightBulbs);
      }

      ChristmasTree.christmasTreePictureContainer.append(lightBulbsContainer);
    }
  }
}

export default GarlandsSelection;
