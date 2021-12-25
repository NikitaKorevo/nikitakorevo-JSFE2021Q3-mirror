import './christmas-tree.scss';
import { DEFAULT_SETTINGS_CHRISTMAS_TREE } from '../../constants/constants';
import TreesSelection from '../../components/TreesSelection/TreesSelection';
import BackgroundsSelection from '../../components/BackgroundsSelection/BackgroundsSelection';
import MusicButton from '../../components/MusicButton/MusicButton';

class ChristmasTree {
  static settings_christmas_tree = JSON.parse(JSON.stringify(DEFAULT_SETTINGS_CHRISTMAS_TREE));
  static tree = document.createElement('div');
  static middleContainer = document.createElement('div');

  musicButton: MusicButton;
  treesSelection: TreesSelection;
  backgroundsSelection: BackgroundsSelection;

  constructor() {
    this.musicButton = new MusicButton();
    this.treesSelection = new TreesSelection();
    this.backgroundsSelection = new BackgroundsSelection();
  }

  static settingsChange(): void {
    console.log('settingsChange');
    console.log(ChristmasTree.settings_christmas_tree);
    ChristmasTree.tree.style.backgroundImage = `url('./assets/tree/${ChristmasTree.settings_christmas_tree.numberPickedTree}.png')`;
    ChristmasTree.middleContainer.style.backgroundImage = `url('./assets/bg/${ChristmasTree.settings_christmas_tree.numberPickedBackground}.jpg')`;
  }

  render(): HTMLDivElement {
    const christmasTree = document.createElement('div');
    christmasTree.classList.add('christmas-tree');

    const leftContainer = document.createElement('div');
    leftContainer.classList.add('christmas-tree__left-container');

    const playButtons = document.createElement('div');
    playButtons.classList.add('christmas-tree__play-buttons');

    playButtons.append(this.musicButton.musicButton);

    ChristmasTree.middleContainer.classList.add('christmas-tree__middle-container');
    ChristmasTree.middleContainer.style.backgroundImage = `url('./assets/bg/${ChristmasTree.settings_christmas_tree.numberPickedBackground}.jpg')`;

    ChristmasTree.tree.classList.add('christmas-tree__tree');
    ChristmasTree.tree.style.backgroundImage = `url('./assets/tree/${ChristmasTree.settings_christmas_tree.numberPickedTree}.png')`;

    const rightContainer = document.createElement('div');
    rightContainer.classList.add('christmas-tree__right-container');

    christmasTree.append(leftContainer, ChristmasTree.middleContainer, rightContainer);
    leftContainer.append(
      playButtons,
      this.treesSelection.treesSelection,
      this.backgroundsSelection.backgroundsSelection
    );
    ChristmasTree.middleContainer.append(ChristmasTree.tree);
    rightContainer.append();
    return christmasTree;
  }
}

export default ChristmasTree;
