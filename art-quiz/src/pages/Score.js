import './Score.scss';
import Card from '../components/Card';
import Button from '../components/Button';
import {
  ANSWERS,
  NUM_ROUND_FOR_SCORE,
  URL_PATH_TO_PICTURE,
  URL_PATH_TO_PICTURE_FULL,
} from '../constants/constants';

let artPicturesData = null;

const getArtPicturesData = async () => {
  const res = await fetch('./assets/json/artPicturesData.json');
  const result = await res.json();
  artPicturesData = result;
};
getArtPicturesData();

class Score {
  constructor() {
    this.numRound = localStorage.getItem(NUM_ROUND_FOR_SCORE);
  }

  render() {
    const main = document.querySelector('.main');
    if (main.firstChild) main.removeChild(main.firstChild);

    const div = document.createElement('div');
    div.classList.add('score');

    const answers = JSON.parse(localStorage.getItem(ANSWERS));

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
    picture.src = `${URL_PATH_TO_PICTURE + currentPicture}.jpg`;

    const namePicture = document.createElement('h5');
    namePicture.classList.add('modal__name-picture');
    namePicture.textContent = artPicturesData[currentPicture].name;

    const authorPicture = document.createElement('h4');
    authorPicture.classList.add('modal__author-picture');
    authorPicture.textContent = `${artPicturesData[currentPicture].author}, ${artPicturesData[currentPicture].year}`;

    const download = new Button('Download').render();
    download.classList.add('modal__download');

    const close = new Button('Close').render();
    close.classList.add('modal__close');

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('modal__buttons-container');
    buttonsContainer.append(download, close);

    download.addEventListener('click', () => {
      const link = document.createElement('a');
      link.target = '_blank';
      link.href = `${URL_PATH_TO_PICTURE_FULL + currentPicture}full.jpg`;
      link.click();
    });

    close.addEventListener('click', () => {
      modal.style.display = 'none';
      modal.remove();
    });

    content.append(picture, namePicture, authorPicture, buttonsContainer);
    modal.append(content);
    wrapper.append(modal);
    return content;
  }
}

export default Score;
