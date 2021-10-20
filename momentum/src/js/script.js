let dataMomentum = undefined;
const elTime = document.querySelector('.time');
const elDate = document.querySelector('.date');
const optionsDate = {weekday: 'long', day: 'numeric', month: 'long'};
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const body = document.querySelector('body');
const btnPrev = document.querySelector('.slide-prev');
const btnNext = document.querySelector('.slide-next');
let randomNum = undefined;

const loadingDataFromLocalStorage = (() => {
  if (localStorage.getItem('dataMomentum') === null) {
    let dataMomentum = {
      'userName': '',
      'city': 'Minsk'
      };
    localStorage.setItem('dataMomentum', JSON.stringify(dataMomentum));
  }
  dataMomentum = JSON.parse(localStorage.getItem('dataMomentum')); 
})();

const updateLocalStorage = () => {
  localStorage.setItem('dataMomentum', JSON.stringify(dataMomentum));
  /* injectDataToDOM(); */
};

const showTime = () => {
  const date = new Date();

  const currentTime = date.toLocaleTimeString();
  elTime.textContent = currentTime;

  const currentDate = date.toLocaleDateString('En-en', optionsDate);
  elDate.textContent = currentDate;

  showGreeting();
  setTimeout(showTime, 1000);
};

const showGreeting = () => {
  const date = new Date();
  const hours = date.getHours();

  const timeOfDay = getTimeOfDay(hours);
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText;

  userName.value = dataMomentum.userName;
};

const getTimeOfDay = (hours) => {
  let timeOfDay = Math.floor(hours / 6);
  if (timeOfDay === 0) return 'night';
  if (timeOfDay === 1) return 'morning';
  if (timeOfDay === 2) return 'afternoon';
  if (timeOfDay === 3) return 'night';
};

showTime();

const saveUserName = (e) => {
  dataMomentum.userName = e.target.value;
  updateLocalStorage();
};
userName.addEventListener('input', (e) => saveUserName(e));

body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";

const getRandomNum = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const setBg = (index = 0) => {
  const date = new Date();
  const hours = date.getHours();
  const img = new Image();

  if (!randomNum) randomNum = getRandomNum(1, 20);
  randomNum = +randomNum + index;
  if (randomNum < 1) randomNum = 20;
  if (randomNum > 20) randomNum = 1;
  if (randomNum < 10) randomNum = '0' + randomNum;
  
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/NikitaKorevo/stage1-tasks/assets/images/${getTimeOfDay(hours)}/${randomNum}.jpg')`;
};
setBg();

const getSlidePrev = () => {
  setBg(-1);
};
btnPrev.addEventListener('click', () => getSlidePrev());

const getSlideNext = () => {
  setBg(1);
};
btnNext.addEventListener('click', () => getSlideNext());