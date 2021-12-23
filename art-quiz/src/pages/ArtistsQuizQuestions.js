import './ArtistsQuizQuestions.scss';
import Button from '../components/Button';
import {
  ANSWERS,
  ARTISTS_QUIZ_CATEGORIES,
  ARTISTS_QUIZ_CATEGORIES_QUESTIONS,
  HOME,
  URL_PATH_TO_PICTURE,
  VOLUME,
} from '../constants/constants';

let artPicturesData = null;
let imageNum = [];
let currentPicture = null;
let correctAuthors = [];
const copyCorrectAuthors = [];
let incorrectAuthors = [];
let rightButtons = [];
let responsesUser = [];
let numRoundCopy = null;

const getArtPicturesData = async () => {
  const res = await fetch('./assets/json/artPicturesData.json');
  const result = await res.json();
  artPicturesData = result;
};
getArtPicturesData();

class ArtistsQuizQuestions {
  constructor(numRound) {
    this.numRound = +numRound;
  }

  getRandomNumber(max, min) {
    return Math.round(Math.random() * (max - min) + min);
  }

  makeContent() {
    imageNum = [];
    correctAuthors = [];
    incorrectAuthors = [];
    rightButtons = [];
    responsesUser = [];
    numRoundCopy = this.numRound;

    for (let index = this.numRound * 10; correctAuthors.length < 10; index += 1) {
      imageNum.push(artPicturesData[index].imageNum);
      correctAuthors.push(artPicturesData[index].author);
      copyCorrectAuthors.push(artPicturesData[index].author);
    }
    while (incorrectAuthors.length < 30) {
      const randomNumber = this.getRandomNumber(0, artPicturesData.length - 1);
      const isAuthorInCorrectAuthors = correctAuthors.includes(
        artPicturesData[randomNumber].author
      );
      const isAuthorInIncorrectAuthors = incorrectAuthors.includes(
        artPicturesData[randomNumber].author
      );
      if (!isAuthorInCorrectAuthors && !isAuthorInIncorrectAuthors) {
        incorrectAuthors.push(artPicturesData[randomNumber].author);
      }
    }
  }

