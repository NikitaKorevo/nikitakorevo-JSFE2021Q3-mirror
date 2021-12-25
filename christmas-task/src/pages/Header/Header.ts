import './Header.scss';
import { HOME, TOYS, CHRISTMAS_TREE } from '../../constants/constants';
import Toys from '../Main/Toys';
import Toy from '../../components/Toy/Toy';

class Header {
  static amountToys = document.createElement('input');
  static searchValue = '';

  getSearchSort(arrToys: Toy[]): Toy[] {
    return arrToys.filter((node) => {
      let flag: boolean;
      const lowerNodeName = node.name.toLocaleLowerCase();
      const lowerSearchValue = Header.searchValue.toLowerCase();

      lowerNodeName.search(lowerSearchValue) === -1 ? (flag = false) : (flag = true);
      return flag;
    });
  }

  render(): HTMLDivElement {
    const headerWrapper = document.createElement('div');
    headerWrapper.classList.add('header__wrapper');

    const header = document.createElement('header');
    header.classList.add('header');

    const nav = document.createElement('nav');
    nav.classList.add('nav');

    const buttonLogo = document.createElement('button');
    buttonLogo.classList.add('nav__logo', 'nav__button');
    buttonLogo.dataset.goto = 'home';
    buttonLogo.addEventListener('click', () => (window.location.hash = HOME));

    const buttonToys = document.createElement('button');
    buttonToys.classList.add('nav__button');
    buttonToys.textContent = 'игрушки';
    buttonToys.dataset.goto = 'toys';
    buttonToys.addEventListener('click', () => (window.location.hash = TOYS));

    const buttonChristmasTree = document.createElement('button');
    buttonChristmasTree.classList.add('nav__button');
    buttonChristmasTree.textContent = 'ёлка';
    buttonChristmasTree.dataset.goto = 'ChristmasTree';
    buttonChristmasTree.addEventListener('click', () => (window.location.hash = CHRISTMAS_TREE));

    const control = document.createElement('nav');
    control.classList.add('control');

    const search = document.createElement('input');
    search.type = 'search';
    search.classList.add('control__search');
    search.placeholder = 'Введите название игрушки';
    search.autocomplete = 'off';
    search.autofocus = true;
    search.addEventListener('input', () => {
      Header.searchValue = search.value;
      Toys.settingsChange();
    });

    Header.amountToys.classList.add('control__amount-toys');
    Header.amountToys.type = 'number';
    Header.amountToys.readOnly = true;

    Header.amountToys.value = `${Toys.pickedToys.size}`;

    headerWrapper.append(header);
    nav.append(buttonLogo, buttonToys, buttonChristmasTree);
    control.append(search, Header.amountToys);

    window.addEventListener('hashchange', () => {
      header.append(...this.switchContent(header, nav, control));
    });
    header.append(...this.switchContent(header, nav, control));

    return headerWrapper;
  }

  switchContent(header: HTMLElement, nav: HTMLElement, control: HTMLElement): HTMLElement[] | [HTMLElement] {
    const currentPage = window.location.hash;

    while (header.firstChild) {
      header.removeChild(header.firstChild);
    }

    switch (currentPage) {
      case HOME:
        return [nav];

      case `#${TOYS}`:
        return [nav, control];

      default:
        return [nav];
    }
  }
}

export default Header;
