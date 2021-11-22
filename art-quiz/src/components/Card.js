import './Card.scss';

class Card {
  constructor(subTitle, indexImg, numRound) {
    this.subTitle = subTitle;
    this.indexImg = indexImg;
    this.numRound = numRound;
  }

  render() {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.numRound = this.numRound;
    div.dataset.indexImg = this.indexImg;

    const subTitle = document.createElement('h3');
    subTitle.classList.add('card__subTitle');
    subTitle.textContent = this.subTitle;

    const numCompleted = document.createElement('span');
    numCompleted.classList.add('card__num-completed');
    let answers = {};
    if (localStorage.getItem('answers')) answers = JSON.parse(localStorage.getItem('answers'));
    if (answers[this.numRound]) {
      numCompleted.textContent = `${answers[this.numRound].filter((el) => el).length} / 10`;
    }

    const textContainer = document.createElement('div');
    textContainer.classList.add('card__text-container');
    textContainer.append(subTitle, numCompleted);

    const img = document.createElement('img');
    img.classList.add('card__img');
    img.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${this.indexImg}.jpg`;

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('card__img-container');
    imgContainer.append(img);

    div.append(textContainer, imgContainer);
    return div;
  }
}

export default Card;
