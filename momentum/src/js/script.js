let dataMomentum = undefined;
const elTime = document.querySelector('.time');
const elDate = document.querySelector('.date');
const optionsDate = {weekday: 'long', day: 'numeric', month: 'long'};
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');

const loadingDataFromLocalStorage = (() => {
  if (localStorage.getItem('dataMomentum') === null) {
    let dataMomentum = 
      {
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
  let timeOfDay =Math.floor(hours / 6);
  console.log(timeOfDay);
  console.log(hours);
  if (timeOfDay === 0) return 'night';
  if (timeOfDay === 1) return 'morning';
  if (timeOfDay === 2) return 'afternoon';
  if (timeOfDay === 3) return 'night';
};

const saveUserName = (e) => {
  dataMomentum.userName = e.target.value;
  updateLocalStorage();
};
userName.addEventListener('input', (e) => saveUserName(e));


showTime();