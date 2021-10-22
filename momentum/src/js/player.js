import playLIst from './playList';

const elPlayList = document.querySelector('.play-list');
const elPlayPrev = document.querySelector('.play-prev');
const elPlay = document.querySelector('.play');
const elPlayNext = document.querySelector('.play-next');
const audio = document.createElement('audio');
const progressbarDuration = document.querySelector('.progressbar-duration');
const btnVolume = document.querySelector('.volume-level');
const progressbarVolumeLevel = document.querySelector('.progressbar-volume-level');
const elTimer = document.querySelector('.timer');
const elNameTrack = document.querySelector('.name-track');
let isPlay = false;
let playNum = 0;
let volumeLevel = 1;


playLIst.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  elPlayList.append(li);
});

const updateDefaultAudio = (() => {
  elTimer.textContent = `0:00 / ${playLIst[0].duration}`;
  elNameTrack.textContent = playLIst[0].title;
})();


const playAudio = () => {
  if (elPlay.classList.contains('pause')) {
    elPlay.classList.remove('pause');
    audio.pause();
    addStyle();
  } else {
    elPlay.classList.add('pause');
    audio.src = playLIst[playNum].src;
    audio.play();
    addStyle();
  }
};
elPlay.addEventListener('click', () => playAudio());

const playPrev = () => {
  playNum--;
  if (playNum < 0) playNum = playLIst.length - 1;
  elNameTrack.textContent = playLIst[playNum].title;
  elPlay.classList.add('pause');
  audio.src = playLIst[playNum].src;
  audio.play();
  addStyle();
};
elPlayPrev.addEventListener('click', () => playPrev());

const playNext = () => {
  playNum++;
  if (playNum >= playLIst.length) playNum = 0;
  elNameTrack.textContent = playLIst[playNum].title;
  elPlay.classList.add('pause');
  audio.src = playLIst[playNum].src;
  audio.currentTime = 0;
  audio.play();
  addStyle();
};
elPlayNext.addEventListener('click', () => playNext());

const endedAudio = () => {
  playNext();
};
audio.addEventListener('ended', () => endedAudio());

const clickElPlayList = (e) => {
  const numPickedAudio = [...elPlayList.children].indexOf(e.target);
  if (playNum === numPickedAudio) {
    playNum = numPickedAudio;
    playAudio();
  } else {
    playNum = numPickedAudio - 1;
    playNext();
  }
};

elPlayList.addEventListener('click',(e) => clickElPlayList(e));

const addStyle = () => {
  for (let i = 0; i < elPlayList.children.length; i++) {
    if (i === playNum) {
      elPlayList.children[i].classList.add('item-active');
    } else {
      elPlayList.children[i].classList.remove('item-active');
      elPlayList.children[i].classList.remove('playing');
    }
  }
  if (audio.paused) {
    elPlayList.children[playNum].classList.remove('playing');
  } else {
    elPlayList.children[playNum].classList.add('playing');
  }
};
addStyle();

const changeProgressbarDuration = (e) => {
  if (audio.networkState === 3) return progressbarDuration.value = 0;
  if (e) {
    audio.currentTime = audio.duration * (e.target.value / 100);
    console.log(e.target.value);
  }
  let currentSeconds = Math.round(audio.currentTime % 60);
  let totalSeconds = Math.round(audio.duration % 60);
  if (currentSeconds < 10) currentSeconds = '0' + currentSeconds;
  if (totalSeconds < 10) totalSeconds = '0' + totalSeconds;

  elTimer.textContent = `${Math.floor(audio.currentTime / 60)}:${currentSeconds} / ${Math.floor(audio.duration / 60)}:${totalSeconds}`;
  return progressbarDuration.value = audio.currentTime / audio.duration * 100;
};
audio.addEventListener('timeupdate', () => changeProgressbarDuration());
progressbarDuration.addEventListener('input', (e) => changeProgressbarDuration(e));

const clickBtnVolume = () => {
  if (audio.volume === 0) {
    if (volumeLevel === '0') volumeLevel = 1;
    audio.volume = volumeLevel;
    progressbarVolumeLevel.value = volumeLevel;
    btnVolume.style.backgroundImage = '';
  } else {
    audio.volume = 0;
    progressbarVolumeLevel.value = 0;
    btnVolume.style.backgroundImage = 'url("../assets/svg/mute.svg")';
  }
};
btnVolume.addEventListener('click', () => clickBtnVolume());

const changeProgressbarVolumeLevel = (e) => {
  if (e.target.value === '0') {
    btnVolume.style.backgroundImage = 'url("../assets/svg/mute.svg")';
  } else {
    btnVolume.style.backgroundImage = '';
  }
  volumeLevel = e.target.value;
  /* console.log(typeof(e.target.value)) */
  audio.volume = volumeLevel;
};
progressbarVolumeLevel.addEventListener('input', (e) => changeProgressbarVolumeLevel(e));