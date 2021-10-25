const btnSettings = document.querySelector('.btn-settings');
const elSettings = document.querySelector('.settings');
const elShow = document.querySelector('.settings__show');
const elAppearance = document.querySelector('.settings__appearance');
let dataMomentum = JSON.parse(localStorage.getItem('dataMomentum'));
let dataSettings = dataMomentum.settings;
const elTime = document.querySelector('.time');
const elDate = document.querySelector('.date');
const elGreeting = document.querySelector('.greeting-container');
const elQuotes = document.querySelector('.quotes');
const elWeather = document.querySelector('.weather');
const elPlayer = document.querySelector('.player');
const inputTags = document.querySelector('.appearance__tags');

const updateLocalStorage = () => {
  localStorage.setItem('dataMomentum', JSON.stringify(dataMomentum));
};

btnSettings.addEventListener('click', () => {
  elSettings.classList.toggle('settings-opening');
});

document.addEventListener('click', (e) => {
  if (elSettings.classList.contains('settings-opening') && !e.target.closest('.settings') && e.target !== btnSettings) {
    elSettings.classList.remove('settings-opening');
  }
});

const renderShow = () => {
  dataSettings.show.forEach(el => {
    const divContainer = document.createElement('div');
    divContainer.classList.add('show__container');

    const subtitle = document.createElement('h4');
    subtitle.textContent = Object.keys(el)[0];
    subtitle.classList.add('show__subtitle');

    const divToggle = document.createElement('div');
    divToggle.classList.add('show__toggle');

    const spanOn = document.createElement('span');
    spanOn.classList.add('show__span-on');
    spanOn.textContent = 'on';

    const spanLine = document.createElement('span');
    spanLine.classList.add('show__span-line');
    spanLine.textContent = ' | ';

    const spanOff = document.createElement('span');
    spanOff.classList.add('show__span-off');
    spanOff.textContent = 'off';

    if (el[Object.keys(el)[0]] === 'true') {
      spanOn.classList.add('show__span-active');
    } else {
      spanOff.classList.add('show__span-active');
    }

    divToggle.append(spanOn, spanLine, spanOff);
    divContainer.append(subtitle, divToggle);
    elShow.append(divContainer);
  });
};
renderShow();

const clickShowSpan = (e) => {
  const el = e.target;
  const index = [...elShow.children].indexOf(el.parentNode.parentNode) - 1;
  const key = el.parentNode.parentNode.children[0].textContent;

  if (el.classList.contains('show__span-on')) {
    el.classList.add('show__span-active');
    el.parentNode.children[2].classList.remove('show__span-active');
    dataSettings.show[index][key] = 'true';
    updateLocalStorage();
  }
  if (el.classList.contains('show__span-off')) {
    el.classList.add('show__span-active');
    el.parentNode.children[0].classList.remove('show__span-active');
    dataSettings.show[index][key] = 'false';
    updateLocalStorage();
    console.log(dataSettings.show)
  }
  console.log(e.target);
  HiddenOrShowBlock();
};
elShow.addEventListener('click', (e) => clickShowSpan(e));

const hiddenBlock = (el) => {
  el.style.opacity = '0';
  el.style.visibility = 'hidden';
}

const ShowBlock = (el) => {
  el.style.opacity = '1';
  el.style.visibility = 'visible';
}

