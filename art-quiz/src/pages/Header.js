import './Header.scss';
import TitleH1 from '../components/TitleH1';
import Settings from './Settings';

const header = document.createElement('header');
header.classList.add('header');

class Header {
  render() {
    while (header.firstChild) {
      header.removeChild(header.firstChild);
    }

    const titleH1 = new TitleH1().render();
    titleH1.addEventListener('click', () => {
      window.location.hash = '';
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
      if (whyCategories === '#ArtistsQuiz') window.location.hash = 'ArtistsQuiz/categories/';
      if (whyCategories === '#PicturesQuiz') window.location.hash = 'PicturesQuiz/categories/';
    });

    switch (window.location.hash) {
      case '':
        header.append(elSettings);
        break;

      case '#ArtistsQuiz/categories/':
        header.append(titleH1, elSettings);
        break;

      case '#ArtistsQuiz/categories/questions/':
        header.append(titleH1, categories, elSettings);
        break;

      case '#ArtistsQuiz/score/':
        header.append(titleH1, categories, elSettings);
        break;

      case '#PicturesQuiz/categories/':
        header.append(titleH1, elSettings);
        break;

      case '#PicturesQuiz/categories/questions/':
        header.append(titleH1, categories, elSettings);
        break;

      case '#PicturesQuiz/score/':
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
