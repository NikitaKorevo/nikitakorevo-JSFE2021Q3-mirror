import './ChristmasTreeDecorations.scss';
import Toys from '../../pages/Main/Toys';
import Toy from '../Toy/Toy';
import toysData from '../../data/toysData';

class ChristmasTreeDecorations {
  static listToys = document.createElement('ul');

  christmasTreeDecorations: HTMLDivElement;

  constructor() {
    this.christmasTreeDecorations = document.createElement('div');
    this.christmasTreeDecorations.classList.add('christmas-tree-decorations');

    const title = document.createElement('h3');
    title.classList.add('christmas-tree-decorations__title');
    title.textContent = 'игрушки';

    ChristmasTreeDecorations.listToys;
    ChristmasTreeDecorations.listToys.classList.add('christmas-tree-decorations__list-toys');

    Toys.pickedToys.forEach((toyNumber) => {
      ChristmasTreeDecorations.addToysNearChristmasTree(toyNumber);
    });
    if (Toys.pickedToys.size === 0) ChristmasTreeDecorations.addTwentyToys();

    this.christmasTreeDecorations.append(title, ChristmasTreeDecorations.listToys);
  }

  static addToysNearChristmasTree(toyNumber: number) {
    if (Toys.pickedToys.size === 1) {
      while (ChristmasTreeDecorations.listToys.firstChild) {
        ChristmasTreeDecorations.listToys.removeChild(ChristmasTreeDecorations.listToys.firstChild);
      }
    }

    const li = document.createElement('li');
    li.classList.add('christmas-tree-decorations__toy-container');
    li.dataset.num = String(toyNumber);

    const toyInstance = new Toy(toysData[toyNumber - 1]);
    const countToy = toyInstance.count;

    const elCount = document.createElement('span');
    elCount.classList.add('christmas-tree-decorations__count');
    elCount.textContent = countToy;

    while (li.children.length < +countToy) {
      const toyPicture = document.createElement('img');
      toyPicture.classList.add('christmas-tree-decorations__toy');
      toyPicture.src = `./assets/toys/${toyNumber}.png`;
      toyPicture.dataset.num = String(toyNumber);
      li.append(toyPicture);

      toyPicture.addEventListener('mousedown', (e) => {
        const translationX = e.clientX - toyPicture.getBoundingClientRect().left;
        const translationY = e.clientY - toyPicture.getBoundingClientRect().top;

        toyPicture.style.width = '50px';
        toyPicture.style.position = 'absolute';
        toyPicture.style.zIndex = '5';

        document.body.append(toyPicture);

        relocateToyPicture(e.pageX, e.pageY);

        function relocateToyPicture(pageX: number, pageY: number) {
          toyPicture.style.left = pageX - translationX + 'px';
          toyPicture.style.top = pageY - translationY + 'px';
        }

        function currentCursorPosition(e: MouseEvent) {
          relocateToyPicture(e.pageX, e.pageY);
        }
        document.addEventListener('mousemove', currentCursorPosition);

        document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', currentCursorPosition);
          document.onmouseup = null;
        });

        toyPicture.ondragstart = () => false;
      });
    }
    ChristmasTreeDecorations.listToys.append(li);
    li.append(elCount);
  }

  static deleteToysNearChristmasTree(toyNumber: number) {
    for (const toy of ChristmasTreeDecorations.listToys.children) {
      const dataNumToy = (<HTMLLIElement>toy).dataset.num;
      if (String(toyNumber) === dataNumToy) toy.remove();
    }
    if (ChristmasTreeDecorations.listToys.children.length === 0) ChristmasTreeDecorations.addTwentyToys();
  }

  static addTwentyToys() {
    for (let i = 1; i <= 20; i++) {
      ChristmasTreeDecorations.addToysNearChristmasTree(i);
    }
  }
}

export default ChristmasTreeDecorations;
