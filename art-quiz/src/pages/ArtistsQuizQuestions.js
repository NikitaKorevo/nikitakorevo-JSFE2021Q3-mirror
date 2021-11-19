import './ArtistsQuizQuestions.scss';

let data = null;
let imageNum = [];
let correctAuthors = [];
const copyCorrectAuthors = [];
let incorrectAuthors = [];
let rightButtons = [];
let responsesUser = [];

const getData = async () => {
  const res = await fetch('../assets/json/data.json');
  const result = await res.json();
  data = result;
  console.log(data);
};
getData();

class ArtistsQuizQuestions {
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
    while (incorrectAuthors.length < 30) {
      const randomNum = this.randomNum(0, data.length - 1);
      const isAuthorInCorrectAuthors = correctAuthors.includes(data[randomNum].author);
      const isAuthorInIncorrectAuthors = incorrectAuthors.includes(data[randomNum].author);

      if (!isAuthorInCorrectAuthors && !isAuthorInIncorrectAuthors) {
        incorrectAuthors.push(data[randomNum].author);
      }
    }
    /* console.log(incorrectAuthors);
    console.log(imageNum); */
  }

  render() {
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
    img.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${imageNum.shift()}.jpg`;

    const containerForButtons1 = document.createElement('div');
    containerForButtons1.classList.add('artists-quiz-questions__buttons-container');
    const containerForButtons2 = document.createElement('div');
    containerForButtons2.classList.add('artists-quiz-questions__buttons-container');

    const randomNumButton = this.randomNum(0, 3);
    console.log(`randomNumButton ${randomNumButton}`);
    for (let i = 0; i < 4; i += 1) {
      const button = document.createElement('button');
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

    navigation.addEventListener('click', (e) => {
      if (e.target.classList.contains('artists-quiz-questions__button')) this.nextImg(e);
    });
    return div;
  }

  nextImg(e) {
    /* console.log('asdfasfd');
    console.log(e.target);
    console.log(rightButtons); */
    if (!correctAuthors.length) return;
    if (+e.target.dataset.numButton === rightButtons[rightButtons.length - 1]) {
      responsesUser.push(true);
    } else {
      responsesUser.push(false);
    }
    console.log(responsesUser);
    const img = document.querySelector('.artists-quiz-questions__img');
    img.src = `https://raw.githubusercontent.com/NikitaKorevo/image-data/master/img/${imageNum.shift()}.jpg`;
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
}

export default ArtistsQuizQuestions;