const HiddenOrShowBlock = () => {
  dataSettings.show.forEach(block => {
    if ('Time' === Object.keys(block)[0]) {
      block[Object.keys(block)[0]] === 'true'? ShowBlock(elTime) : hiddenBlock(elTime);
    }
    if ('Date' === Object.keys(block)[0]) {
      block[Object.keys(block)[0]] === 'true' ? ShowBlock(elDate) : hiddenBlock(elDate);
    }
    if ('Greetings' === Object.keys(block)[0]) {
      block[Object.keys(block)[0]] === 'true' ? ShowBlock(elGreeting) : hiddenBlock(elGreeting);
    }
    if ('Quotes' === Object.keys(block)[0]) {
      block[Object.keys(block)[0]] === 'true' ? ShowBlock(elQuotes) : hiddenBlock(elQuotes);
    }
    if ('Weather' === Object.keys(block)[0]) {
      block[Object.keys(block)[0]] === 'true' ? ShowBlock(elWeather) : hiddenBlock(elWeather);
    }
    if ('Player' === Object.keys(block)[0]) {
      block[Object.keys(block)[0]] === 'true' ? ShowBlock(elPlayer) : hiddenBlock(elPlayer);
    }
  });
};
HiddenOrShowBlock();

const clickSpanAppearance = (e) => {
  const el = e.target;
  const index = ([...elAppearance.children].indexOf(el.parentNode.parentNode) - 1) * 2 + 1;
  const key ='What' + el.parentNode.parentNode.children[0].textContent;
  console.log(key);

  if (el.classList.contains('data-eng')) {
    el.classList.add('appearance__span-active');
    el.parentNode.children[2].classList.remove('appearance__span-active');
    dataSettings.appearance[index][key] = 'en';
    updateLocalStorage();
  }
  if (el.classList.contains('data-ru')) {
    el.classList.add('appearance__span-active');
    el.parentNode.children[0].classList.remove('appearance__span-active');
    dataSettings.appearance[index][key] = 'ru';
    updateLocalStorage();
  }

  if (el.classList.contains('data-github')) {
    el.classList.add('appearance__span-active');
    el.parentNode.children[2].classList.remove('appearance__span-active');
    el.parentNode.children[4].classList.remove('appearance__span-active');
    dataSettings.appearance[index][key] = 'github';
    updateLocalStorage();
  }
  if (e.target.classList.contains('data-unsplash')) {
    el.classList.add('appearance__span-active');
    el.parentNode.children[0].classList.remove('appearance__span-active');
    el.parentNode.children[4].classList.remove('appearance__span-active');
    dataSettings.appearance[index][key] = 'unsplash API';
    updateLocalStorage();
  }
  if (e.target.classList.contains('data-flickr')) {
    el.classList.add('appearance__span-active');
    el.parentNode.children[0].classList.remove('appearance__span-active');
    el.parentNode.children[2].classList.remove('appearance__span-active');
    dataSettings.appearance[index][key] = 'flickr API';
    updateLocalStorage();
  }

  console.log(el);
};
elAppearance.addEventListener('click', (e) => clickSpanAppearance(e));

inputTags.addEventListener('input', (e) => {
  console.log(e.target.value);
  dataSettings.inputTags = e.target.value;
  updateLocalStorage();
})

loadingInputTagsValue = () => {
  inputTags.value = dataSettings.inputTags;
}
loadingInputTagsValue();

loadingStyleAppearance = () => {
  if (dataSettings.appearance[1]['WhatLanguage'] === document.querySelector('.data-eng').textContent) {
    document.querySelector('.data-eng').classList.add('appearance__span-active');
  }
  if (dataSettings.appearance[1]['WhatLanguage'] === document.querySelector('.data-ru').textContent) {
    document.querySelector('.data-ru').classList.add('appearance__span-active');
  }

  if (dataSettings.appearance[3]['WhatSource for image'] === document.querySelector('.data-github').textContent) {
    document.querySelector('.data-github').classList.add('appearance__span-active');
  }
  if (dataSettings.appearance[3]['WhatSource for image'] === document.querySelector('.data-unsplash').textContent) {
    document.querySelector('.data-unsplash').classList.add('appearance__span-active');
  }
  if (dataSettings.appearance[3]['WhatSource for image'] === document.querySelector('.data-flickr').textContent) {
    document.querySelector('.data-flickr').classList.add('appearance__span-active');
  }
};
loadingStyleAppearance();
