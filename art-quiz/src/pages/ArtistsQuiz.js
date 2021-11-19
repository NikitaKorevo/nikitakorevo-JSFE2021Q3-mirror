import './ArtistsQuiz.scss';
import TitleH2 from '../components/TitleH2';
import Card from '../components/Card';
import ArtistsQuizQuestions from './ArtistsQuizQuestions';

class ArtistsQuiz {
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
    main.append(new ArtistsQuizQuestions(numRound).render());
    /* console.log(e.target.closest('.card').dataset.numRound); */
  }

  render() {
    const div = document.createElement('div');
    div.classList.add('artists-quiz');

    const titleH2 = new TitleH2('Categories Artists Quiz').render();

    const cards = document.createElement('div');
    cards.classList.add('cards');
    for (let i = 0; i < 120; i += 10) {
      const card = new Card(this.nameSections[Math.ceil(i / 10)], i, Math.ceil(i / 10)).render();
      cards.append(card);
    }
    div.append(titleH2, cards);

    div.addEventListener('click', (e) => {
      if (e.target.closest('.card')) {
        this.generatingQuestions(e.target.closest('.card').dataset.numRound);
      }
    });

    return div;
  }
}

export default ArtistsQuiz;
