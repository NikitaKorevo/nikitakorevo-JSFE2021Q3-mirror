const buttonBurgerMenu = document.querySelector('.header__burger-menu');
const headerNav = document.querySelector('.header-nav');
const sectionWelcome = document.querySelector('.welcome');

const clickOutsideBurgerMenu = (e) => {
  if (buttonBurgerMenu.classList.contains('header__burger-menu--open')) {
    if (e.target.classList.contains('header__burger-menu--open')) return;
    
    if (!(e.target.classList.contains('header-nav__list') || 
      e.target.classList.contains('header-nav__item'))) {
      openCloseBurgerMenu();
    }
  }
}

const openCloseBurgerMenu = () => {
    if (buttonBurgerMenu.classList.contains('header__burger-menu')) {
      buttonBurgerMenu.classList.remove('header__burger-menu');
      buttonBurgerMenu.classList.add('header__burger-menu--open');
      headerNav.style.left = '0';
      sectionWelcome.classList.add('welcome--opacity');
    } else {
      buttonBurgerMenu.classList.remove('header__burger-menu--open');
      buttonBurgerMenu.classList.add('header__burger-menu');
      headerNav.style.left = '-110%';
      sectionWelcome.classList.remove('welcome--opacity');
    }
};

buttonBurgerMenu.addEventListener('click', () => openCloseBurgerMenu());
document.body.addEventListener('click', (e) => clickOutsideBurgerMenu(e));
