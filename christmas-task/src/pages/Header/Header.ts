import './Header.scss';
import Toys from '../Main/Toys';
import Toy from '../../components/Toy';

class Header {
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

  render() {
    const headerWrapper = document.createElement('div');
    headerWrapper.classList.add('header__wrapper');

    const header = document.createElement('div');
    header.classList.add('header');

    const nav = document.createElement('nav');
    nav.classList.add('nav');

    const buttonLogo = document.createElement('button');
    buttonLogo.classList.add('nav__logo', 'nav__button');
    buttonLogo.dataset.goto = 'home';
    buttonLogo.addEventListener('click', () => (window.location.hash = ''));

    const buttonToys = document.createElement('button');
    buttonToys.classList.add('nav__button');
    buttonToys.textContent = 'игрушки';
    buttonToys.dataset.goto = 'toys';
    buttonToys.addEventListener('click', () => (window.location.hash = 'toys'));

    const buttonTree = document.createElement('button');
    buttonTree.classList.add('nav__button');
    buttonTree.textContent = 'ёлка';
    buttonTree.dataset.goto = 'tree';
    buttonTree.addEventListener('click', () => (window.location.hash = 'tree'));

    const control = document.createElement('nav');
    control.classList.add('control');

    const searchContainer = document.createElement('div');
    searchContainer.classList.add('control__search-container');

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

    const amountToys = document.createElement('div');
    amountToys.classList.add('control__amount-toys', 'control__button');
    amountToys.textContent = `${Toys.pickedToys.size}`;

    headerWrapper.append(header);
    nav.append(buttonLogo, buttonToys, buttonTree);
    control.append(searchContainer, amountToys);
    searchContainer.append(search);

    window.addEventListener('hashchange', () => {
      header.append(...this.switchContent(header, nav, control));
    });
    header.append(...this.switchContent(header, nav, control));
    /* header.append(nav, control); */

    return headerWrapper;
  }

  switchContent(header: HTMLElement, nav: HTMLElement, control: HTMLElement): HTMLElement[] | [HTMLElement] {
    const pageNow = window.location.hash;

    while (header.firstChild) {
      header.removeChild(header.firstChild);
    }

    switch (pageNow) {
      case '':
        return [nav];

      case '#toys':
        return [nav, control];

      default:
        return [nav];
    }
  }
}

export default Header;
