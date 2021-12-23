import './Routing.scss';
import General from './General';
import ArtistsQuiz from './ArtistsQuiz';
import Score from './Score';
import PicturesQuiz from './PicturesQuiz';
import {
  ARTISTS_QUIZ_CATEGORIES,
  ARTISTS_QUIZ_CATEGORIES_QUESTIONS,
  ARTISTS_QUIZ_SCORE,
  HOME,
  PICTURES_QUIZ_CATEGORIES,
  PICTURES_QUIZ_CATEGORIES_QUESTIONS,
  PICTURES_QUIZ_SCORE,
} from '../constants/constants';

const main = document.createElement('main');
main.classList.add('main');

class Routing {
  render() {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    const general = new General();
    const artistsQuiz = new ArtistsQuiz();
    const score = new Score();
    const picturesQuiz = new PicturesQuiz();

    switch (window.location.hash) {
      case HOME:
        main.append(general.render());
        break;
      case `#${ARTISTS_QUIZ_CATEGORIES}`:
        main.append(artistsQuiz.render());
        break;

      case `#${ARTISTS_QUIZ_SCORE}`:
        setTimeout(() => {
          main.append(score.render());
        }, 0);
        break;

      case `#${PICTURES_QUIZ_CATEGORIES}`:
        main.append(picturesQuiz.render());
        break;

      case `#${PICTURES_QUIZ_SCORE}`:
        setTimeout(() => {
          main.append(score.render());
        }, 0);
        break;

      default:
        window.location.hash = HOME;
        break;
    }
    return main;
  }
}

window.addEventListener('hashchange', () => {
  if (window.location.hash === `#${ARTISTS_QUIZ_CATEGORIES_QUESTIONS}`) return;
  if (window.location.hash === `#${PICTURES_QUIZ_CATEGORIES_QUESTIONS}`) return;
  new Routing().render();
});

export default Routing;
