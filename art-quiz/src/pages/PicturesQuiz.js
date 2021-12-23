import './PicturesQuiz.scss';
import TitleH2 from '../components/TitleH2';
import Card from '../components/Card';
import PicturesQuizQuestions from './PicturesQuizQuestions';
import { ANSWERS, NUMBER_ROUND_FOR_SCORE, PICTURES_QUIZ_SCORE } from '../constants/constants';

class PicturesQuiz {
  constructor() {
    this.nameSections = [
      'Portrait',
      'Landscape',
      'Still Life',
      'Graphic',
      'Antique',
      'Avant-Garde',
      'Renaissance',
      'Surrealism',
      'Kitsch',
      'Minimalism',
      'Avangard',
      'Industrial',
    ];
  }

  generateQuestions(numRound) {
    const main = document.querySelector('.main');
    main.append(new PicturesQuizQuestions(numRound).render());
  }

  render() {
    const answers = JSON.parse(localStorage.getItem(ANSWERS));

    const div = document.createElement('div');
    div.classList.add('pictures-quiz');

    const titleH2 = new TitleH2('Categories Pictures Quiz').render();

    const cards = document.createElement('div');
    cards.classList.add('cards');
    for (let i = 120, j = 0; i < 240; i += 10, j += 1) {
      const card = new Card(this.nameSections[j], i, Math.ceil(i / 10)).render();
      const numCard = i / 10;
      if (answers) {
        if (!answers[numCard]) card.classList.add('card__img--black');
      } else {
        card.classList.add('card__img--black');
      }
      cards.append(card);
    }
    div.append(titleH2, cards);

    div.addEventListener('click', (e) => {
      if (e.target.closest('.card__num-completed')) {
        const { numRound } = e.target.closest('.card').dataset;
        localStorage.setItem(NUMBER_ROUND_FOR_SCORE, numRound);
        window.location.hash = PICTURES_QUIZ_SCORE;
      }
      if (e.target.closest('.card__img')) {
        this.generateQuestions(e.target.closest('.card').dataset.numRound);
      }
    });

    return div;
  }
}

export default PicturesQuiz;
