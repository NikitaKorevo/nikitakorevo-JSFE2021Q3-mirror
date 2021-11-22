import './General.scss';
import Button from '../components/Button';
import TitleH1 from '../components/TitleH1';

class General {
  render() {
    const general = document.createElement('div');
    general.classList.add('general');

    const buttonArtist = new Button('Artist quiz').render();
    buttonArtist.classList.add('button-artist');

    const buttonPictures = new Button('Pictures quiz').render();
    buttonPictures.classList.add('button-pictures');

    const title = new TitleH1().render();
    general.append(title, buttonArtist, buttonPictures);

    buttonArtist.addEventListener('click', () => {
      window.location.hash = 'ArtistsQuiz/categories/';
      localStorage.setItem('hash', 'ArtistsQuiz/categories/');
    });
    buttonPictures.addEventListener('click', () => {
      window.location.hash = 'PicturesQuiz/categories/';
      localStorage.setItem('hash', 'PicturesQuiz/categories/');
    });
    return general;
  }
}

export default General;
