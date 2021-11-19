import './Header.scss';
import TitleH1 from '../components/TitleH1';

const header = document.createElement('header');
header.classList.add('header');

class Header {
  render() {
    while (header.firstChild) {
      header.removeChild(header.firstChild);
    }
    const settings = document.createElement('img');
    settings.classList.add('settings');
    settings.src = './assets/svg/settings.svg';

    const titleH1 = new TitleH1().render();
    titleH1.addEventListener('click', () => {
      window.location.hash = '';
    });

    switch (window.location.hash) {
      case '':
        header.append(settings);
        break;

      case '#ArtistsQuiz/categories/':
        header.append(titleH1, settings);
        break;

      default:
        break;
    }

    return header;
  }
}

window.addEventListener('hashchange', () => {
  new Header().render();
});

export default Header;
