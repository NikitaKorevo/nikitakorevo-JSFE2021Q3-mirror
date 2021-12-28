import './christmas-tree.scss';
import { DEFAULT_SETTINGS_CHRISTMAS_TREE } from '../../constants/constants';
import TreesSelection from '../../components/TreesSelection/TreesSelection';
import BackgroundsSelection from '../../components/BackgroundsSelection/BackgroundsSelection';
import MusicButton from '../../components/MusicButton/MusicButton';
import Snowflake from '../../components/SnowflakeButton/SnowflakeButton';
import ChristmasTreeDecorations from '../../components/ChristmasTreeDecorations/ChristmasTreeDecorations';

class ChristmasTree {
  static settingsChristmasTree = this.#pullLocalStorage('korEvo_settingsChristmasTree');
  static middleContainer = document.createElement('div');
  static christmasTreePictureContainer = document.createElement('div');
  static christmasTreePicture = document.createElement('img');
  static map = document.createElement('map');

  christmasTree: HTMLDivElement;
  musicButton: MusicButton;
  treesSelection: TreesSelection;
  backgroundsSelection: BackgroundsSelection;
  snowflake: Snowflake;
  christmasTreeDecorations: ChristmasTreeDecorations;
  area: HTMLAreaElement;

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

    ChristmasTree.christmasTreePictureContainer.classList.add('christmas-tree__christmas-tree-picture-container');

    ChristmasTree.christmasTreePicture.classList.add('christmas-tree__christmas-tree-picture');
    ChristmasTree.christmasTreePicture.src = `./assets/tree/${ChristmasTree.settingsChristmasTree.numberPickedTree}.png`;
    ChristmasTree.christmasTreePicture.useMap = '#christmas-tree__map';

    ChristmasTree.map.name = 'christmas-tree__map';
    this.area = document.createElement('area');
    this.area.shape = 'poly';
    this.area.classList.add('christmas-tree__area');
    /*  this.area.href = ''; */
    ChristmasTree.map.append(this.area);

    window.addEventListener('load', () => {
      this.changeSizeArea();
      window.addEventListener('hashchange', () => this.changeSizeArea());
    });
    window.addEventListener('resize', () => this.changeSizeArea());

    const rightContainer = document.createElement('div');
    rightContainer.classList.add('christmas-tree__right-container');

    this.christmasTree.append(leftContainer, ChristmasTree.middleContainer, rightContainer);
    leftContainer.append(
      playButtons,
      this.treesSelection.treesSelection,
      this.backgroundsSelection.backgroundsSelection
    );
    ChristmasTree.middleContainer.append(ChristmasTree.map, ChristmasTree.christmasTreePictureContainer);
    ChristmasTree.christmasTreePictureContainer.append(ChristmasTree.christmasTreePicture);
    rightContainer.append(this.christmasTreeDecorations.christmasTreeDecorations);
  }

  changeSizeArea() {
    const ChristmasTreeWidth = ChristmasTree.christmasTreePicture.getBoundingClientRect().width;
    const ChristmasTreeHeight = ChristmasTree.christmasTreePicture.getBoundingClientRect().height;

    // header christmas tree => left bottom => center bottom => right bottom
    this.area.coords = `${ChristmasTreeWidth / 2}, 0, 
    0, ${ChristmasTreeHeight * 0.9},
    ${ChristmasTreeWidth / 2}, ${ChristmasTreeHeight},
    ${ChristmasTreeWidth}, ${ChristmasTreeHeight * 0.9}`;
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
    ChristmasTree.christmasTreePicture.src = `./assets/tree/${ChristmasTree.settingsChristmasTree.numberPickedTree}.png`;
    ChristmasTree.middleContainer.style.backgroundImage = `url('./assets/bg/${ChristmasTree.settingsChristmasTree.numberPickedBackground}.jpg')`;
  }
}

export default ChristmasTree;
