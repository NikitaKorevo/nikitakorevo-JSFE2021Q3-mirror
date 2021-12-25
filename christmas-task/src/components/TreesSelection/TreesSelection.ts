import './TreesSelection.scss';
import { ALL_TREES_NUMBER } from '../../constants/constants';
import ChristmasTree from '../../pages/Main/ChristmasTree';
import Tree from './Tree/Tree';

class TreesSelection {
  treesSelection: HTMLDivElement;
  arrTreesNode: HTMLDivElement[];

  constructor() {
    this.arrTreesNode = [];

    this.treesSelection = document.createElement('div');
    this.treesSelection.classList.add('trees-selection');

    const title = document.createElement('h3');
    title.classList.add('trees-selection__title');
    title.textContent = 'выберите ёлку';

    const trees = document.createElement('div');
    trees.classList.add('trees-selection__trees');

    for (let i = 1; i <= ALL_TREES_NUMBER; i++) {
      const treeInstance = new Tree(i);
      const treeNode = treeInstance.tree;

      this.arrTreesNode.push(treeNode);
      trees.append(treeNode);

      treeNode.addEventListener('click', () => this.#selectTree(treeInstance, treeNode));
    }
    this.treesSelection.append(title, trees);
  }

  #selectTree(treeInstance: Tree, treeNode: HTMLDivElement) {
    ChristmasTree.settings_christmas_tree.numberPickedTree = treeInstance.numberTree;
    this.arrTreesNode.forEach((tree) => tree.classList.remove('tree--checked'));
    treeNode.classList.add('tree--checked');
    ChristmasTree.settingsChange();
  }
}
export default TreesSelection;

/* class TreesSelection {
  arrTreesNode: HTMLDivElement[];

  constructor() {
    this.arrTreesNode = [];
  }

  render(): HTMLDivElement {
    const treesSelection = document.createElement('div');
    treesSelection.classList.add('trees-selection');

    const title = document.createElement('h3');
    title.classList.add('trees-selection__title');
    title.textContent = 'выберите ёлку';

    const trees = document.createElement('div');
    trees.classList.add('trees-selection__trees');

    for (let i = 1; i <= ALL_TREES_NUMBER; i++) {
      const treeInstance = new Tree(i);
      const treeNode = treeInstance.render();

      this.arrTreesNode.push(treeNode);
      trees.append(treeNode);

      treeNode.addEventListener('click', () => {
        ChristmasTree.settings_christmas_tree.numberPickedTree = treeInstance.numberTree;
        this.arrTreesNode.forEach((tree) => tree.classList.remove('tree--checked'));
        treeNode.classList.add('tree--checked');
        ChristmasTree.settingsChange();
      });
    }
    treesSelection.append(title, trees);
    return treesSelection;
  }
}
export default TreesSelection; */
