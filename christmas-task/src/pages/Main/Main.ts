import './Main.scss';
import Home from './Home';

class Main {
  home: Home;

  constructor() {
    this.home = new Home();
  }

  render() {
    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('main__wrapper');

    const main = document.createElement('div');
    main.classList.add('main');

    mainWrapper.append(main);

    const pageNow = window.location.hash;

    switch (pageNow) {
      case '':
        main.append(this.home.render());
        break;
      default:
        break;
    }

    return mainWrapper;
  }
}

export default Main;
