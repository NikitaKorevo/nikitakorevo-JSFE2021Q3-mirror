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
let languageSelected = undefined;

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

const pullLocalStorage = () => {
  dataMomentum = JSON.parse(localStorage.getItem('dataMomentum'));
  if (languageSelected !== dataMomentum.settings.appearance[1][Object.keys(dataMomentum.settings.appearance[1])]) {
    languageSelected = dataMomentum.settings.appearance[1][Object.keys(dataMomentum.settings.appearance[1])];
    showTime();
    getQuotes();
    getWeather();
  }
}

const showTime = () => {
  languageSelected = dataMomentum.settings.appearance[1][Object.keys(dataMomentum.settings.appearance[1])];
  const date = new Date();

  const currentTime = date.toLocaleTimeString();
  elTime.textContent = currentTime;

  let currentDate = undefined;
  if (languageSelected === 'en') {
    currentDate = date.toLocaleDateString('En-en', optionsDate);
  } else {
    currentDate = date.toLocaleDateString('Ru-ru', optionsDate);
  }
  elDate.textContent = currentDate;

  showGreeting();
  setTimeout(showTime, 1000);
};

const showGreeting = () => {
  const date = new Date();
  const hours = date.getHours();

  const timeOfDay = getTimeOfDay(hours);
  const greetingText = timeOfDay;
  greeting.textContent = greetingText;

  userName.value = dataMomentum.userName;

  if (languageSelected === 'en') {
    userName.setAttribute('placeholder', '[Enter name]');
  } else {
    userName.setAttribute('placeholder', '[Введите имя]');
  }
};

const getTimeOfDay = (hours) => {
  let timeOfDay = Math.floor(hours / 6);
  if (timeOfDay === 0) {
    return languageSelected === 'en' ? 'Good night': 'Спокойной ночи';
  }
  if (timeOfDay === 1) {
    return languageSelected === 'en' ? 'Good morning': 'Доброе утро';
  }
  if (timeOfDay === 2) {
    return languageSelected === 'en' ? 'Good afternoon': 'Добрый день';
  }
  if (timeOfDay === 3) {
    return languageSelected === 'en' ? 'Good evening': 'Добрый вечер';
  }
};
showTime();

const saveUserName = (e) => {
  dataMomentum.userName = e.target.value;
  updateLocalStorage();
};
userName.addEventListener('input', (e) => saveUserName(e));

const getUnsplashAPI = async() => {
  const arrTimeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const date = new Date();
  const hours = date.getHours();
  const whatTimeOfDay = arrTimeOfDay[Math.floor(hours / 6)];
  const defaultTags = `nature,${whatTimeOfDay}`;
  
  let tags = dataMomentum.settings.inputTags;
  if (tags === '') tags = defaultTags;

  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags}&client_id=ki5fGm6hKzQdY0k5zoWARxWTz1qedJ6eHeHRK9o2JvY`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => {
    body.style.backgroundImage = `url(${data.urls.regular})`;
  };
};

const getFlickrAPI = async() => {
  const arrTimeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const date = new Date();
  const hours = date.getHours();
  const whatTimeOfDay = arrTimeOfDay[Math.floor(hours / 6)];
  const defaultTags = `nature,${whatTimeOfDay}`;

  let tags = dataMomentum.settings.inputTags;
  if (tags === '') tags = defaultTags;

  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a4f700468ac91700849cf21bb102fdc9&tags=${tags}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const randomNum = getRandomNum(0, data.photos.photo.length);

  const img = new Image();
  img.src = data.photos.photo[randomNum].url_l;
  img.onload = () => {
    body.style.backgroundImage = `url(${data.photos.photo[randomNum].url_l})`;
  };
};

const getRandomNum = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const setBg = (index = 0) => {
  const selectedSource = dataMomentum.settings.appearance[3][Object.keys(dataMomentum.settings.appearance[3])];
  const arrTimeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const date = new Date();
  const hours = date.getHours();
  const whatTimeOfDay = arrTimeOfDay[Math.floor(hours / 6)];
  const img = new Image();

  if (selectedSource === 'github') {
    if (!randomNum) randomNum = getRandomNum(1, 20);
    randomNum = +randomNum + index;
    if (randomNum < 1) randomNum = 20;
    if (randomNum > 20) randomNum = 1;
    if (randomNum < 10) randomNum = '0' + randomNum;
  
    img.src = `https://raw.githubusercontent.com/NikitaKorevo/stage1-tasks/assets/images/${whatTimeOfDay}/${randomNum}.jpg`;
    img.onload = () => {
      body.style.backgroundImage = `url('https://raw.githubusercontent.com/NikitaKorevo/stage1-tasks/assets/images/${whatTimeOfDay}/${randomNum}.jpg')`;
    };
  }

  if (selectedSource === 'unsplash API') {
    getUnsplashAPI();
  }

  if (selectedSource === 'flickr API') {
    getFlickrAPI();
  }
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${languageSelected}&appid=f2f4c08d30fe7eb6591c04a264ebd32a&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
  
    elCity.value = city;
    weatherIcon.classList = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (languageSelected === 'en') {
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    } else {
      humidity.textContent = `Влажность: ${data.main.humidity}%`;
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
    }
  } catch (error) {
    if (languageSelected === 'en') {
      weatherError.textContent = 'city not found';
    } else {
      weatherError.textContent = 'город не найден';
    }
    
    temperature.textContent = '';
    weatherDescription.textContent = '';
    humidity.textContent = '';
    wind.textContent = '';
  }

}
getWeather();

const updateCity = (e) => {
  let introducedCity = e.target.value;
  dataMomentum.city = introducedCity;
  updateLocalStorage();
  getWeather();
};
elCity.addEventListener('change', (e) => updateCity(e));

const getQuotes = async () => {
  if (languageSelected === 'en') {
    const quotes = 'https://favqs.com/api/qotd';
    const res = await fetch(quotes);
    const data = await res.json();
    quote.textContent = data.quote.body;
    author.textContent = data.quote.author;
  } else {
    const quotes = './json/quotesRU.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const randomNum = getRandomNum(0, 60);
    quote.textContent = data[randomNum].text;
    author.textContent = data[randomNum].author;
  }
};
getQuotes();

btnChangeQuote.addEventListener('click', getQuotes);

export {pullLocalStorage};