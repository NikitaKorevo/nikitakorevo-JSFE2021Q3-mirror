import './Tree.scss';

class Tree {
  numberTree: number;
  tree: HTMLDivElement;

  constructor(numberTree: number) {
    this.numberTree = numberTree;

    this.tree = document.createElement('div');
    this.tree.classList.add('tree');
    this.tree.style.backgroundImage = `url('./assets/tree/${this.numberTree}.png')`;
  }
}

export default Tree;

/* class Tree {
  numberTree: number;

  constructor(numberTree: number) {
    this.numberTree = numberTree;
  }

  render(): HTMLDivElement {
    const tree = document.createElement('div');
    tree.classList.add('tree');
    tree.style.backgroundImage = `url('./assets/tree/${this.numberTree}.png')`;
    return tree;
  }
}

export default Tree; */
