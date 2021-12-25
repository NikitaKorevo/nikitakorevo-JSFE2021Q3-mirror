import './Main.scss';
import { HOME, PAGE_NOT_FOUND, TOYS, CHRISTMAS_TREE } from '../../constants/constants';
import PageNotFound from './PageNotFound';
import Home from './Home';
import Toys from './Toys';
import ChristmasTree from './ChristmasTree';

class Main {
  pageNotFound: PageNotFound;
  home: Home;
  toys: Toys;
  christmasTree: ChristmasTree;

  constructor() {
    this.pageNotFound = new PageNotFound();
    this.home = new Home();
    this.toys = new Toys();
    this.christmasTree = new ChristmasTree();
  }

  render(): HTMLDivElement {
    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('main__wrapper');

    const main = document.createElement('main');
    main.classList.add('main');

    mainWrapper.append(main);

    window.addEventListener('hashchange', () => this.switchContent(main));

    this.switchContent(main);
    return mainWrapper;
  }

  switchContent(main: HTMLElement): void {
    const pageNow = window.location.hash;

    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    switch (pageNow) {
      case HOME:
        main.append(this.home.render());
        break;

      case `#${TOYS}`:
        main.append(Toys.render());
        break;

      case `#${CHRISTMAS_TREE}`:
        main.append(this.christmasTree.christmasTree);
        break;

      default:
        location.hash = PAGE_NOT_FOUND;
        main.append(this.pageNotFound.render());
        break;
    }
  }
}

export default Main;
