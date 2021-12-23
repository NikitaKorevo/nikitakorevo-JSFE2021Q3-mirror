import './Settings.scss';
import Button from '../components/Button';
import { CHECK_BOX_TIME_GAME, SPAN_TIME_ANSWER, VOLUME } from '../constants/constants';

class Settings {
  render() {
    const settings = document.createElement('div');
    settings.classList.add('settings-modal');

    const wrapper = document.createElement('div');
    wrapper.classList.add('settings-modal__wrapper');

    const titleVolume = document.createElement('h3');
    titleVolume.classList.add('settings-modal__title');
    titleVolume.textContent = 'Volume';

    const svgVolume = document.createElement('img');
    svgVolume.classList.add('settings-modal__svgVolume');
    svgVolume.src = './assets/svg/volume.svg';

    const volume = document.createElement('input');
    volume.classList.add('settings-modal__volume');
    volume.type = 'range';
    volume.min = '0';
    volume.max = '1';
    volume.step = '0.01';
    if (!localStorage.getItem(VOLUME)) localStorage.setItem(VOLUME, '0.25');
    volume.value = localStorage.getItem(VOLUME);
    volume.addEventListener('input', (e) => this.changeVolume(volume, e.target.value));
    volume.addEventListener('change', this.checkVolume);

    const volumeContainer = document.createElement('div');
    volumeContainer.classList.add('settings-modal__volume-container');
    volumeContainer.append(svgVolume, volume);

    const titleTimeGame = document.createElement('h3');
    titleTimeGame.classList.add('settings-modal__title');
    titleTimeGame.textContent = 'Time game';

    const spanTimeGame = document.createElement('On');
    spanTimeGame.classList.add('settings-modal__span-time-game');
    spanTimeGame.textContent = 'On';

    const checkboxTimeGame = document.createElement('input');
    checkboxTimeGame.classList.add('settings-modal__checkbox-time-game');
    checkboxTimeGame.type = 'checkbox';
    if (!localStorage.getItem(CHECK_BOX_TIME_GAME)) {
      localStorage.setItem(CHECK_BOX_TIME_GAME, false);
    }
    checkboxTimeGame.checked = localStorage.getItem(CHECK_BOX_TIME_GAME) === 'true';
    checkboxTimeGame.addEventListener('click', () => this.toggleCheckboxTimeGame(checkboxTimeGame));

    const checkboxTimeGameContainer = document.createElement('div');
    checkboxTimeGameContainer.classList.add('settings-modal__checkbox-time-game-container');
    checkboxTimeGameContainer.append(spanTimeGame, checkboxTimeGame);

    const titleTimeAnswer = document.createElement('h3');
    titleTimeAnswer.classList.add('settings-modal__title');
    titleTimeAnswer.textContent = 'Time to answer';

    const spanTimeAnswer = document.createElement('span');
    spanTimeAnswer.classList.add('settings-modal__span-time-answer');
    if (!localStorage.getItem(SPAN_TIME_ANSWER)) localStorage.setItem(SPAN_TIME_ANSWER, 5);
    spanTimeAnswer.textContent = localStorage.getItem(SPAN_TIME_ANSWER);

    const minusTimeAnswer = document.createElement('button');
    minusTimeAnswer.classList.add('settings-modal__minus-time-answer');
    minusTimeAnswer.addEventListener('click', () => this.minusPlus5(spanTimeAnswer, -5));

    const plusTimeAnswer = document.createElement('button');
    plusTimeAnswer.classList.add('settings-modal__plus-time-answer');
    plusTimeAnswer.addEventListener('click', () => this.minusPlus5(spanTimeAnswer, 5));

    const timeAnswerContainer = document.createElement('div');
    timeAnswerContainer.classList.add('settings-modal__checkbox-time-answer-container');
    timeAnswerContainer.append(minusTimeAnswer, spanTimeAnswer, plusTimeAnswer);

    const buttonSave = new Button('Save').render();
    buttonSave.classList.add('settings-modal__button-save');
    buttonSave.addEventListener('click', () => settings.remove());

    wrapper.append(
      titleVolume,
      volumeContainer,
      titleTimeGame,
      checkboxTimeGameContainer,
      titleTimeAnswer,
      timeAnswerContainer,
      buttonSave
    );
    settings.append(wrapper);

    return settings;
  }

  changeVolume(volume, value) {
    const volumeCopy = volume;
    volumeCopy.value = value;
    localStorage.setItem(VOLUME, value);
  }

  checkVolume() {
    const audio = document.createElement('audio');
    audio.src = './assets/sound/right-answer.mp3';
    audio.volume = localStorage.getItem(VOLUME);
    audio.play();
  }

  toggleCheckboxTimeGame(checkboxTimeGame) {
    const checkboxTimeGameCopy = checkboxTimeGame;
    if (checkboxTimeGameCopy.checked === true) {
      checkboxTimeGameCopy.checked = true;
    } else {
      checkboxTimeGameCopy.checked = false;
    }
    localStorage.setItem(CHECK_BOX_TIME_GAME, checkboxTimeGameCopy.checked);
  }

  minusPlus5(span, num) {
    const spanCopy = span;
    const currentTime = +span.textContent;
    let time = currentTime + num;
    if (time > 30) time = 30;
    if (time < 5) time = 5;
    spanCopy.innerHTML = time;
    localStorage.setItem(SPAN_TIME_ANSWER, time);
  }
}

export default Settings;
