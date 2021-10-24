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

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const elCity = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const btnChangeQuote = document.querySelector('.change-quote');

const loadingDataFromLocalStorage = (() => {
  if (localStorage.getItem('dataMomentum') === null) {
    let dataMomentum = {
      'userName': '',
      'city': 'Minsk',
      'settings': {
        'show': [
          {'Time': 'true'},
          {'Date': 'true'},
          {'Greetings': 'true'},
          {'Quotes': 'true'},
          {'Weather': 'true'},
          {'Player': 'true'}
        ],
        'appearance': [
          {'Language': ['en', 'ru']},
          {'WhatLanguage': 'en'},
          {'Source for image': ['github', 'unsplash API', 'flickr API']},
          {'WhatSource for image': 'github'}
        ],
        'inputTags': ''
      }
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
  if (timeOfDay === 3) return 'evening';
};

showTime();

const saveUserName = (e) => {
  dataMomentum.userName = e.target.value;
  updateLocalStorage();
};
userName.addEventListener('input', (e) => saveUserName(e));

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

  img.src = `https://raw.githubusercontent.com/NikitaKorevo/stage1-tasks/assets/images/${getTimeOfDay(hours)}/${randomNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/NikitaKorevo/stage1-tasks/assets/images/${getTimeOfDay(hours)}/${randomNum}.jpg')`;
  };
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

const getWeather = async () => {
  try {
    weatherError.textContent = '';
    let city = dataMomentum.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${'en'}&appid=f2f4c08d30fe7eb6591c04a264ebd32a&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
  
    elCity.value = city;
    weatherIcon.classList = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  } catch (error) {
    weatherError.textContent = 'city not found';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    humidity.textContent = '';
    wind.textContent = '';
  }

}
/* getWeather(); */

const updateCity = (e) => {
  let introducedCity = e.target.value;
  dataMomentum.city = introducedCity;
  updateLocalStorage();
  getWeather();
};
elCity.addEventListener('change', (e) => updateCity(e));

const getQuotes = async () => {
  const quotes = './json/quotesRU.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const randomNum = getRandomNum(0, 60);
  quote.textContent = data[randomNum].text;
  author.textContent = data[randomNum].author;
};
getQuotes();

btnChangeQuote.addEventListener('click', getQuotes);
