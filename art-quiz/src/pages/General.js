import './General.scss';
import Button from '../components/Button';
import TitleH1 from '../components/TitleH1';
import { ARTISTS_QUIZ_CATEGORIES, HASH, PICTURES_QUIZ_CATEGORIES } from '../constants/constants';

class General {
  render() {
    const general = document.createElement('div');
    general.classList.add('general');

    const buttonArtist = new Button('Artists quiz').render();
    buttonArtist.classList.add('button-artist');

    const buttonPictures = new Button('Pictures quiz').render();
    buttonPictures.classList.add('button-pictures');

    const title = new TitleH1().render();
    general.append(title, buttonArtist, buttonPictures);

    buttonArtist.addEventListener('click', () => {
      window.location.hash = ARTISTS_QUIZ_CATEGORIES;
      localStorage.setItem(HASH, ARTISTS_QUIZ_CATEGORIES);
    });
    buttonPictures.addEventListener('click', () => {
      window.location.hash = PICTURES_QUIZ_CATEGORIES;
      localStorage.setItem(HASH, PICTURES_QUIZ_CATEGORIES);
    });
    return general;
  }
}

export default General;
