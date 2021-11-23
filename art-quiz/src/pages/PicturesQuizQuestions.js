import './PicturesQuizQuestions.scss';

let data = null;
let imageNum = [];
let currentPicture = null;
let correctAuthors = [];
const copyCorrectAuthors = [];
let incorrectAuthors = [];
const incorrectPictures = [];
let rightButtons = [];
let responsesUser = [];

const getData = async () => {
  const res = await fetch('./assets/json/data.json');
  const result = await res.json();
  data = result;
  console.log(data);
};
getData();

class PicturesQuizQuestions {
  constructor(numRound) {
    this.numRound = +numRound;
    console.log(numRound);
  }

  randomNum(max, min) {
    return Math.round(Math.random() * (max - min) + min);
  }

  makeContent() {
    imageNum = [];
    correctAuthors = [];
    incorrectAuthors = [];
    rightButtons = [];
    responsesUser = [];

    for (let index = this.numRound * 10; correctAuthors.length < 10; index += 1) {
      /* console.log(`index ${index}`); */
      imageNum.push(data[index].imageNum);
      correctAuthors.push(data[index].author);
      copyCorrectAuthors.push(data[index].author);
    }
    console.log(correctAuthors);
    while (incorrectAuthors.length < 30) {
      const randomNum = this.randomNum(0, data.length - 1);
      const isAuthorInCorrectAuthors = correctAuthors.includes(data[randomNum].author);
      const isAuthorInIncorrectAuthors = incorrectAuthors.includes(data[randomNum].author);

      if (!isAuthorInCorrectAuthors && !isAuthorInIncorrectAuthors) {
        incorrectAuthors.push(data[randomNum].author);
        incorrectPictures.push(randomNum);
      }
    }
  }

  render() {
    window.location.hash = 'PicturesQuiz/categories/questions/';
    const main = document.querySelector('.main');
    if (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    this.makeContent();
    const div = document.createElement('div');
    div.classList.add('pictures-quiz-questions');

    const questionTitle = document.createElement('p');
    questionTitle.classList.add('pictures-quiz-questions__title');
    questionTitle.textContent = `Какую картину написал ${correctAuthors.shift()}?`;

    /* const ImgContainer = document.createElement('div');
    ImgContainer.classList.add('artists-quiz-questions__img-container');
    const img = document.createElement('img');
    img.classList.add('artists-quiz-questions__img'); */
    [currentPicture] = imageNum; /*  */
    /* console.log(`currentPicture ${currentPicture}`); */ /*  */
    /* img.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${imageNum.shift()}.jpg`; */
    /* img.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/full/${imageNum.shift()}full.jpg`; */

    const containerForButtons1 = document.createElement('div');
    containerForButtons1.classList.add('pictures-quiz-questions__buttons-container');
    const containerForButtons2 = document.createElement('div');
    containerForButtons2.classList.add('pictures-quiz-questions__buttons-container');

    const randomNumButton = this.randomNum(0, 3);
    console.log(`randomNumButton ${randomNumButton}`);
    for (let i = 0; i < 4; i += 1) {
      const ImgContainer = document.createElement('div');
      ImgContainer.classList.add('pictures-quiz-questions__img-container');

      const buttonImg = document.createElement('img');
      buttonImg.classList.add('pictures-quiz-questions__button');
      ImgContainer.append(buttonImg);

      buttonImg.dataset.numButton = i;
      if (i === randomNumButton) {
        rightButtons.push(i);
        correctAuthors.shift();
        buttonImg.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${imageNum.shift()}.jpg`;
      }
      if (i !== randomNumButton) {
        incorrectAuthors.shift();
        buttonImg.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${incorrectPictures.shift()}.jpg`;
      }
      if (i < 2) {
        containerForButtons1.append(ImgContainer);
      } else {
        containerForButtons2.append(ImgContainer);
      }
    }
    const navigation = document.createElement('div');
    navigation.classList.add('pictures-quiz-questions__navigation');
    navigation.append(containerForButtons1, containerForButtons2);

    div.append(questionTitle, navigation);

    /* this.renderModal(); */

    navigation.addEventListener('click', (e) => {
      if (e.target.classList.contains('pictures-quiz-questions__button')) {
        this.renderModal(e); /* добавил */
        /* this.openModal(e); */
      }
    });
    return div;
  }

  renderModal(e) {
    const wrapper = document.querySelector('.wrapper');

    const modal = document.createElement('div');
    modal.classList.add('pictures-quiz-questions__modal');

    const content = document.createElement('div');
    content.classList.add('modal__content');

    const rightOrWrong = document.createElement('img');
    rightOrWrong.classList.add('modal__right-or-wrong');

    const picture = document.createElement('img');
    picture.classList.add('modal__picture');

    const namePicture = document.createElement('h5');
    namePicture.classList.add('modal__name-picture');

    const authorPicture = document.createElement('h4');
    authorPicture.classList.add('modal__author-picture');

    const buttonNext = document.createElement('button');
    buttonNext.classList.add('modal__next');
    buttonNext.textContent = 'Next';

    buttonNext.addEventListener('click', () => {
      modal.style.display = 'none';
      if (responsesUser.length < 10) {
        modal.remove(); /* add */
        this.nextImg(e);
      } else {
        /* console.log(`correctAuthors.length ${correctAuthors}`);
        console.log(correctAuthors); */
        this.openCongratulation();
      }
    });

    content.append(rightOrWrong, picture, namePicture, authorPicture, buttonNext);
    modal.append(content);
    wrapper.append(modal);
    this.openModal(e); /*  */
    return content;
  }

  openCongratulation() {
    this.saveAnswersInLocalStorage();

    const content = document.querySelector('.modal__content');
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }

    const imgCongratulation = document.createElement('img');
    imgCongratulation.classList.add('modal__img-congratulation');
    imgCongratulation.src = './assets/svg/grandresult.svg';

    const textCongratulation = document.createElement('h6');
    textCongratulation.classList.add('modal__text-congratulation');
    textCongratulation.textContent = 'Congratulations!';

    const numbers = document.createElement('span');
    numbers.classList.add('modal__numbers-congratulation');
    numbers.textContent = `
    ${responsesUser.filter((boolean) => boolean).length}/${responsesUser.length}
    `;

    const buttonHome = document.createElement('button');
    buttonHome.classList.add('.modal__button-home');
    buttonHome.textContent = 'Home';

    const buttonNextQuiz = document.createElement('button');
    buttonNextQuiz.classList.add('.modal__button-next-quiz');
    buttonNextQuiz.textContent = 'Next Quiz';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('.modal__buttons-container');
    buttonsContainer.append(buttonHome, buttonNextQuiz);

    content.append(imgCongratulation, textCongratulation, numbers, buttonsContainer);
    const modal = document.querySelector('.pictures-quiz-questions__modal');
    modal.style.display = 'block';

    buttonHome.addEventListener('click', () => {
      modal.style.display = 'none';
      window.location.hash = '';
      modal.remove();
    });

    buttonNextQuiz.addEventListener('click', () => {
      modal.style.display = 'none';
      window.location.hash = 'PicturesQuiz/categories/';
      modal.remove();
    });
  }

