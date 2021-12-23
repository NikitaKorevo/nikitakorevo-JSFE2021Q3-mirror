import './Header.scss';
import TitleH1 from '../components/TitleH1';
import Settings from './Settings';
import {
  ARTISTS_QUIZ_CATEGORIES,
  ARTISTS_QUIZ_CATEGORIES_QUESTIONS,
  ARTISTS_QUIZ_SCORE,
  HOME,
  PICTURES_QUIZ_CATEGORIES,
  PICTURES_QUIZ_CATEGORIES_QUESTIONS,
  PICTURES_QUIZ_SCORE,
} from '../constants/constants';

const header = document.createElement('header');
header.classList.add('header');

class Header {
  render() {
    while (header.firstChild) {
      header.removeChild(header.firstChild);
    }

    const titleH1 = new TitleH1().render();
    titleH1.addEventListener('click', () => {
      window.location.hash = HOME;
    });

    const elSettings = document.createElement('img');
    elSettings.classList.add('settings');
    elSettings.src = './assets/svg/settings.svg';

    elSettings.addEventListener('click', () => {
      const settingsModal = document.querySelector('.settings-modal');
      if (settingsModal) {
        settingsModal.remove();
      } else {
        const main = document.querySelector('.main');
        const settings = new Settings().render();
        main.append(settings);
      }
    });

    const categories = document.createElement('img');
    categories.classList.add('categories');
    categories.src = './assets/svg/categories.svg';
    categories.addEventListener('click', () => {
      const whyCategories = window.location.hash.slice(0, window.location.hash.indexOf('/'));
      if (whyCategories === '#ArtistsQuiz') window.location.hash = ARTISTS_QUIZ_CATEGORIES;
      if (whyCategories === '#PicturesQuiz') window.location.hash = PICTURES_QUIZ_CATEGORIES;
    });

    switch (window.location.hash) {
      case HOME:
        header.append(elSettings);
        break;

      case `#${ARTISTS_QUIZ_CATEGORIES}`:
        header.append(titleH1, elSettings);
        break;

      case `#${ARTISTS_QUIZ_CATEGORIES_QUESTIONS}`:
        header.append(titleH1, categories);
        break;

      case `#${ARTISTS_QUIZ_SCORE}`:
        header.append(titleH1, categories, elSettings);
        break;

      case `#${PICTURES_QUIZ_CATEGORIES}`:
        header.append(titleH1, elSettings);
        break;

      case `#${PICTURES_QUIZ_CATEGORIES_QUESTIONS}`:
        header.append(titleH1, categories);
        break;

      case `#${PICTURES_QUIZ_SCORE}`:
        header.append(titleH1, categories, elSettings);
        break;

      default:
        header.append(titleH1, elSettings);
        break;
    }

    return header;
  }
}

window.addEventListener('hashchange', () => {
  new Header().render();
});

export default Header;