  render() {
    window.location.hash = ARTISTS_QUIZ_CATEGORIES_QUESTIONS;
    const main = document.querySelector('.main');
    if (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    this.makeContent();
    const div = document.createElement('div');
    div.classList.add('artists-quiz-questions');

    const questionTitle = document.createElement('p');
    questionTitle.classList.add('artists-quiz-questions__title');
    questionTitle.textContent = 'Кто автор данной картины?';

    const ImgContainer = document.createElement('div');
    ImgContainer.classList.add('artists-quiz-questions__img-container');
    const img = document.createElement('img');
    img.classList.add('artists-quiz-questions__img');
    [currentPicture] = imageNum;
    img.src = `${URL_PATH_TO_PICTURE + imageNum.shift()}.jpg`;

    const containerForButtons1 = document.createElement('div');
    containerForButtons1.classList.add('artists-quiz-questions__buttons-container');
    const containerForButtons2 = document.createElement('div');
    containerForButtons2.classList.add('artists-quiz-questions__buttons-container');

    const randomNumberButton = this.getRandomNumber(0, 3);

    for (let i = 0; i < 4; i += 1) {
      const button = new Button('').render();
      button.classList.add('artists-quiz-questions__button');
      button.dataset.numButton = i;
      if (i === randomNumberButton) {
        rightButtons.push(i);
        button.textContent = correctAuthors.shift();
      }
      if (i !== randomNumberButton) button.textContent = incorrectAuthors.shift();
      if (i < 2) {
        containerForButtons1.append(button);
      } else {
        containerForButtons2.append(button);
      }
    }
    const navigation = document.createElement('div');
    navigation.classList.add('artists-quiz-questions__navigation');
    navigation.append(containerForButtons1, containerForButtons2);

    div.append(questionTitle, img, navigation);

    navigation.addEventListener('click', (e) => {
      if (e.target.classList.contains('artists-quiz-questions__button')) {
        const buttons = document.querySelectorAll('.artists-quiz-questions__button');
        const pressedNumButton = +e.target.dataset.numButton;

        if (pressedNumButton === rightButtons[rightButtons.length - 1]) {
          responsesUser.push(true);
          buttons[pressedNumButton].classList.add('artists-quiz-questions__button--right');

          const audio = document.createElement('audio');
          audio.src = './assets/sound/right-answer.mp3';
          audio.volume = localStorage.getItem(VOLUME);
          audio.play();
        } else {
          responsesUser.push(false);
          buttons[pressedNumButton].classList.add('artists-quiz-questions__button--wrong');

          const audio = document.createElement('audio');
          audio.src = './assets/sound/wrong-answer.mp3';
          audio.volume = localStorage.getItem(VOLUME);
          audio.play();
        }
        this.renderModal(e);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (window.location.hash === `#${ARTISTS_QUIZ_CATEGORIES_QUESTIONS}`) {
        e.preventDefault();
        const buttonNext = document.querySelector('.modal__next');
        if (buttonNext) {
          if (e.code === 'Space') {
            buttonNext.click();
          }
        }
        if (!document.querySelector('.modal__img-congratulation') && !buttonNext) {
          const buttons = navigation.querySelectorAll('.artists-quiz-questions__button');
          switch (e.code) {
            case 'KeyE':
              buttons[0].click(e);
              break;

            case 'KeyR':
              buttons[1].click(e);
              break;

            case 'KeyD':
              buttons[2].click(e);
              break;

            case 'KeyF':
              buttons[3].click(e);
              break;

            default:
              break;
          }
        }
      }
    });
    return div;
  }

  renderModal(e) {
    const wrapper = document.querySelector('.wrapper');

    const modal = document.createElement('div');
    modal.classList.add('artists-quiz-questions__modal');

    const content = document.createElement('div');
    content.classList.add('modal__content');

    const rightOrWrong = document.createElement('img');
    rightOrWrong.classList.add('modal__right-or-wrong');

    const artPicture = document.createElement('img');
    artPicture.classList.add('modal__picture');

    const nameArtPicture = document.createElement('h5');
    nameArtPicture.classList.add('modal__name-picture');

    const authorArtPicture = document.createElement('h4');
    authorArtPicture.classList.add('modal__author-picture');

    const buttonNext = new Button('Next').render();
    buttonNext.classList.add('modal__next');

    buttonNext.addEventListener('click', () => {
      modal.style.display = 'none';
      if (correctAuthors.length !== 0) {
        modal.remove();
        this.nextImg(e);
      } else {
        this.openCongratulation();
      }

      const buttons = document.querySelectorAll('.artists-quiz-questions__button');
      buttons.forEach((button, index) => {
        buttons[index].classList = 'button artists-quiz-questions__button';
      });
    });

    content.append(rightOrWrong, artPicture, nameArtPicture, authorArtPicture, buttonNext);
    modal.append(content);
    wrapper.append(modal);
    this.openModal(e);
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

    const quizResult = document.createElement('span');
    quizResult.classList.add('modal__numbers-congratulation');
    const numberCorrectAnswers = responsesUser.filter((boolean) => boolean).length;
    const numberAnswers = responsesUser.length;
    quizResult.textContent = `${numberCorrectAnswers}/${numberAnswers}`;

    const buttonHome = new Button('Home').render();
    buttonHome.classList.add('modal__button-home');

    const buttonNextQuiz = new Button('Next Quiz').render();
    buttonNextQuiz.classList.add('modal__button-next-quiz');

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('modal__buttons-container');
    buttonsContainer.append(buttonHome, buttonNextQuiz);

    content.append(imgCongratulation, textCongratulation, quizResult, buttonsContainer);
    const modalCongratulation = document.querySelector('.artists-quiz-questions__modal');
    modalCongratulation.style.display = 'block';

    buttonHome.addEventListener('click', () => {
      modalCongratulation.style.display = 'none';
      window.location.hash = HOME;
      modalCongratulation.remove();
    });

    buttonNextQuiz.addEventListener('click', () => {
      modalCongratulation.style.display = 'none';
      window.location.hash = ARTISTS_QUIZ_CATEGORIES;
      modalCongratulation.remove();
    });
  }

  openModal() {
    const rightOrWrong = document.querySelector('.modal__right-or-wrong');
    if (responsesUser[responsesUser.length - 1]) {
      rightOrWrong.src = './assets/svg/right.svg';
    } else {
      rightOrWrong.src = './assets/svg/wrong.svg';
    }

    const picture = document.querySelector('.modal__picture');
    picture.src = `${URL_PATH_TO_PICTURE + currentPicture}.jpg`;

    const namePicture = document.querySelector('.modal__name-picture');
    namePicture.textContent = artPicturesData[currentPicture].name;

    const authorPicture = document.querySelector('.modal__author-picture');
    authorPicture.textContent = `${artPicturesData[currentPicture].author}, ${artPicturesData[currentPicture].year}`;

    const modal = document.querySelector('.artists-quiz-questions__modal');
    modal.style.display = 'block';
  }

  nextImg() {
    [currentPicture] = imageNum;
    const nextArtPicture = document.querySelector('.artists-quiz-questions__img');
    nextArtPicture.src = `${URL_PATH_TO_PICTURE + imageNum.shift()}.jpg`;
    const buttons = document.querySelectorAll('.artists-quiz-questions__button');

    const randomNumButton = this.getRandomNumber(0, 3);
    buttons.forEach((button, index) => {
      if (index === randomNumButton) {
        buttons[index].textContent = correctAuthors.shift();
        rightButtons.push(index);
      } else {
        buttons[index].textContent = incorrectAuthors.shift();
      }
    });
  }

  saveAnswersInLocalStorage() {
    let answers = {};
    if (localStorage.getItem(ANSWERS)) answers = JSON.parse(localStorage.getItem(ANSWERS));
    answers[numRoundCopy] = responsesUser;
    localStorage.setItem(ANSWERS, JSON.stringify(answers));
  }
}

export default ArtistsQuizQuestions;
