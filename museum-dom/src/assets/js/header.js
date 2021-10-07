const mediaQuery = window.matchMedia('(max-width: 420px)');
const headerBackgroundImg1 = document.querySelector('.header__background-img1');
const headerBackgroundImg2 = document.querySelector('.header__background-img2');
const headerBackgroundImg3 = document.querySelector('.header__background-img3');
const buttonBurgerMenu = document.querySelector('.header__burger-menu');
const headerNav = document.querySelector('.header-nav');
const headerBackground = document.querySelector('.header__container-background');
const sectionWelcome = document.querySelector('.welcome');

if (mediaQuery.matches) {
  headerBackgroundImg1.setAttribute('src', './assets/img/design/header__1-420.jpg');
  headerBackgroundImg2.setAttribute('src', './assets/img/design/header__2-420.jpg');
  headerBackgroundImg3.setAttribute('src', './assets/img/design/header__3-420.jpg');
}

mediaQuery.addEventListener('change', (e) => {
  if (mediaQuery.matches) {
    headerBackgroundImg1.setAttribute('src', './assets/img/design/header__1-420.jpg');
    headerBackgroundImg2.setAttribute('src', './assets/img/design/header__2-420.jpg');
    headerBackgroundImg3.setAttribute('src', './assets/img/design/header__3-420.jpg');
  } else {
    headerBackgroundImg1.setAttribute('src', './assets/img/design/header__1-768.jpg');
    headerBackgroundImg2.setAttribute('src', './assets/img/design/header__2-768.jpg');
    headerBackgroundImg3.setAttribute('src', './assets/img/design/header__3-768.jpg');
  }
});

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

      headerBackground.style.left = '-20px';
      
      sectionWelcome.classList.add('welcome--opacity');
    } else {
      buttonBurgerMenu.classList.remove('header__burger-menu--open');
      buttonBurgerMenu.classList.add('header__burger-menu');
      headerNav.style.left = '-150%';

      headerBackground.style.left = '-150%';

      sectionWelcome.classList.remove('welcome--opacity');
    }
};

buttonBurgerMenu.addEventListener('click', () => openCloseBurgerMenu());
document.body.addEventListener('click', (e) => clickOutsideBurgerMenu(e));
