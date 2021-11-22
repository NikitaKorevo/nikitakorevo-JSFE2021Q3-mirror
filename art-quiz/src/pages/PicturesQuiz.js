import './PicturesQuiz.scss';
import TitleH2 from '../components/TitleH2';
import Card from '../components/Card';
import PicturesQuizQuestions from './PicturesQuizQuestions';

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

  generatingQuestions(numRound) {
    const main = document.querySelector('.main');
    /* if (main.firstChild) {
      main.removeChild(main.firstChild);
    } */
    main.append(new PicturesQuizQuestions(numRound).render());
    /* console.log(e.target.closest('.card').dataset.numRound); */
  }

  render() {
    const div = document.createElement('div');
    div.classList.add('pictures-quiz');

    const titleH2 = new TitleH2('Categories Pictures Quiz').render();

    const cards = document.createElement('div');
    cards.classList.add('cards');
    for (let i = 120, j = 0; i < 240; i += 10, j += 1) {
      const card = new Card(this.nameSections[j], i, Math.ceil(i / 10)).render();
      cards.append(card);
    }
    div.append(titleH2, cards);

    div.addEventListener('click', (e) => {
      if (e.target.closest('.card__num-completed')) {
        const { numRound } = e.target.closest('.card').dataset;
        localStorage.setItem('numRoundForScore', numRound);
        window.location.hash = 'ArtistsQuiz/score/';
      }
      if (e.target.closest('.card__img')) {
        this.generatingQuestions(e.target.closest('.card').dataset.numRound);
      }
    });

    return div;
  }
}

export default PicturesQuiz;
