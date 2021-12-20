import './Main.scss';
import PageNotFound from './PageNotFound';
import Home from './Home';
import Toys from './Toys';

class Main {
  pageNotFound: PageNotFound;
  home: Home;
  toys: Toys;

  constructor() {
    this.pageNotFound = new PageNotFound();
    this.home = new Home();
    this.toys = new Toys();
  }

  render() {
    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('main__wrapper');

    const main = document.createElement('div');
    main.classList.add('main');

    mainWrapper.append(main);

    window.addEventListener('hashchange', () => this.switchContent(main));

    this.switchContent(main);
    return mainWrapper;
  }

  switchContent(main: HTMLElement) {
    const pageNow = window.location.hash;

    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    switch (pageNow) {
      case '':
        main.append(this.home.render());
        break;

      case '#toys':
        main.append(Toys.render());
        break;

      default:
        main.append(this.pageNotFound.render());
        break;
    }
  }
}

export default Main;
