import './Score.scss';
import Card from '../components/Card';

let data = null;

const getData = async () => {
  const res = await fetch('../assets/json/data.json');
  const result = await res.json();
  data = result;
};
getData();

class Score {
  constructor() {
    this.numRound = localStorage.getItem('numRoundForScore');
  }

  render() {
    const main = document.querySelector('.main');
    if (main.firstChild) main.removeChild(main.firstChild);

    const div = document.createElement('div');
    div.classList.add('score');

    const answers = JSON.parse(localStorage.getItem('answers'));

    for (let i = this.numRound * 10, j = 0; i < this.numRound * 10 + 10; i += 1, j += 1) {
      const card = new Card('', i, this.numRound).render();
      const textContainer = card.querySelector('.card__text-container');
      textContainer.remove();
      if (!answers[this.numRound][j]) card.classList.add('card__img--black');
      div.append(card);
    }

    div.addEventListener('click', (e) => this.renderModal(e));
    return div;
  }

  renderModal(e) {
    const wrapper = document.querySelector('.wrapper');

    const modal = document.createElement('div');
    modal.classList.add('score__modal');
    modal.style.display = 'block';

    const content = document.createElement('div');
    content.classList.add('modal__content');

    const currentPicture = e.target.closest('.card').dataset.indexImg;
    const picture = document.createElement('img');
    picture.classList.add('modal__picture');
    picture.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${currentPicture}.jpg`;

    const namePicture = document.createElement('h5');
    namePicture.classList.add('modal__name-picture');
    namePicture.textContent = data[currentPicture].name;

    const authorPicture = document.createElement('h4');
    authorPicture.classList.add('modal__author-picture');
    authorPicture.textContent = `${data[currentPicture].author}, ${data[currentPicture].year}`;

    const buttonNext = document.createElement('button');
    buttonNext.classList.add('modal__next');
    buttonNext.textContent = 'Закрыть';

    buttonNext.addEventListener('click', () => {
      modal.style.display = 'none';
      modal.remove();
    });

    content.append(picture, namePicture, authorPicture, buttonNext);
    modal.append(content);
    wrapper.append(modal);
    return content;
  }
}

export default Score;
