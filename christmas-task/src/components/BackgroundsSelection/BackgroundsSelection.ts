import './BackgroundsSelection.scss';
import { ALL_BACKGROUND_NUMBER } from '../../constants/constants';
import ChristmasTree from '../../pages/Main/ChristmasTree';
import Background from './Background/Background';

class BackgroundsSelection {
  arrBackgroundsNode: HTMLDivElement[];
  backgroundsSelection: HTMLDivElement;

  constructor() {
    this.arrBackgroundsNode = [];

    this.backgroundsSelection = document.createElement('div');
    this.backgroundsSelection.classList.add('backgrounds-selection');

    const title = document.createElement('h3');
    title.classList.add('backgrounds-selection__title');
    title.textContent = 'выберите фон';

    const backgrounds = document.createElement('div');
    backgrounds.classList.add('backgrounds-selection__backgrounds');

    for (let i = 1; i <= ALL_BACKGROUND_NUMBER; i++) {
      const backgroundInstance = new Background(i);
      const backgroundNode = backgroundInstance.background;

      if (ChristmasTree.settingsChristmasTree.numberPickedBackground === i) {
        backgroundNode.classList.add('background--checked');
      }
      this.arrBackgroundsNode.push(backgroundNode);
      backgrounds.append(backgroundNode);

      this.#selectBackground(backgroundInstance, backgroundNode);
    }
    this.backgroundsSelection.append(title, backgrounds);
  }

  #selectBackground(backgroundInstance: Background, backgroundNode: HTMLDivElement): void {
    backgroundNode.addEventListener('click', () => {
      ChristmasTree.settingsChristmasTree.numberPickedBackground = backgroundInstance.numberBackground;
      this.arrBackgroundsNode.forEach((background) => background.classList.remove('background--checked'));
      backgroundNode.classList.add('background--checked');
      ChristmasTree.settingsChange();
    });
  }
}

export default BackgroundsSelection;
