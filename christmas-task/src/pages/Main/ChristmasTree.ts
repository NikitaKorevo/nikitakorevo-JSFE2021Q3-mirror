import './christmas-tree.scss';
import { DEFAULT_SETTINGS_CHRISTMAS_TREE } from '../../constants/constants';
import TreesSelection from '../../components/TreesSelection/TreesSelection';
import BackgroundsSelection from '../../components/BackgroundsSelection/BackgroundsSelection';
import MusicButton from '../../components/MusicButton/MusicButton';
import Snowflake from '../../components/SnowflakeButton/SnowflakeButton';
import ChristmasTreeDecorations from '../../components/ChristmasTreeDecorations/ChristmasTreeDecorations';

class ChristmasTree {
  static settingsChristmasTree = this.#pullLocalStorage('korEvo_settingsChristmasTree');
  /* static tree = document.createElement('div'); */
  static middleContainer = document.createElement('div');
  static christmasTreePicture = document.createElement('img');

  christmasTree: HTMLDivElement;
  musicButton: MusicButton;
  treesSelection: TreesSelection;
  backgroundsSelection: BackgroundsSelection;
  snowflake: Snowflake;
  christmasTreeDecorations: ChristmasTreeDecorations;

  constructor() {
    this.musicButton = new MusicButton();
    this.treesSelection = new TreesSelection();
    this.backgroundsSelection = new BackgroundsSelection();
    this.snowflake = new Snowflake();
    this.christmasTreeDecorations = new ChristmasTreeDecorations();

    this.christmasTree = document.createElement('div');
    this.christmasTree.classList.add('christmas-tree');
    if (ChristmasTree.settingsChristmasTree.isMusicPlaying) this.playMusicImmediately(this.musicButton);

    const leftContainer = document.createElement('div');
    leftContainer.classList.add('christmas-tree__left-container');

    const playButtons = document.createElement('div');
    playButtons.classList.add('christmas-tree__play-buttons');

    const resetButton = document.createElement('button');
    resetButton.classList.add('christmas-tree__reset-button');
    resetButton.textContent = 'Сброс настроек';
    resetButton.addEventListener('click', () => this.pressResetButton());

    playButtons.append(this.musicButton.musicButton, this.snowflake.buttonSnowFlake, resetButton);

    ChristmasTree.middleContainer.classList.add('christmas-tree__middle-container');
    ChristmasTree.middleContainer.style.backgroundImage = `url('./assets/bg/${ChristmasTree.settingsChristmasTree.numberPickedBackground}.jpg')`;

    /* ChristmasTree.tree.classList.add('christmas-tree__tree');
    ChristmasTree.tree.style.backgroundImage = `url('./assets/tree/${ChristmasTree.settingsChristmasTree.numberPickedTree}.png')`; */

    ChristmasTree.christmasTreePicture.classList.add('christmas-tree__christmas-tree-picture');
    ChristmasTree.christmasTreePicture.src = `./assets/tree/${ChristmasTree.settingsChristmasTree.numberPickedTree}.png`;
    ChristmasTree.christmasTreePicture.useMap = '#christmas-tree__map';

    const map = document.createElement('map');
    map.name = 'christmas-tree__map';
    const area = document.createElement('area');
    area.shape = 'poly';
    area.classList.add('christmas-tree__area');
    map.append(area);

    window.addEventListener('load', () => {
      const ChristmasTreeWidth = ChristmasTree.christmasTreePicture.getBoundingClientRect().width;
      const ChristmasTreeHeight = ChristmasTree.christmasTreePicture.getBoundingClientRect().height;

      area.coords = `${ChristmasTreeWidth / 2}, 0, 
      0, ${ChristmasTreeHeight}, 
      ${ChristmasTreeWidth}, ${ChristmasTreeHeight}`;
    });

    const rightContainer = document.createElement('div');
    rightContainer.classList.add('christmas-tree__right-container');

    this.christmasTree.append(leftContainer, ChristmasTree.middleContainer, rightContainer);
    leftContainer.append(
      playButtons,
      this.treesSelection.treesSelection,
      this.backgroundsSelection.backgroundsSelection
    );
    /*  ChristmasTree.middleContainer.append(ChristmasTree.tree); */
    ChristmasTree.middleContainer.append(map, ChristmasTree.christmasTreePicture);
    rightContainer.append(this.christmasTreeDecorations.christmasTreeDecorations);
  }

  pressResetButton() {
    ChristmasTree.settingsChristmasTree = JSON.parse(JSON.stringify(DEFAULT_SETTINGS_CHRISTMAS_TREE));
    ChristmasTree.#pushLocalStorage();
    location.reload();
  }

  playMusicImmediately(musicButton: MusicButton): void {
    this.christmasTree.addEventListener('click', function immediatelyPlayMusic() {
      musicButton.playOrPauseAudio();
      this.removeEventListener('click', immediatelyPlayMusic);
    });
  }

  static #pullLocalStorage(key: string) {
    const korEvo_settingsChristmasTree = localStorage.getItem('korEvo_settingsChristmasTree');

    switch (key) {
      case 'korEvo_settingsChristmasTree':
        if (korEvo_settingsChristmasTree) {
          return JSON.parse(korEvo_settingsChristmasTree);
        } else {
          localStorage.setItem('korEvo_settingsChristmasTree', JSON.stringify(DEFAULT_SETTINGS_CHRISTMAS_TREE));
          return JSON.parse(JSON.stringify(DEFAULT_SETTINGS_CHRISTMAS_TREE));
        }

      default:
        break;
    }
  }

  static #pushLocalStorage(): void {
    localStorage.setItem('korEvo_settingsChristmasTree', JSON.stringify(ChristmasTree.settingsChristmasTree));
  }

  static settingsChange(): void {
    ChristmasTree.#pushLocalStorage();
    console.log(ChristmasTree.settingsChristmasTree);
    /* ChristmasTree.tree.style.backgroundImage = `url('./assets/tree/${ChristmasTree.settingsChristmasTree.numberPickedTree}.png')`; */
    ChristmasTree.christmasTreePicture.src = `./assets/tree/${ChristmasTree.settingsChristmasTree.numberPickedTree}.png`;
    ChristmasTree.middleContainer.style.backgroundImage = `url('./assets/bg/${ChristmasTree.settingsChristmasTree.numberPickedBackground}.jpg')`;
  }
}

export default ChristmasTree;