  openModal(e) {
    if (+e.target.dataset.numButton === rightButtons[rightButtons.length - 1]) {
      responsesUser.push(true);
    } else {
      responsesUser.push(false);
    }
    console.log(responsesUser);

    const rightOrWrong = document.querySelector('.modal__right-or-wrong');
    if (responsesUser[responsesUser.length - 1]) {
      rightOrWrong.src = './assets/svg/right.svg';
    } else {
      rightOrWrong.src = './assets/svg/wrong.svg';
    }

    const picture = document.querySelector('.modal__picture');
    picture.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${currentPicture}.jpg`;

    const namePicture = document.querySelector('.modal__name-picture');
    namePicture.textContent = data[currentPicture].name;

    const authorPicture = document.querySelector('.modal__author-picture');
    authorPicture.textContent = `${data[currentPicture].author}, ${data[currentPicture].year}`;

    const modal = document.querySelector('.pictures-quiz-questions__modal');
    modal.style.display = 'block';
  }

  nextImg() {
    currentPicture = `${imageNum[0]}`; /*  */
    /* const img = document.querySelector('.artists-quiz-questions__img'); */
    /* img.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${imageNum.shift()}.jpg`; */
    /* img.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/full/${imageNum.shift()}full.jpg`; */
    const questionTitle = document.querySelector('.pictures-quiz-questions__title');
    questionTitle.textContent = `Какую картину написал ${data[currentPicture].author}?`;
    const buttons = document.querySelectorAll('.pictures-quiz-questions__button');
    const randomNumButton = this.randomNum(0, 3);
    buttons.forEach((button, index) => {
      if (index === randomNumButton) {
        correctAuthors.shift();
        rightButtons.push(index);
        buttons[
          index
        ].src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${imageNum.shift()}.jpg`;
      } else {
        incorrectAuthors.shift();
        buttons[
          index
        ].src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${incorrectPictures.shift()}.jpg`;
      }
    });
    console.log(rightButtons);
  }

  saveAnswersInLocalStorage() {
    let answers = {};
    if (localStorage.getItem('answers')) answers = JSON.parse(localStorage.getItem('answers'));
    answers[this.numRound] = responsesUser;
    localStorage.setItem('answers', JSON.stringify(answers));
  }
}

export default PicturesQuizQuestions;
