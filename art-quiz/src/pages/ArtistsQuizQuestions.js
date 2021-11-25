import Button from '../components/Button';
import './ArtistsQuizQuestions.scss';

let data = null;
let imageNum = [];
let currentPicture = null;
let correctAuthors = [];
const copyCorrectAuthors = [];
let incorrectAuthors = [];
let rightButtons = [];
let responsesUser = [];
let numRoundCopy = null;

const getData = async () => {
  const res = await fetch('./assets/json/data.json');
  const result = await res.json();
  data = result;
};
getData();

class ArtistsQuizQuestions {
  constructor(numRound) {
    this.numRound = +numRound;
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
    numRoundCopy = this.numRound;

    for (let index = this.numRound * 10; correctAuthors.length < 10; index += 1) {
      imageNum.push(data[index].imageNum);
      correctAuthors.push(data[index].author);
      copyCorrectAuthors.push(data[index].author);
    }
    while (incorrectAuthors.length < 30) {
      const randomNum = this.randomNum(0, data.length - 1);
      const isAuthorInCorrectAuthors = correctAuthors.includes(data[randomNum].author);
      const isAuthorInIncorrectAuthors = incorrectAuthors.includes(data[randomNum].author);

      if (!isAuthorInCorrectAuthors && !isAuthorInIncorrectAuthors) {
        incorrectAuthors.push(data[randomNum].author);
      }
    }
  }

  render() {
    window.location.hash = 'ArtistsQuiz/categories/questions/';
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
    [currentPicture] = imageNum; /*  */
    console.log(`currentPicture ${currentPicture}`); /*  */
    img.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${imageNum.shift()}.jpg`;
    /* img.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/full/${imageNum.shift()}full.jpg`; */

    const containerForButtons1 = document.createElement('div');
    containerForButtons1.classList.add('artists-quiz-questions__buttons-container');
    const containerForButtons2 = document.createElement('div');
    containerForButtons2.classList.add('artists-quiz-questions__buttons-container');

    const randomNumButton = this.randomNum(0, 3);
    console.log(`randomNumButton ${randomNumButton}`);
    for (let i = 0; i < 4; i += 1) {
      const button = new Button('').render();
      button.classList.add('artists-quiz-questions__button');
      button.dataset.numButton = i;
      if (i === randomNumButton) {
        rightButtons.push(i);
        button.textContent = correctAuthors.shift();
      }
      if (i !== randomNumButton) button.textContent = incorrectAuthors.shift();
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

    /* this.renderModal(); */

    navigation.addEventListener('click', (e) => {
      if (e.target.classList.contains('artists-quiz-questions__button')) {
        const buttons = document.querySelectorAll('.artists-quiz-questions__button');
        const pressedNumButton = +e.target.dataset.numButton;

        if (pressedNumButton === rightButtons[rightButtons.length - 1]) {
          responsesUser.push(true);
          buttons[pressedNumButton].classList.add('artists-quiz-questions__button--right');

          const audio = document.createElement('audio');
          audio.src = './assets/sound/right-answer.mp3';
          audio.volume = localStorage.getItem('volume');
          audio.play();
        } else {
          responsesUser.push(false);
          buttons[pressedNumButton].classList.add('artists-quiz-questions__button--wrong');

          const audio = document.createElement('audio');
          audio.src = './assets/sound/wrong-answer.mp3';
          audio.volume = localStorage.getItem('volume');
          audio.play();
        }
        this.renderModal(e);
      }
      console.log(responsesUser);
    });

    document.addEventListener('keydown', (e) => {
      if (window.location.hash === '#ArtistsQuiz/categories/questions/') {
        e.preventDefault();
        const buttonNext = document.querySelector('.modal__next');
        if (buttonNext) {
          if (e.code === 'Space') {
            buttonNext.click();
          }
        }
        if (!document.querySelector('.modal__img-congratulation') && !buttonNext) {
          const buttons = navigation.querySelectorAll('.artists-quiz-questions__button');
          if (e.code === 'KeyE') buttons[0].click(e);
          if (e.code === 'KeyR') buttons[1].click(e);
          if (e.code === 'KeyD') buttons[2].click(e);
          if (e.code === 'KeyF') buttons[3].click(e);
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

    const picture = document.createElement('img');
    picture.classList.add('modal__picture');

    const namePicture = document.createElement('h5');
    namePicture.classList.add('modal__name-picture');

    const authorPicture = document.createElement('h4');
    authorPicture.classList.add('modal__author-picture');

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

    const buttonHome = new Button('Home').render();
    buttonHome.classList.add('modal__button-home');
    /* buttonHome.textContent = 'Home'; */

    const buttonNextQuiz = new Button('Next Quiz').render();
    buttonNextQuiz.classList.add('modal__button-next-quiz');
    /* buttonNextQuiz.textContent = 'Next Quiz'; */

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('modal__buttons-container');
    buttonsContainer.append(buttonHome, buttonNextQuiz);

    content.append(imgCongratulation, textCongratulation, numbers, buttonsContainer);
    const modal = document.querySelector('.artists-quiz-questions__modal');
    modal.style.display = 'block';

    buttonHome.addEventListener('click', () => {
      modal.style.display = 'none';
      window.location.hash = '';
      modal.remove();
    });

    buttonNextQuiz.addEventListener('click', () => {
      modal.style.display = 'none';
      window.location.hash = 'ArtistsQuiz/categories/';
      modal.remove();
    });
  }

  openModal() {
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

    const modal = document.querySelector('.artists-quiz-questions__modal');
    modal.style.display = 'block';
  }

  nextImg() {
    [currentPicture] = imageNum; /*  */
    console.log(`currentPicture ${currentPicture}`); /*  */
    const img = document.querySelector('.artists-quiz-questions__img');
    img.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${imageNum.shift()}.jpg`;
    /* img.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/full/${imageNum.shift()}full.jpg`; */
    const buttons = document.querySelectorAll('.artists-quiz-questions__button');

    const randomNumButton = this.randomNum(0, 3);
    buttons.forEach((button, index) => {
      if (index === randomNumButton) {
        buttons[index].textContent = correctAuthors.shift();
        rightButtons.push(index);
      } else {
        buttons[index].textContent = incorrectAuthors.shift();
      }
    });
    console.log(rightButtons);
  }

  saveAnswersInLocalStorage() {
    let answers = {};
    if (localStorage.getItem('answers')) answers = JSON.parse(localStorage.getItem('answers'));
    answers[numRoundCopy] = responsesUser;
    localStorage.setItem('answers', JSON.stringify(answers));
  }
}

export default ArtistsQuizQuestions;
